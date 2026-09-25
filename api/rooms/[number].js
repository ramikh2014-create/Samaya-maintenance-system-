const { getSupabase } = require('../_lib/supabaseClient');
const { setCors } = require('../_lib/util');

const ALLOWED_TYPES = ['Studio', '1BR'];

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH,OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const type = (req.body || {}).type;
  if (!ALLOWED_TYPES.includes(type)) {
    return res.status(400).json({ error: `type must be one of ${ALLOWED_TYPES.join(', ')}` });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  const { number } = req.query;

  const { data, error } = await supabase
    .from('rooms')
    .update({ type, updated_at: new Date().toISOString() })
    .eq('number', parseInt(number, 10))
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};
