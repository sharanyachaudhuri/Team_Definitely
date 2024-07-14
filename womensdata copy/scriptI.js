
document.querySelector('.delivery-options button').addEventListener('click', function() {
  const pincode = document.querySelector('.delivery-options input').value;
  if (pincode) {
      alert('Delivery available for pincode: ' + pincode);
  } else {
      alert('Please enter a pincode.');
  }
})

document.addEventListener("DOMContentLoaded", function() {
  var styleStoriesButton = document.getElementById("styleStoriesButton");
  styleStoriesButton.addEventListener("click", function() {
      window.location.href = 'stories.html'; // Change to your target page URL
  });
});


function addToCollection(item, collectionName) {
  if (!collections[collectionName]) {
      collections[collectionName] = [];
  }
  collections[collectionName].push(item);
  localStorage.setItem("collections", JSON.stringify(collections));
  alert(`Item added to ${collectionName} collection`);
}

function addToBaglist(element) {
  var bagList = JSON.parse(localStorage.getItem("BagListObj")) || [];
  bagList.push(element);
  localStorage.setItem("BagListObj", JSON.stringify(bagList));
}