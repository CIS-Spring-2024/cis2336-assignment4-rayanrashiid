const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'Frontend' directory
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// Serve Menu.html on a GET request to the '/menu' route
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'HTML', 'Menu.html'));
});

// POST route to handle form submission
app.post('/submit-order', (req, res) => {
  const orderData = req.body; 
  console.log(orderData);

  // Check if the orderData is structured correctly
  if (!orderData || !orderData.items || !Array.isArray(orderData.items)) {
    return res.status(400).json({ success: false, message: 'Invalid order data provided.' });
  }

  try {
    // Calculate the total cost
    const totalCost = orderData.items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      if (item.quantity < 0) throw new Error('Negative quantity is not allowed.');
      return total + itemTotal;
    }, 0);


    console.log(`Total Cost of the Order: $${totalCost.toFixed(2)}`);

    // Respond with success and the total cost
    res.json({ success: true, totalCost: totalCost.toFixed(2) });
  } catch (error) {
    // Handle any errors that occurred during processing
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
