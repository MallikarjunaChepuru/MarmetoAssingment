let menBtnEl = document.getElementById("menBtn");
let womenBtnEl = document.getElementById("womenBtn");
let kidBtnEl = document.getElementById("kidBtn");
let showProducts = document.getElementById("showProducts");

let selectdCategory = "Men"


const createProductCard = data => {
    const { bardgeText, image, title, vendor, price, compareAtPrice } = data
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    const roundDiscount = Math.round(discount)

    const badge = bardgeText === null ? "Trending" : bardgeText;
    const productsContainer = document.createElement("li");
    productsContainer.className = "product-container";

    const imgContainer = document.createElement("div");
    const badgeTextEl = document.createElement("h6");
    badgeTextEl.textContent = badge;
    badgeTextEl.className = "product-bagde";
    imgContainer.appendChild(badgeTextEl);

    const imgEl = document.createElement("img");
    imgEl.src = image;
    imgEl.className = "product-img";
    imgContainer.appendChild(imgEl);

    const productDetailscontainer = document.createElement("div");
    productDetailscontainer.className = "product-details-container";
    const productTitle = document.createElement("h4");
    productTitle.textContent = title;
    productDetailscontainer.appendChild(productTitle);

    const productVendor = document.createElement("h5");
    productVendor.textContent = vendor;
    productDetailscontainer.appendChild(productVendor);

    const productPrice = document.createElement("span");
    const productPriceCut = document.createElement("span");
    const productDiscount = document.createElement("span");

    productPrice.textContent = "Rs : " + " " + price + "." + "00";
    productPrice.className = "price";
    productPriceCut.textContent = compareAtPrice + "." + "00";
    productPriceCut.className = "original-price";

    productDiscount.textContent = roundDiscount + "% Off";
    productDiscount.className = "product-discount";

    const productBtn = document.createElement("button");
    productBtn.textContent = "Add To Cart";
    productBtn.className = "product-btn";

    productDetailscontainer.appendChild(productPrice);
    productDetailscontainer.appendChild(productPriceCut);
    productDetailscontainer.appendChild(productDiscount);
    productDetailscontainer.appendChild(productBtn);

    productsContainer.appendChild(imgContainer);
    productsContainer.appendChild(productDetailscontainer);

    showProducts.appendChild(productsContainer);

}
const fetching = async (value) => {
    console.log(selectdCategory)
    let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    let options = {
        method: "GET"
    }

    const request = await fetch(url, options);
    const response = await request.json();
    console.log(response)
    const modifiedData = response.categories.map((eachProduct) => ({

        categoryName: eachProduct.category_name,
        categoryProducts: eachProduct.category_products.map((eachProductItem) => ({
            id: eachProductItem.id,
            bardgeText: eachProductItem.badge_text,
            compareAtPrice: eachProductItem.compare_at_price,
            image: eachProductItem.image,
            price: eachProductItem.price,
            secondImage: eachProductItem.second_image,
            title: eachProductItem.title,
            vendor: eachProductItem.vendor
        }))


    }))

    console.log(modifiedData)

    const productData = modifiedData.filter((eachItem) =>
        eachItem.categoryName === value && eachItem.categoryProducts)

    for (let product of productData) {
        product.categoryProducts.map((productDetails) => createProductCard(productDetails))
    }

}

fetching(selectdCategory)

menBtnEl.addEventListener("click", (event) => {
    showProducts.textContent = ""
    selectdCategory = event.target.value
    if (selectdCategory === "Men") {
        menBtnEl.className = "active";
        womenBtnEl.className = "";
        kidBtnEl.className = ""
    }
    fetching(selectdCategory)
})
womenBtnEl.addEventListener("click", (event) => {
    showProducts.textContent = ""
    selectdCategory = event.target.value;
    if (selectdCategory === "Women") {
        menBtnEl.className = "";
        womenBtnEl.className = "active";
        kidBtnEl.className = ""
    }

    fetching(selectdCategory)
})
kidBtnEl.addEventListener("click", (event) => {
    showProducts.textContent = ""
    selectdCategory = event.target.value;
    if (selectdCategory === "Kids") {
        menBtnEl.className = "";
        womenBtnEl.className = "";
        kidBtnEl.className = "active"
    }
    fetching(selectdCategory)
})
console.log(selectdCategory)