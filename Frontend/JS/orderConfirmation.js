document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    let totalAmount = 0;
  
    // Populate the order items list
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} Quantity: ${item.quantity} Price: $${(item.price * item.quantity).toFixed(2)}`;
      orderItemsContainer.appendChild(li);
  
      // Update total amount
      totalAmount += item.price * item.quantity;
    });
  
    // Display total amount
    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
  
    // Optionally clear the cart from localStorage if the order is confirmed
    localStorage.removeItem('cart');
  });
  