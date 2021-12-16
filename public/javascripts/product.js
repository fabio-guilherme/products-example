window.onload = function() {
    let prodJSON = sessionStorage.getItem("product");
    let prod = JSON.parse(prodJSON);
    document.getElementById("name").innerHTML = prod.name;
    document.getElementById("price").innerHTML = prod.price.toFixed(2);
    document.getElementById("type").innerHTML = prod.type.type;
}