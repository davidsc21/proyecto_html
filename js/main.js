const productList = [
    "vestido amarillo",
    "gafas urbanas",
    "traje negro",
    "bolso rojo"
];

const resultBox = document.querySelector(".results"); // Cambiado a .results
const inputBox = document.querySelector(".search-box"); // Cambiado a .search-bar

const displayResults = function (results) {
    if (results.length === 0) {
        resultBox.innerHTML = '';
        return;
    }
    
    const resultHTML = results.map(function (product) {
        return `<li onclick="selectInput(this)">${product}</li>`;
    });
    
    resultBox.innerHTML = '<ul>' + resultHTML.join('') + '</ul>';
}

inputBox.onkeyup = function (e) {
    let result = [];
    const input = inputBox.value.toLowerCase();

    if (input.length === 0) {
        resultBox.innerHTML = '';
        resultBox.style.display = 'none';
        return;
    }

    result = productList.filter((product) => {
        return product.toLowerCase().includes(input);
    });

    if (result.length > 0) {
        resultBox.style.display = 'block';
        displayResults(result);
    } else {
        resultBox.style.display = 'none';
    }
}

function selectInput(element) {
    inputBox.value = element.innerText;
    resultBox.style.display = 'none';
}