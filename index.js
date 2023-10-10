import menuArray from "./data.js";

const menu = document.getElementById('menu')
const checkout = document.getElementById('checkout')
const billing = document.getElementById('billing')
const confirmation = document.getElementById('confirmation')

const cart = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addToCart(e.target.dataset.add)
    } else if(e.target.id === 'order-btn'){
        displayCardPaymentForm()
    } else if(e.target.id === 'exit-cart'){
        goBackToMenu()
    } else if (e.target.id === 'remove-item'){
        removeItemFromCart(e.target.dataset.removeId)
    } else if (e.target.id === 'pay-btn'){
        renderOrderConfirmation()
    } else if (e.target.id === 'discount-btn'){
        applyDiscount()
    }
})

function addToCart(addID) {
    checkout.style.display = 'block' 

    // Finds the menu item to add using its ID.
    const itemToAdd = menuArray.find(item => item.id === parseInt(addID))

    // Checks if that item is already in the cart.
    const existingCartItem = cart.find(cartItem => cartItem.item.id === itemToAdd.id)
    
    if (existingCartItem) {
        // If item is already in cart, incr +1.
        existingCartItem.quantity += 1;
    } else {
        // If item is not in cart, start with 1
        cart.push({ item: itemToAdd, quantity: 1 });
    }
    displayCartContents()
    displayFloatingEmojiAnimation(itemToAdd.emoji)
}

//###################### RENDER MENU ######################//
function displayMenuItems() {
    menu.innerHTML = menuArray.map(menuItem => `
        <div class='item-container'>
            <div class='emoji'>${menuItem.emoji}</div>
            <div class='margin-right'>
                <h3>${menuItem.name}</h3>
                <div class='smallText'>${menuItem.ingredients}</div>
                <h4>$${menuItem.price}</h4>
            </div>
            <button class='add-item-btn' data-add=${menuItem.id}>+</button>
        </div>`
    ).join('')
}
displayMenuItems()


function calculateTotalPrice() {
    return cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0);
}

//###################### RENDER CART ######################//
function displayCartContents() {
    // Map through each cart item to generate its HTML structure.
    const itemsHTML = cart.map(cartItem => `
        <div class='item-holder'>
            <h3>${cartItem.item.emoji} ${cartItem.item.name} + ${cartItem.quantity} 
                <span class='smallText' id='remove-item' data-remove-id=${cartItem.item.id}>- remove item</span> 
            </h3>
            <h4>+ $${cartItem.item.price * cartItem.quantity}</h4>
        </div>`
    ).join('')

    // Calculate the total price of all items in the cart.
    const totalPrice = calculateTotalPrice()

    // Populate the checkout section with cart item details and the total price.
    checkout.innerHTML = `
        <h3 class='order-title'>Your Order</h3>
        ${itemsHTML}
        <div>Discount</div>
        <div class='discount-container'>
            <input id='discount' type='text' placeholder='Enter code: "meal deal"'>
            <h4 id='total-discount'>discount?</h4>
        </div>
        <button id='discount-btn'>Submit</button>
        <div class='total-price'>
            <h3>Total price:</h3>
            <h4 id='total-price'>$${totalPrice}</h4>
        </div>
        <button class='order-button' id="order-btn">Complete Order</button>
    `;
}

function applyDiscount() {
    const discountInput = document.getElementById('discount')
    const totalDiscount = document.getElementById('total-discount')
    const totalPrice = document.getElementById('total-price')
    if (discountInput.value === "meal deal"){
        totalDiscount.innerHTML = '- $' + (calculateTotalPrice() * .1).toFixed(2)
    }
    totalPrice.innerHTML = '$ ' + (calculateTotalPrice() * .9).toFixed(2)
}

//###################### RENDER CARD DETAILS ######################//
function displayCardPaymentForm() {
    menu.style.display = 'none' 
    billing.style.display = 'block' 
    billing.innerHTML = `
    <div class=''>
    <div class='billing-container'>
        <button class='returnToCartBtn' id='exit-cart'>X</button>
        <div class='billing-title'>Enter card details</div>
        <input class='inputCardDetails' type='text' id='namevalue' placeholder='Enter your name'>
        <input class='inputCardDetails' type='text'  placeholder='Enter card number' maxlength='19'>
        <input class='inputCardDetails' type='text' placeholder='Enter CVV' maxlength='3'>
        <button class='order-button pay-button' id='pay-btn'>Pay</button>
    </div>`
} 

//###################### EXIT CART ######################//
function goBackToMenu() {
    menu.style.display = 'block'
    billing.style.display = 'none'
}

//###################### REMOVE ITEM ######################//
function removeItemFromCart(removeID) {
    const itemToRemoveIndex = cart.findIndex(cartItem => cartItem.item.id === parseInt(removeID));

    if (itemToRemoveIndex > -1) {
        if (cart[itemToRemoveIndex].quantity > 1) {
            cart[itemToRemoveIndex].quantity -= 1;
        } else {
            cart.splice(itemToRemoveIndex, 1);
        }
        displayCartContents();
    }
}

//###################### RENDER PAYMENT CONFIRMATION ######################//
function renderOrderConfirmation() {
    confirmation.style.display = 'block'
    menu.style.display = 'block'
    billing.style.display = 'none'
    checkout.style.display = 'none'
    confirmation.innerHTML = `
    <div class='confirmation-container'>Thanks, ${namevalue.value}! Your order is on its way!</div>`
}

//###################### EMOJI ANIMATION ######################//
function displayFloatingEmojiAnimation(emojiChar) {
    // Create an emoji element
    const emojiElement = document.createElement('div');
    emojiElement.classList.add('floating-emoji');
    emojiElement.textContent = emojiChar;

    // Position the emoji where you clicked
    const bodyRect = document.body.getBoundingClientRect();
    const checkoutRect = checkout.getBoundingClientRect();
    emojiElement.style.left = (checkoutRect.left + checkoutRect.width / 2 - bodyRect.left + 320) + 'px';
    emojiElement.style.top = '650px'; // Adjust based on where you want the emoji to start

    // Add the emoji to the body
    document.body.appendChild(emojiElement);

    // Remove the emoji after animation (clean-up)
    emojiElement.addEventListener('animationend', () => {
        document.body.removeChild(emojiElement);
    });
}


