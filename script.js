// =======================
// CART SYSTEM (IMPROVED)
// =======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// CREATE CART UI
// =======================
const cartBox = document.createElement("div");
cartBox.id = "cart-box";

cartBox.innerHTML = `
    <h3>🛒 Your Cart</h3>
    <div id="cart-items"></div>
    <p id="cart-total">Total: KES 0</p>

    <button id="checkout-btn">Checkout on WhatsApp</button>
    <button id="clear-cart">Clear Cart</button>
    <button id="close-cart">Close</button>
`;

document.body.appendChild(cartBox);

// =======================
// OPEN CART BUTTON
// =======================
const openCartBtn = document.createElement("button");
openCartBtn.textContent = "🛒";
openCartBtn.id = "open-cart-btn";
document.body.appendChild(openCartBtn);

// Style button (quick minimal)
openCartBtn.style.position = "fixed";
openCartBtn.style.bottom = "20px";
openCartBtn.style.left = "20px";
openCartBtn.style.padding = "12px";
openCartBtn.style.borderRadius = "50%";
openCartBtn.style.border = "none";
openCartBtn.style.background = "#00C853";
openCartBtn.style.color = "#fff";
openCartBtn.style.fontSize = "18px";
openCartBtn.style.zIndex = "1000";

// =======================
// ADD TO CART
// =======================
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {

        const product = this.closest(".product");
        const name = product.dataset.name;
        const price = parseInt(product.dataset.price);

        // Check if item exists
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        saveCart();
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
        total += item.price * item.qty;

        const div = document.createElement("div");

        div.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <span>KES ${item.price * item.qty}</span>
            <button data-index="${index}" class="remove-btn">x</button>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = "Total: KES " + total;

    // Attach remove events
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const index = this.dataset.index;
            cart.splice(index, 1);
            saveCart();
            updateCart();
        });
    });
}

// =======================
// SAVE CART
// =======================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// OPEN / CLOSE CART
// =======================
openCartBtn.addEventListener("click", () => {
    cartBox.style.display = "block";
});

document.getElementById("close-cart").addEventListener("click", () => {
    cartBox.style.display = "none";
});

// =======================
// CLEAR CART
// =======================
document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCart();
});

// =======================
// CHECKOUT (WHATSAPP)
// =======================
document.getElementById("checkout-btn").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello, I want to order:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        message += `- ${item.name} x${item.qty} (KES ${itemTotal})%0A`;
    });

    message += `%0ATotal: KES ${total}`;

    window.open(`https://wa.me/254115652612?text=${message}`, "_blank");
});

// =======================
// INIT
// =======================
updateCart();
