function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

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

module.exports = { setCors, pickOrderFields, ALLOWED_STATUS, ALLOWED_PRIORITY };
