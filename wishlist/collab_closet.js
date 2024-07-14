var womensData = [{
    image_url: "https://bit.ly/3uHGEnN",
    brand: "Anouk",
    para: "Women Pink Self Design Kurta with Trousers & Dupatta",
    rs: 791,
    price: "Rs. 791",
    strikedoffprice: "Rs. 3298",
    offer: "(76% OFF)",
    wishList: "Add to collection ♡",
    addToBag: "ADD TO BAG",
},
// ... other items ...
{
    image_url: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11715910/2020/12/9/9442c1af-94fd-4c60-b9c8-044ed39535ec1607497230477-Rubans-Women-Silver-Plated-Oxidised-Elasticated-Bracelet-485-1.jpg",
    brand: "Yoke",
    para: "Women Silver-Plated Oxidised Elasticated Bracelet",
    rs: 899,
    price: "Rs. 899",
    strikedoffprice: "Rs. 2999",
    offer: "(65% OFF)",
    wishList: "Add to collection ♡",
    addToBag: "ADD TO BAG",
},
];

var collections = JSON.parse(localStorage.getItem("collections")) || {
    "Traditional": [],
    "Summer": [],
    "Myboard": [],
    "Wedding": []
};

var collabClosets = JSON.parse(localStorage.getItem("collabClosets")) || {
    "riya_and_seema": []
    // More collab closets can be added here
};

window.addEventListener('load', function () {
    displayPage(womensData);
    populateCollectionDropdown();
    populateCollabDropdown(); // New function to populate collab dropdown
});

function displayPage(womensData) {
    document.getElementById("container").innerHTML = "";

    womensData.map(function (element) {
        var box = document.createElement("div");
        box.style.cursor = "pointer";

        var img = document.createElement("img");
        img.src = element.image_url;

        var contentBox = document.createElement("div");
        contentBox.setAttribute("class", "contentBox");

        var brand = document.createElement("h4");
        brand.textContent = element.brand;

        var para = document.createElement("p");
        para.textContent = element.para;

        var mix = document.createElement("div");
        mix.setAttribute("class", "mixbox");

        var price = document.createElement("p");
        price.textContent = element.price;

        var strikeprice = document.createElement("p");
        strikeprice.textContent = element.strikedoffprice;
        strikeprice.setAttribute("class", "strikep");

        var offer = document.createElement("p");
        offer.textContent = element.offer;
        offer.setAttribute("class", "offerp");

        mix.append(price, strikeprice, offer);

        var wishList = document.createElement("p");
        wishList.setAttribute("class", "wishListp");
        wishList.textContent = element.wishList;
        wishList.style.cursor = "pointer";

        wishList.addEventListener("click", debounce(function () {
            openCollectionModal(element);
        }, 300));

        var addToBag = document.createElement("p");
        addToBag.setAttribute("class", "addToBagp");
        addToBag.textContent = element.addToBag;
        addToBag.style.cursor = "pointer";

        addToBag.addEventListener("click", function () {
            addToBaglist(element);
            addToBag.innerText = "ADDED TO BAG";
        });

        contentBox.append(brand, para, mix, wishList, addToBag);
        box.append(img, contentBox);

        document.querySelector("#container").append(box);
    });
}

function openCollectionModal(item) {
    var modal = document.getElementById("collection-modal");
    modal.style.display = "block";
    localStorage.setItem("currentItem", JSON.stringify(item));

    document.getElementById("add-to-collection-btn").onclick = function () {
        var collectionName = document.getElementById("collection-dropdown").value;
        if (collectionName) {
            addToCollection(item, collectionName);
            modal.style.display = "none";
        }
    };

    document.getElementById("add-to-collab-btn").onclick = function () {
        var collabName = document.getElementById("collab-dropdown").value;
        if (collabName) {
            addToCollabCloset(item, collabName);
            modal.style.display = "none";
        }
    };
}

function addToCollection(item, collectionName) {
    if (!collections[collectionName]) {
        collections[collectionName] = [];
    }
    collections[collectionName].push(item);
    localStorage.setItem("collections", JSON.stringify(collections));
    alert(`Item added to ${collectionName.split('-')[0]} collection`);
}

function addToCollabCloset(item, collabName) {
    if (!collabClosets[collabName]) {
        collabClosets[collabName] = [];
    }
    collabClosets[collabName].push(item);
    localStorage.setItem("collabClosets", JSON.stringify(collabClosets));
    alert(`Item added to ${collabName} collab closet`);
}

function addToBaglist(element) {
    var bagList = JSON.parse(localStorage.getItem("BagListObj")) || [];
    bagList.push(element);
    localStorage.setItem("BagListObj", JSON.stringify(bagList));
}

document.getElementById("create-collection-btn").addEventListener("click", function () {
    var user = sessionStorage.getItem('user');
    var newCollectionName = document.getElementById("new-collection-name").value.trim();
    if (newCollectionName && !collections[newCollectionName]) {
        collections[newCollectionName + "-" + user] = [];
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
        option.text = collectionName.split('-')[0];
        collectionDropdown.appendChild(option);
    }
}

function populateCollabDropdown() {
    var collabDropdown = document.getElementById("collab-dropdown");
    collabDropdown.innerHTML = "";

    for (var collabName in collabClosets) {
        var option = document.createElement("option");
        option.value = collabName;
        option.text = collabName;
        collabDropdown.appendChild(option);
    }
}

document.getElementById("land").addEventListener("click", function () {
    window.location.href = "/LandingPage/index.html";
});

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

window.ondblclick = function () {
    modal.style.display = "none";
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
