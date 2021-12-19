window.onload = function() {
    let html = "";
    for (let index in types)
        html += "<option value=" + index + ">" + types[index].type + "</option>";
    document.getElementById("type").innerHTML = html;
    document.getElementById("type").value = 0;
}

function submit() {
    let product = {};
    /* setting and testing the name */
    if (!verifyAndSaveName(product))
        return;
    /* setting and testing the price */
    if (!verifyAndSavePrice(product))
        return;
    /* setting the type, no need to test */
    /* the value of the select is the position on the array */
    let typePos = document.getElementById("type").value;
    /* from the index we get the object */
    product.type = types[typePos];
    /* convert to JSON, save and change page */
    sessionStorage.setItem("product", JSON.stringify(product));
    window.location = "product.html ";
}

function verifyAndSaveName(prodObj) {
    prodObj.name = document.getElementById("name").value;
    let ename = document.getElementById("ename");
    if (prodObj.name.length < 3) {
        ename.innerHTML = "Name has to have at least 3 letters and only has " +
            prodObj.name.length;
        ename.style.display = "block";
        return false;
    } else {
        ename.style.display = "none";
        return true;
    }
}

function verifyAndSavePrice(prodObj) {
    let eprice = document.getElementById("eprice");
    let priceStr = document.getElementById("price").value;
    /* All values are strings, we need to convert */
    prodObj.price = parseFloat(priceStr);
    if (isNaN(prodObj.price) || prodObj.price <= 0) {
        eprice.style.display = "block";
        return false;
    } else {
        eprice.style.display = "none";
        return true;
    }
}