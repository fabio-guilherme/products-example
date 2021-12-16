window.oload = async function() {
    let prodsElem = document.getElementById("products");
    try {
        let products = await$.ajax({
            url: "/api/products",
            method: "get",
            dataType: "json"
        });
        let html = "";
        for (let prod of products) {
            html += createProductHTML(prod);
        }

    } catch (err) {
        console.log(err);
        prodsElem.innerHTML = "<h1>Not available at this moment</h1>";
    }
}

function createProductHTML(prod) {
    return "<section>" + product.prod_name + "</section>";
}