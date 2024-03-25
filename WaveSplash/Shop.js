const itemList = document.getElementsByClassName('buyButton');

// Event listener for buy button (Add to cart)
for (i = 0; i < itemList.length; i++) {
  itemList[i].addEventListener('click', addToCart);
}

// Add to cart function
function addToCart(event) {

  // Accessing data from HTML file
  const productElement = event.target.closest('.products');
  const productName = productElement.querySelector('.productName').textContent;
  const productPrice = productElement.querySelector('.price').textContent;
  const productImg = productElement.querySelector('.image').src;
  const emptyCartElement = document.getElementById('emptyCartElements');
  const cartTotal = document.getElementById('totalElements');
  const cartContent = document.getElementById('cartContent');
  const checkoutButton = document.getElementById('checkoutButton');

  const productsInCart = document.getElementsByClassName('addedProductName');

  // Boolean to check if the product is already added or not
  let alreadyAdded = false;

  // Cart item HTML
  const addingProductHtml = `<div class="cartProduct">

  <img src=${productImg} alt="mug">


  <p class="addedProductName">${productName}</p>

  <div class="quantity">
    <button class="quantityDown">-</button>
    <div class="quantityValue">1</div>
    <button class="quantityUp">+</button>
  </div>

  <button class="deleteButton"><img src="../images/delete.png" alt="delete"></button>

  <p>$<span class="addingProductPrice" data-price="${productPrice}">${productPrice}</span></p>

</div>`
    ;

  // Checking for already added products
  for (i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].innerHTML === productName) {
      alreadyAdded = true;
    }
  }

  if (!alreadyAdded) {
    emptyCartElement.innerHTML = '';
    cartContent.insertAdjacentHTML('beforeend', addingProductHtml);
    cartTotal.style.visibility = 'visible';
    checkoutButton.style.visibility = 'visible';
    countTotal();
  }
  else {
    alert("This product is already added to the cart.")
  }

  // Event listener for delete button
  const deleteButtons = document.getElementsByClassName('deleteButton');
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteItem);
  }

  // Event listener for quantity up button
  const qtyUpButton = document.getElementsByClassName('quantityUp');
  for (i = 0; i < qtyUpButton.length; i++) {
    qtyUpButton[i].addEventListener('click', qtyUp);
  }

  // Event listener for quantity down button
  const qtyDownButton = document.getElementsByClassName('quantityDown');
  for (i = 0; i < qtyDownButton.length; i++) {
    qtyDownButton[i].addEventListener('click', qtyDown);
  }

  // Event listener for checkout button
  checkoutButton.addEventListener('click', addToInvoice);

  // Event listener for done button on the invoice
  const doneButton = document.getElementById('doneButton');
  doneButton.addEventListener('click', done);


}


// Function to calculate total cost
function countTotal() {
  const pricesToAdd = document.getElementsByClassName('addingProductPrice');
  let totalCost = 0;

  for (i = 0; i < pricesToAdd.length; i++) {
    totalCost += parseFloat(pricesToAdd[i].textContent);
  }
  document.getElementById('totalPrice').textContent = totalCost.toFixed(2); // 2 floating points

}



// Function to delete an item in the cart
function deleteItem(event) {
  const addedProductElement = event.target.closest('.cartProduct');
  addedProductElement.remove();
  countTotal();

  const cartContentElement = document.getElementById('cartContent'); // Checking whether the cart is empty or not
  const emptyCartContent = `
  <div class="cartEmpty" id="emptyCartElements">
  <p>Cart is empty.</p>
  <a href="#"><button>Shopping</button></a>
  </div>
  `;

  // Changing visibility of the total and checkout button when the cart is empty
  if (cartContentElement.children.length === 0) {
    document.getElementById("totalElements").style.visibility = 'hidden';
    document.getElementById("checkoutButton").style.visibility = 'hidden';
    document.getElementById('emptyCartElements').innerHTML = emptyCartContent;
  }
}

// Function to increase quantity
function qtyUp(event) {
  const qtyElement = event.target.parentNode.querySelector('.quantityValue');
  const qtyPriceElement = event.target.parentNode.parentNode.querySelector('.addingProductPrice');
  var quantity = parseInt(qtyElement.textContent); // Casting the string into an int
  var price = parseFloat(qtyPriceElement.dataset.price);

  quantity++;
  qtyElement.textContent = quantity;
  qtyPriceElement.textContent = (price * quantity).toFixed(2);
  countTotal();
}

// Function to decrease quantity
function qtyDown(event) {
  const qtyElement = event.target.parentNode.querySelector('.quantityValue');
  const qtyPriceElement = event.target.parentNode.parentNode.querySelector('.addingProductPrice');
  var quantity = parseInt(qtyElement.textContent); // Casting the string into an int
  var price = parseFloat(qtyPriceElement.dataset.price); 

  if (quantity > 1) {
    quantity--;
    qtyElement.textContent = quantity;
    qtyPriceElement.textContent = (price * quantity).toFixed(2); // 2 floating points
    countTotal();
  }
}


// Function to create the invoice
function addToInvoice() {
  
  // Validating the inputs
  if (submitValidation() === true){
  const invoiceDiv = document.getElementById('invoiceDiv');
  invoiceDiv.style.visibility = 'visible';

  // Accessing data from HTML
  const productNamesForInvoice = document.getElementsByClassName('addedProductName');
  const productQuantityForInvoice = document.getElementsByClassName('quantityValue');
  const productPricesForInvoice = document.getElementsByClassName('addingProductPrice');
  const totalPrice = document.getElementById('totalPrice');

  let invoiceItemsDiv = document.getElementById('invoiceItemsDiv');

  invoiceItemsDiv.innerHTML = '';

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const userInfo = document.getElementById('info');
  const infoUpdate = `<p>Name: ${name.value}</p>
  <p>Email: ${email.value}</p>`

  // Adding invoice info to HTML file using js
  userInfo.insertAdjacentHTML('beforebegin', infoUpdate)

  for (i=0; i < productNamesForInvoice.length; i++){
    console.log(productNamesForInvoice[i])
    let item = productNamesForInvoice[i].textContent;
    let quantityVal = productQuantityForInvoice[i].textContent;
    let price = productPricesForInvoice[i].textContent;
    const itemHtmlElement = `<div class="productsInInvoice">${item} × ${quantityVal} - $${price}</div>`;
    invoiceItemsDiv.insertAdjacentHTML('beforeend', itemHtmlElement);

  }

  const total = `<div class="invoiceTotal">Total: $${totalPrice.textContent}</div>`;
  // Adding invoice info to HTML file using js
  invoiceItemsDiv.insertAdjacentHTML('beforeend', total);
}
}

// Refreshing the webpage after pressing done button on the invoice 
function done() {
  location.reload();
}

// Function to validate inputs
function submitValidation(){
  let valid = true;
  var name = document.getElementById('name');
  var email = document.getElementById('email');

  if(name.value.trim() == '' || email.value.trim() == ''){
    alert("Name and email cannot be empty.");
    valid = false;
  }
  else{
    if(name.value.length < 5){
      alert("Name should be longer than 5 characters")
      valid = false;
    }
  
    var regex = /^([a-zA-Z0-9\.-]+)@([a-z0-9]+)\.([a-z]{2,8})$/
  
    if(!(regex.test(email.value))){
      alert("Enter a valid email address.")
      valid = false;
    }
  }

  return valid;
}