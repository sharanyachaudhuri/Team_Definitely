var user = sessionStorage.getItem('user');
var collections = JSON.parse(localStorage.getItem("collections")) || {};

var filteredCollections = {};

for (var key in collections) {
    // Check if the key contains the hyphen and the specific number after it
    if (key.includes('-' + user)) {
      // Add the key-value pair to the filteredCollections object
      filteredCollections[key] = collections[key];
    }
  }
var collections = filteredCollections;


function displayCollections() {
    document.querySelector(".container").innerHTML = "";
    for (var collectionName in collections) {
        var collectionBox = document.createElement("div");
        collectionBox.classList.add("collection-box");

        var collectionTitle = document.createElement("h4");
        collectionTitle.textContent = collectionName.split('-')[0];

        var itemsContainer = document.createElement("div");
        itemsContainer.classList.add("items-container");

        collections[collectionName].forEach(function (item, index) {
            var itemBox = document.createElement("div");
            itemBox.classList.add("item-box");

            var img = document.createElement("img");
            img.src = item.image_url;

            var brand = document.createElement("p");
            brand.textContent = item.brand;

            var price = document.createElement("span");
            price.textContent = item.price;
            price.style.color = "black";

            var strikedprice = document.createElement("span");
            strikedprice.textContent = item.strikedoffprice;
            strikedprice.style.textDecoration = "line-through";
            strikedprice.style.color = "gray";

            var offer = document.createElement("span");
            offer.textContent = item.offer;
            offer.style.color = "red";

            var pricepara = document.createElement("p");
            pricepara.className = "pricepara";
            pricepara.append(price, strikedprice, offer);

            var buttonrm = document.createElement("button");
            buttonrm.innerText = "Remove";
            buttonrm.addEventListener("click", function () {
                removeFromCollection(collectionName, index);
            });

            var buttonbag = document.createElement("button");
            buttonbag.innerText = "MOVE TO BAG";
            buttonbag.addEventListener("click", function () {
                moveToBag(item, collectionName, index);
            });

            var buttonholder = document.createElement("div");
            buttonholder.className = "buttonholder";
            buttonholder.append(buttonrm, buttonbag);

            itemBox.append(img, brand, pricepara, buttonholder);
            itemsContainer.append(itemBox);
        });

        collectionBox.append(collectionTitle, itemsContainer);
        document.querySelector(".container").append(collectionBox);
    }
}

function removeFromCollection(collectionName, index) {
    collections[collectionName].splice(index, 1);
    localStorage.setItem("collections", JSON.stringify(collections));
    displayCollections();
}

function moveToBag(item, collectionName, index) {
    var baglist = JSON.parse(localStorage.getItem("BagListObj")) || [];
    baglist.unshift(item);
    localStorage.setItem("BagListObj", JSON.stringify(baglist));

    collections[collectionName].splice(index, 1);
    localStorage.setItem("collections", JSON.stringify(collections));
    displayCollections();
}

document.getElementById("landingPage").addEventListener("click", function () {
    window.location.href = "../Landingpage/index.html";
});

displayCollections();
