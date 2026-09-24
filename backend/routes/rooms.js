const express = require('express');
const supabase = require('../supabaseClient');

const router = express.Router();
const ALLOWED_TYPES = ['Studio', '1BR'];

// GET /api/rooms
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('rooms').select('*').order('number', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// PATCH /api/rooms/:number  { type: 'Studio' | '1BR' }
router.patch('/:number', async (req, res) => {
  const type = req.body.type;
  if (!ALLOWED_TYPES.includes(type)) {
    return res.status(400).json({ error: `type must be one of ${ALLOWED_TYPES.join(', ')}` });
  }
  const { data, error } = await supabase
    .from('rooms')
    .update({ type, updated_at: new Date().toISOString() })
    .eq('number', parseInt(req.params.number, 10))
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
