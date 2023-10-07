import menuArray from "./data.js";

const test = document.getElementById('test')
const consoleTest = document.getElementById('console-test')

function html() {
    test.innerHTML = 'this is a tdest';
}

html()




consoleTest.addEventListener('click', function() {
    console.log(menuArray)
})