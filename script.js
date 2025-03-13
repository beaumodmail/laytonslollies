
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutSummary = document.getElementById('cartSummary');
const checkoutTotal = document.getElementById('checkoutTotal');
const checkoutForm = document.getElementById('checkoutForm');

// Handle Add to Cart
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const productName = event.target.getAttribute('data-product');
    const price = productName === 'Blue Pepsi' ? 2.99 : 1.99;

    cart.push({ name: productName, price });
    updateCart();
  });
});

// Update Cart in the Cart Page
function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItemsList.appendChild(li);
    total += item.price;
  });

  totalPriceElement.textContent = total.toFixed(2);

  // Store cart in local storage for checkout page
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout Page Summary
if (checkoutSummary) {
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    checkoutSummary.appendChild(li);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  checkoutTotal.textContent = total.toFixed(2);
}

// Handle Checkout Form Submission
if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    alert(`Order Complete! 
Name: ${name} 
Email: ${email} 
Address: ${address}`);
    
    // Clear cart and local storage after checkout
    localStorage.removeItem('cart');
    window.location.href = 'index.html'; // Redirect back to home page
  });
}
    