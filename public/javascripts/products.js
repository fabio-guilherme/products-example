//const { idleTimeoutMillis } = require("pg/lib/defaults");

window.onload = async function() {
    let prodsElem = document.getElementById("products");
    try {
        let products = await $.ajax({
            url: "/api/products",
            method: "get",
            dataType: "json"
        });
        let html = "";
        console.log("[products] products = " + JSON.stringify(products));
        for (let prod of products) {
            console.log("[products] prod = " + JSON.stringify(prod));
            html += createProductHTML(prod);
        }
        prodsElem.innerHTML = html;
    } catch (err) {
        console.log(err);
        prodsElem.innerHTML = "<h1>Not available at this moment</h1>";
    }
}

function createProductHTML(prod) {
    return "<section onclick='showProduct(" + prod.prod_id + ");'>" +
        "<h1>" + prod.prod_name + "</h1>" +
        "<h2>" + prod.prod_price.toFixed(2) + " € </h2></section>";
}

function showProduct(id) {
    console.log("setItem->prodId = " + id);
    sessionStorage.setItem("prodId", id);
    window.location = "product.html";
}