const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Customer = require('./models/Customer');

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tailor-shop')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Root test
app.get('/', (req, res) => {
  res.send('Tailor Shop API is running...');
});

// GET All Customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE Customer (for Angular form)
app.post('/api/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get('/api/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.patch('/api/customers/:customerId/orders/complete', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { date } = req.body;

    const customer = await Customer.findById(customerId);

    const order = customer.orders.find(o => new Date(o.date).getTime() === new Date(date).getTime());

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = 'completed';

    await customer.save();

    res.json({ message: 'Order marked completed' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});