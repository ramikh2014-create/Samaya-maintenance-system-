const { getSupabase } = require('../_lib/supabaseClient');
const { setCors } = require('../_lib/util');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET,OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let supabase;
  try {
    supabase = getSupabase();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  const { data, error } = await supabase.from('rooms').select('*').order('number', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};
