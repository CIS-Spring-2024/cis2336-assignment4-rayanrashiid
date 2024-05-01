// Menu.js
const menuItems = [
  {
    name: 'Grilled Chicken Sandwich',
    description: 'A tender grilled chicken breast served on a toasted bun with lettuce, tomato, pickles, cheese, and our secret sauce! Also comes with a side of fresh fries.',
    price: 6.99,
    image: '../img/grilled_chicken_sandwich.jpg' 
  },
  {
    name: '2 Topping 12-inch Pizza',
    description: 'Enjoy a 12-inch gourmet pizza with a crispy crust, topped with fresh toppings of your choosing, baked to perfection for a delightful, mouthwatering experience.',
    price: 7.99,
    image: '../IMG/12inchpizza.jpg'
  },
  {
    name: 'Vegetable Stir-Fry',
    description: 'A flavorful mix of stir-fried vegetables, such as bell peppers, broccoli, carrots, and snap peas, tossed in a savory soy sauce, served over steamed rice.',
    price: 5.99,
    image: '../IMG/Veg_stir_fry.jpg'
  }
];

// Function to generate the menu items
function generateMenu() {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = '';

  menuItems.forEach((item, index) => {
    const menuItemElement = document.createElement('div');
    menuItemElement.className = 'menu-item';

    menuItemElement.innerHTML = `
      <div class="menu-item-details">
        <h3><em>${item.name} - $${item.price.toFixed(2)}</em></h3>
        <p>${item.description}</p>
      </div>
      <div class="menu-item-order">
        <input type="number" id="quantity-${index}" name="${item.name}" min="1" max="10" placeholder="Qty" class="menu-quantity" required>
        <button type="button" onclick="handleAddToCart('${item.name}', ${index})">Add to Cart</button>
      </div>
      <img src="${item.image}" alt="${item.name}" class="menu-image">
    `;

    menuContainer.appendChild(menuItemElement);
  });

  addCheckoutButtonListener();
}

// Call generateMenu on page load
document.addEventListener('DOMContentLoaded', generateMenu);

// Load cart data 
let cart = loadCart(); 

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to handle 'Add to Cart' click
function handleAddToCart(itemName, index) {
  const quantityInput = document.getElementById(`quantity-${index}`);
  const quantity = parseInt(quantityInput.value, 10);
  if (!isNaN(quantity) && quantity > 0 && quantity <= 10) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name: itemName, quantity, price: menuItems[index].price });
    }
    alert(`${itemName} added to cart.`);
    saveCart(cart); 
    updateCartTotal();
    quantityInput.value = '';
  } else {
    alert('Please enter a valid quantity (1-10).');
  }
}

// Function to load cart
function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to update cart total price
function updateCartTotal() {
  const cartTotalPriceElement = document.getElementById('cart-total-price');
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  cartTotalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

