module.exports = async (req, res) => {
  res.status(200).json({ ok: true, service: 'hotel-maintenance-api' });
};
