const { getSupabase } = require('../_lib/supabaseClient');
const { setCors, pickOrderFields } = require('../_lib/util');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  let supabase;
  try {
    supabase = getSupabase();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Order not found' });
    return res.status(200).json(data);
  }

  if (req.method === 'PATCH') {
    try {
      const fields = pickOrderFields(req.body || {});
      if (fields.status === 'done' && !fields.completed_date) {
        fields.completed_date = new Date().toISOString().slice(0, 10);
      }
      fields.updated_at = new Date().toISOString();
      const { data, error } = await supabase.from('orders').update(fields).eq('id', id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET,PATCH,DELETE,OPTIONS');
  return res.status(405).json({ error: 'Method not allowed' });
};
