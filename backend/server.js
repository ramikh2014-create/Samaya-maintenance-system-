require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ordersRoutes = require('./routes/orders');
const roomsRoutes = require('./routes/rooms');
const reportRoutes = require('./routes/report');

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN.split(',') }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'hotel-maintenance-backend' }));

app.use('/api/orders', ordersRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/report', reportRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Hotel Maintenance backend listening on port ${PORT}`);
});
