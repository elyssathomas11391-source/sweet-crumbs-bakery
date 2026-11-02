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
