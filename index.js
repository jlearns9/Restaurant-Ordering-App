import menuArray from "./data.js";

const menu = document.getElementById('menu')
const checkout = document.getElementById('checkout')
const billing = document.getElementById('billing')
const confirmation = document.getElementById('confirmation')
const consoleTest = document.getElementById('console-test')

function renderMenu() {
    menu.innerHTML = menuArray.map(menuItem => `
        <div class='item-container'>
            <div class='emoji'>${menuItem.emoji}</div>
            <div class='margin-right'>
                <h3>${menuItem.name}</h3>
                <p>${menuItem.ingredients}</p>
                <h4>$${menuItem.price}</h4>
            </div>
            <button class='add-item-btn'>+</button>
        </div>`
    ).join('')
}
renderMenu()

function renderPrice() {
    checkout.innerHTML = `
        <h3 class='order-title'>Your Order</h3>
        <div class='item-holder'>
            <h3>item name</h3>
            <h4>$item price</h4>
        </div>
        <div class='total-price'>
           <h3>Total price:</h3>
           <h4>$priceholder</h4>
        </div>
        <button class='order-button'>Complete Order</button>
        `
}
renderPrice()

function renderCardDetails() {
    billing.innerHTML = `
    <div class='billing-container'>
        <h3>Enter card details</h3>
        <input>
        <input>
        <input>
    </div>`
} 
renderCardDetails()

consoleTest.addEventListener('click', function() {
    console.log(menuArray)
})