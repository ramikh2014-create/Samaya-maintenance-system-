const express = require('express');
const supabase = require('../supabaseClient');

const router = express.Router();

const ALLOWED_STATUS = ['pending', 'progress', 'onhold', 'done', 'cancelled'];
const ALLOWED_PRIORITY = ['high', 'med', 'low'];

function pickOrderFields(body) {
  const out = {};
  if (body.room !== undefined) out.room = parseInt(body.room, 10);
  if (body.date !== undefined) out.date = body.date || null;
  if (body.category !== undefined) out.category = body.category;
  if (body.priority !== undefined) {
    if (!ALLOWED_PRIORITY.includes(body.priority)) {
      throw new Error(`priority must be one of ${ALLOWED_PRIORITY.join(', ')}`);
    }
    out.priority = body.priority;
  }
  if (body.issue_type !== undefined) out.issue_type = body.issue_type;
  if (body.status !== undefined) {
    if (!ALLOWED_STATUS.includes(body.status)) {
      throw new Error(`status must be one of ${ALLOWED_STATUS.join(', ')}`);
    }
    out.status = body.status;
  }
  if (body.cost !== undefined) out.cost = Number(body.cost) || 0;
  if (body.technician !== undefined) out.technician = body.technician;
  if (body.completed_date !== undefined) out.completed_date = body.completed_date || null;
  if (body.notes !== undefined) out.notes = body.notes;
  return out;
}

// GET /api/orders?date=YYYY-MM-DD&status=pending&room=301&search=leak
router.get('/', async (req, res) => {
  let query = supabase.from('orders').select('*').order('date', { ascending: false });

  if (req.query.date) query = query.eq('date', req.query.date);
  if (req.query.status) query = query.eq('status', req.query.status);
  if (req.query.priority) query = query.eq('priority', req.query.priority);
  if (req.query.room) query = query.eq('room', parseInt(req.query.room, 10));

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  let rows = data;
  if (req.query.search) {
    const s = String(req.query.search).toLowerCase();
    rows = rows.filter(
      (o) =>
        String(o.room).includes(s) ||
        (o.technician || '').toLowerCase().includes(s) ||
        (o.notes || '').toLowerCase().includes(s) ||
        (o.issue_type || '').toLowerCase().includes(s)
    );
  }
  res.json(rows);
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: 'Order not found' });
  res.json(data);
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const fields = pickOrderFields(req.body);
    if (!fields.room) return res.status(400).json({ error: 'room is required' });
    if (fields.status === 'done' && !fields.completed_date) {
      fields.completed_date = new Date().toISOString().slice(0, 10);
    }
    const { data, error } = await supabase.from('orders').insert(fields).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/orders/:id
router.patch('/:id', async (req, res) => {
  try {
    const fields = pickOrderFields(req.body);
    if (fields.status === 'done' && !fields.completed_date) {
      fields.completed_date = new Date().toISOString().slice(0, 10);
    }
    fields.updated_at = new Date().toISOString();
    const { data, error } = await supabase
      .from('orders')
      .update(fields)
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/orders/:id/close  (quick action: mark done + stamp completion date)
router.post('/:id/close', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: 'done', completed_date: new Date().toISOString().slice(0, 10) })
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/orders/:id/reopen
router.post('/:id/reopen', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: 'pending' })
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE /api/orders/:id
router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('orders').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

module.exports = router;
