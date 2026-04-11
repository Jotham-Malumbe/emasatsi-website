// =======================
// CART SYSTEM (NEW FEATURE)
// =======================

let cart = [];

// Create cart UI
const cartBox = document.createElement("div");
cartBox.id = "cart-box";
cartBox.innerHTML = `
    <h3>🛒 Your Cart</h3>
    <div id="cart-items"></div>
    <p id="cart-total">Total: KES 0</p>
    <button id="checkout-btn">Checkout on WhatsApp</button>
    <button id="close-cart">Close</button>
`;
document.body.appendChild(cartBox);

// Style cart box dynamically (no CSS required but you can move it later)
cartBox.style.position = "fixed";
cartBox.style.bottom = "80px";
cartBox.style.right = "20px";
cartBox.style.width = "260px";
cartBox.style.background = "#fff";
cartBox.style.padding = "15px";
cartBox.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
cartBox.style.borderRadius = "10px";
cartBox.style.display = "none";
cartBox.style.zIndex = "1000";

// =======================
// ADD TO CART BUTTONS
// =======================
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const product = this.closest(".product");

        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);

        cart.push({ name, price });

        alert(name + " added to cart!");
        updateCart();
        cartBox.style.display = "block";
    });
});

// =======================
// UPDATE CART
// =======================
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginBottom = "5px";

        div.innerHTML = `
            <span>${item.name}</span>
            <span>KES ${item.price}</span>
            <button onclick="removeItem(${index})">x</button>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = "Total: KES " + total;
}

// =======================
// REMOVE ITEM
// =======================
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// =======================
// CLOSE CART
// =======================
document.getElementById("close-cart").addEventListener("click", () => {
    cartBox.style.display = "none";
});

// =======================
// CHECKOUT TO WHATSAPP
// =======================
document.getElementById("checkout-btn").addEventListener("click", () => {
    let message = "Hello, I want to order:%0A";

    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name} (KES ${item.price})%0A`;
        total += item.price;
    });

    message += `%0ATotal: KES ${total}`;

    window.open(`https://wa.me/254115652612?text=${message}`, "_blank");
});
