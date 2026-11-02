// Sweet Crumbs Bakery - Interactive Favorites

const bakeryItems = [
"Chocolate chip",
"Snickerdoodle",
"Oatmeal raisin",
"Vanilla buttercream",
"Double chocolate",
"Strawberry swirl",
"Brownie square",
"Mini cinnamon roll",
"Seasonal cookie box"
];

const bakeryInfo = {
name: "Sweet Crumbs Bakery",
storageKey: "sweetCrumbsFavorites"
};

let favorites = [];

// Load previously saved favorites
function loadFavorites() {
try {
const saved = localStorage.getItem(bakeryInfo.storageKey);
const parsed = saved ? JSON.parse(saved) : [];

favorites = Array.isArray(parsed)
? parsed.filter(item => bakeryItems.includes(item))
: [];
} catch (error) {
favorites = [];
}

displayFavorites();
}

// Save favorites to browser storage
function saveFavorites() {
try {
localStorage.setItem(
bakeryInfo.storageKey,
JSON.stringify(favorites)
);
return true;
} catch (error) {
showMessage("Favorites could not be saved in this browser.");
return false;
}
}

// Display favorites on the page
function displayFavorites() {
const list = document.getElementById("favoritesList");
if (!list) return;

list.innerHTML = "";

favorites.forEach(function(item) {
const li = document.createElement("li");
li.textContent = item;
list.appendChild(li);
});

if (favorites.length === 0) {
const li = document.createElement("li");
li.textContent = "No favorites selected yet.";
list.appendChild(li);
}
}

// Show feedback to the user
function showMessage(message) {
const messageBox = document.getElementById("favoriteMessage");
if (messageBox) {
messageBox.textContent = message;
}
}

// Add a selected bakery item
function addFavorite() {
const select = document.getElementById("treatSelect");
const selected = select.value;

if (!selected) {
showMessage("Please select a treat first.");
return;
}

if (favorites.includes(selected)) {
showMessage("This treat is already in your favorites.");
return;
}

if (!bakeryItems.includes(selected)) {
showMessage("Please choose a valid bakery item.");
return;
}

favorites.push(selected);
saveFavorites();
displayFavorites();

showMessage(selected + " was added to your favorites!");
select.value = "";
}

// Remove all favorites
function clearFavorites() {
favorites = [];
saveFavorites();
displayFavorites();
showMessage("Your favorites have been cleared.");
}

// Set up buttons when the page loads
document.addEventListener("DOMContentLoaded", function() {
const addButton = document.getElementById("addFavorite");
const clearButton = document.getElementById("clearFavorites");

if (addButton && clearButton) {
addButton.addEventListener("click", addFavorite);
clearButton.addEventListener("click", clearFavorites);
loadFavorites();
}
});
// Sweet Crumbs Bakery - Contact Form Validation

// Display an error message beside a field
function showFieldError(fieldId, message) {
const field = document.getElementById(fieldId);
const error = document.getElementById(fieldId + "Error");

if (field && error) {
error.textContent = message;

if (message) {
field.setAttribute("aria-invalid", "true");
} else {
field.removeAttribute("aria-invalid");
}
}
}

// Check the name field
function validateName() {
const name = document.getElementById("name").value.trim();

if (name.length === 0) {
showFieldError("name", "Please enter your name.");
return false;
}

if (name.length < 2) {
showFieldError("name", "Name must be at least 2 characters.");
return false;
}

showFieldError("name", "");
return true;
}

// Check the email field
function validateEmail() {
const email = document.getElementById("email").value.trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (email.length === 0) {
showFieldError("email", "Please enter your email address.");
return false;
}

if (!emailPattern.test(email)) {
showFieldError("email", "Please enter a valid email address.");
return false;
}

showFieldError("email", "");
return true;
}

// Check the message field
function validateMessage() {
const message = document.getElementById("message").value.trim();

if (message.length === 0) {
showFieldError("message", "Please enter a message.");
return false;
}

if (message.length < 10) {
showFieldError("message", "Message must be at least 10 characters.");
return false;
}

showFieldError("message", "");
return true;
}

// Validate the complete contact form
function validateContactForm(event) {
event.preventDefault();

const nameValid = validateName();
const emailValid = validateEmail();
const messageValid = validateMessage();

const status = document.getElementById("form-status");

if (nameValid && emailValid && messageValid) {
status.textContent =
"Your information is valid! This is a demo, so your message was not sent.";
} else {
status.textContent =
"Please correct the highlighted errors before continuing.";
}
}

// Activate form validation
document.addEventListener("DOMContentLoaded", function() {
const contactForm = document.getElementById("contactForm");

if (contactForm) {
contactForm.addEventListener("submit", validateContactForm);

document.getElementById("name")
.addEventListener("input", validateName);

document.getElementById("email")
.addEventListener("input", validateEmail);

document.getElementById("message")
.addEventListener("input", validateMessage);
}
});
