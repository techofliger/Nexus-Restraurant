
// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("show");
}


// ===============================
// CART
// ===============================

let cart = [];

function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    // Small notification
    showNotification(`${name} added to cart`);
}


function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;


    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p style="color:#777;">Your cart is empty.</p>`;

    } else {

        cartItems.innerHTML = cart.map((item, index) => `

            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>

                    <br>

                    <small>
                        ₹${item.price} × ${item.quantity}
                    </small>
                </div>

                <div>

                    <button
                        onclick="changeQuantity(${index}, -1)"
                        style="
                        background:none;
                        border:1px solid #333;
                        color:white;
                        padding:5px 9px;
                        cursor:pointer;">
                        −
                    </button>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                        style="
                        background:none;
                        border:1px solid #333;
                        color:white;
                        padding:5px 9px;
                        cursor:pointer;">
                        +
                    </button>

                </div>

            </div>

        `).join("");

    }


    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cartTotal").textContent =
        `₹${total}`;
}


function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


function openCart() {
    document
        .getElementById("cartModal")
        .classList.add("show");
}


function closeCart() {
    document
        .getElementById("cartModal")
        .classList.remove("show");
}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert(
        "🚀 Checkout system coming soon!\n\n" +
        "Your order has been prepared."
    );
}


// ===============================
// MENU FILTER
// ===============================

function filterMenu(category, button) {

    const cards =
        document.querySelectorAll(".food-card");

    const buttons =
        document.querySelectorAll(".category-buttons button");


    buttons.forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");


    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 10);

        } else {

            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            setTimeout(() => {
                card.style.display = "none";
            }, 250);

        }

    });
}


// ===============================
// TABLE BOOKING
// ===============================

function bookTable(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const date =
        document.getElementById("date").value;

    const people =
        document.getElementById("people").value;


    document.getElementById("bookingMessage").innerHTML = `

        <span style="
            display:block;
            margin-top:25px;
            color:#00ffd5;
        ">

        ✓ Reservation confirmed for
        <strong>${name}</strong><br>

        ${people} people · ${date}

        </span>

    `;

    event.target.reset();
}


// ===============================
// NOTIFICATION
// ===============================

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.textContent = message;

    notification.style.position = "fixed";
    notification.style.bottom = "30px";
    notification.style.right = "30px";
    notification.style.background = "#00ffd5";
    notification.style.color = "#00100d";
    notification.style.padding = "15px 25px";
    notification.style.borderRadius = "5px";
    notification.style.fontWeight = "600";
    notification.style.zIndex = "9999";

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.style.opacity = "0";

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 1800);
}


// ===============================
// CLOSE CART ON BACKDROP CLICK
// ===============================

document
    .getElementById("cartModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeCart();
        }

    });


// INITIALIZE

updateCart();
```
