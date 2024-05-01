// Function to load cart from localStorage
function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to create table row for cart item
function createCartItemRow(item, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button onclick="removeItemFromCart(${index})">Remove</button></td>
  `;
  return row;
}

// Function to update cart display
function updateCartDisplay() {
  const cart = loadCart();
  const cartItemsList = document.getElementById('cart-items-list');
  cartItemsList.innerHTML = ''; // Clear the cart table body

  cart.forEach((item, index) => {
      const itemRow = createCartItemRow(item, index);
      cartItemsList.appendChild(itemRow);
  });

  updateTotalPrice(cart);
}

// Function to remove item from cart
function removeItemFromCart(index) {
  let cart = loadCart();
  cart.splice(index, 1); 
  saveCart(cart);
  updateCartDisplay(); // Update the display after removing the item
}

// Function to update the total price
function updateTotalPrice(cart) {
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Function to handle checkout
function handleCheckout() {
  // Redirect to the order confirmation page
  window.location.href = 'order-confirmation.html';
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
  document.getElementById('checkout-button').addEventListener('click', handleCheckout);
});
