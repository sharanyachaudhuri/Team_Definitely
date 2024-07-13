var collabCollections = JSON.parse(localStorage.getItem("collabCollections")) || {};

function displayCollabCollections() {
    document.querySelector(".container").innerHTML = "";
    for (var collectionName in collabCollections) {
        var collectionBox = document.createElement("div");
        collectionBox.classList.add("collection-box");

        var collectionTitle = document.createElement("h4");
        collectionTitle.textContent = collectionName;

        var itemsContainer = document.createElement("div");
        itemsContainer.classList.add("items-container");

        collabCollections[collectionName].forEach(function (item, index) {
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
                removeFromCollabCollection(collectionName, index);
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

function removeFromCollabCollection(collectionName, index) {
    collabCollections[collectionName].splice(index, 1);
    localStorage.setItem("collabCollections", JSON.stringify(collabCollections));
    displayCollabCollections();
}

function moveToBag(item, collectionName, index) {
    var baglist = JSON.parse(localStorage.getItem("BagListObj")) || [];
    baglist.unshift(item);
    localStorage.setItem("BagListObj", JSON.stringify(baglist));

    collabCollections[collectionName].splice(index, 1);
    localStorage.setItem("collabCollections", JSON.stringify(collabCollections));
    displayCollabCollections();
}

document.getElementById("landingPage").addEventListener("click", function () {
    window.location.href = "../Landingpage/index.html";
});

displayCollabCollections();
