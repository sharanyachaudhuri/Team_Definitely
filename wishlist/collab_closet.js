var collections = JSON.parse(localStorage.getItem("collections")) || {
    "Traditional": [],
    "Summer": [],
    "Myboard": [],
    "Wedding": []
};

window.addEventListener('load', function () {
    displayCollections();
    populateCollectionDropdown();
});

function displayCollections() {
    document.querySelector(".container").innerHTML = "";
    for (var collectionName in collections) {
        var collectionBox = document.createElement("div");
        collectionBox.classList.add("collection-box");

        var collectionTitle = document.createElement("h4");
        collectionTitle.textContent = collectionName;

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

document.getElementById("create-collection-btn").addEventListener("click", function () {
    var newCollectionName = document.getElementById("new-collection-name").value.trim();
    if (newCollectionName && !collections[newCollectionName]) {
        collections[newCollectionName] = [];
        localStorage.setItem("collections", JSON.stringify(collections));
        populateCollectionDropdown();
        alert(`Collection ${newCollectionName} created`);
    } else {
        alert("Collection already exists or invalid name");
    }
});

function populateCollectionDropdown() {
    var collectionDropdown = document.getElementById("collection-dropdown");
    collectionDropdown.innerHTML = "";

    for (var collectionName in collections) {
        var option = document.createElement("option");
        option.value = collectionName;
        option.text = collectionName;
        collectionDropdown.appendChild(option);
    }
}

document.getElementById("add-to-collection-btn").onclick = function () {
    var collectionName = document.getElementById("collection-dropdown").value;
    var item = JSON.parse(localStorage.getItem("currentItem"));
    if (collectionName) {
        addToCollection(item, collectionName);
        modal.style.display = "none";
    }
};

function addToCollection(item, collectionName) {
    if (!collections[collectionName]) {
        collections[collectionName] = [];
    }
    collections[collectionName].push(item);
    localStorage.setItem("collections", JSON.stringify(collections));
    alert(`Item added to ${collectionName} collection`);
}

var modal = document.getElementById("collection-modal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
