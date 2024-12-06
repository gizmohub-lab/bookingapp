const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  place: String,
  functionName: String,
  date: String, // This will store the selected date
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
