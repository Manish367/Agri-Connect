require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const farmRoutes = require('./routes/farmRoutes');
const cropRoutes = require('./routes/cropRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const marketRoutes = require('./routes/marketRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const forumRoutes = require('./routes/forumRoutes');
const fertilizerRoutes = require('./routes/fertilizerRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const irrigationRoutes = require('./routes/irrigationRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const pushRoutes = require('./routes/pushRoutes');
const expertRoutes = require('./routes/expertRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const smsRoutes = require('./routes/smsRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/market-prices', marketRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/fertilizer', fertilizerRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/push', pushRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/disease', diseaseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`AgriConnect API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
