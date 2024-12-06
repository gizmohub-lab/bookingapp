const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Booking = require('./models/booking');
require('dotenv').config(); // Load environment variables
app.set('views', path.join(__dirname, 'views'));

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or fallback to 3000

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Middlewares
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();  // Fetch all bookings
    const bookedDates = bookings.map(booking => booking.date);  // Extract only the dates
    res.render('index', { bookedDates });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.get('/admin-panel', async (req, res) => {
  const bookings = await Booking.find();  // Fetch all bookings
  res.render('admin-panel', { bookings });
});

app.post('/book', async (req, res) => {
  const { name, phoneNumber, place, functionName, date } = req.body;

  // Save the booking to the database
  const newBooking = new Booking({
    name,
    phoneNumber,
    place,
    functionName,
    date,
  });

  await newBooking.save();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
