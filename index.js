import menuArray from "./data.js";

const test = document.getElementById('test')
const consoleTest = document.getElementById('console-test')

function renderMenu() {
    test.innerHTML = menuArray.map(menuItem => `
    <div>
        <div>${menuItem.emoji}</div>
        <h3>${menuItem.name}</h3>
        <p>${menuItem.ingredients}</p>
        <h4>${menuItem.name}</h4>
        <button>+</button>
    </div>`
    )
}

renderMenu()




consoleTest.addEventListener('click', function() {
    console.log(menuArray)
})