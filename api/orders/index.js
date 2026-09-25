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

  if (req.method === 'GET') {
    let query = supabase.from('orders').select('*').order('date', { ascending: false });
    const { date, status, priority, room, search } = req.query;
    if (date) query = query.eq('date', date);
    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);
    if (room) query = query.eq('room', parseInt(room, 10));

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });

    let rows = data;
    if (search) {
      const s = String(search).toLowerCase();
      rows = rows.filter(
        (o) =>
          String(o.room).includes(s) ||
          (o.technician || '').toLowerCase().includes(s) ||
          (o.notes || '').toLowerCase().includes(s) ||
          (o.issue_type || '').toLowerCase().includes(s)
      );
    }
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    try {
      const fields = pickOrderFields(req.body || {});
      if (!fields.room) return res.status(400).json({ error: 'room is required' });
      if (fields.status === 'done' && !fields.completed_date) {
        fields.completed_date = new Date().toISOString().slice(0, 10);
      }
      const { data, error } = await supabase.from('orders').insert(fields).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  res.setHeader('Allow', 'GET,POST,OPTIONS');
  return res.status(405).json({ error: 'Method not allowed' });
};
