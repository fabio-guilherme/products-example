window.onload = async function() {
    prodId = sessionStorage.getItem("prodId");
    console.log("setItem->prodId = " + prodId);
    try {

        let product = await $.ajax({
            url: "/api/products/" + prodId,
            method: "get",
            dataType: "json"
        });
        console.log("[product] product = " + JSON.stringify(product));
        document.getElementById("name").innerHTML = product.prod_name;
        document.getElementById("price").innerHTML = product.prod_price;
        document.getElementById("type").innerHTML = product.type_name;
        document.getElementById("id").innerHTML = product.prod_id;
    } catch (err) {
        console.log(err);
        let mainElem = document.getElementById("main");
        if (err.status == 404)
            mainElem.innerHTML =
            "<h1>" + err.responseJSON.msg + "</h1>" + "<h2>Please select an existing product</h2>";
        else mainElem.innerHTML =
            "<h1>Server problems, please try later</h1>";
    }
}