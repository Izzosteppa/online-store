// Initialize cart state
let cart = [];

// Function to add items to the cart
function addToCart(name, price) {
    const newItem = { name, price };
    cart.push(newItem);
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    const cartCountElement = document.getElementById("cart-count");
    const cartTotalElement = document.getElementById("cart-total");

    const totalCount = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    cartCountElement.textContent = totalCount;
    cartTotalElement.textContent = totalPrice.toFixed(2);
}

// Function to change the main image when a thumbnail is clicked
function changeImage(src, alt) {
    const parent = event.target.closest(".sneaker-item");
    const mainImages = parent.querySelector(".image-slider").children;

    for (const img of mainImages) {
        img.classList.remove("active");
    }

    for (const img of mainImages) {
        if (img.src === src) {
            img.classList.add("active");
            break;
        }
    }
}

// Authentication Functions
function showLoginPage() {
    document.getElementById("login-page").style.display = "block";
    document.getElementById("register-page").style.display = "none";
    document.getElementById("store-page").style.display = "none";
}

function showRegisterPage() {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("register-page").style.display = "block";
    document.getElementById("store-page").style.display = "none";
}

function showStorePage() {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("register-page").style.display = "none";
    document.getElementById("store-page").style.display = "block";
}

// Handle Login
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login successful!");
        showStorePage();
    } else {
        alert("Invalid username or password.");
    }
});

// Handle Registration
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(u => u.username === newUsername);

    if (existingUser) {
        alert("Username already exists.");
    } else {
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Please log in.");
        showLoginPage();
    }
});

// Show login page on load
window.onload = function () {
    showLoginPage();
};