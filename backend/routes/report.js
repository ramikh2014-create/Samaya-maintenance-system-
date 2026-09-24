const express = require('express');
const supabase = require('../supabaseClient');

const router = express.Router();

// GET /api/report?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('date', date)
    .order('room', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });

  const totalCost = data.reduce((sum, o) => sum + (Number(o.cost) || 0), 0);
  const highCount = data.filter((o) => o.priority === 'high').length;

  res.json({
    date,
    total: data.length,
    highPriority: highCount,
    totalCost,
    orders: data,
  });
});

module.exports = router;
