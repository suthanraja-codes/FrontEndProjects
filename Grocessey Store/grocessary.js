
// Cart

let cartIcon  = document.querySelector('#cart-icon');
let cart      = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}

// Remove Cart 
closeCart.onclick =()=>{
    cart.classList.remove("active");
}

//  Cart Working Js

if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}

// Making Functions

function ready() {
    let removeCartButton = document.getElementsByClassName('cart-removed');
    console.log(removeCartButton);
    for(var i=0; i<removeCartButton.length; i++){
        var button = removeCartButton[i];
        // console.log(button)
        button.addEventListener('click',removeCartItems);
    }

    //  Quantity Changes

    var quantityInputs = document.getElementsByClassName('cart-input');
    for(var i = 0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChanged);
    }

    //  Add To The Cart

    var addCart = document.getElementsByClassName('add-cart');
    for(var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click',addEventClicked);
    }

    // Buy Button Work

    document.getElementsByClassName('cart-btn')[0].addEventListener("click",buyButtonClicked);
}

//  Buy Button Working Function

function buyButtonClicked(){
    alert('Your Order Is Placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();

}

//  Quantity Changed

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || (input.value <= 0)){
        input.value = 1;
    }
    updateTotal();
}

// Remove Items From Cart

function removeCartItems(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//  Add To The Cart
function addEventClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productsImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productsImg);
    updateTotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');

    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-title');
    for(var i=0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert(`You Have Already Added To This Cart ${title}`);
            return;
        }
        
    }

            var cartBoxContent = `  
                                <img src="${productImg}" alt="" class="cart-img">
                                <div class="detail-box">
                                    <div class="cart-title">${title}</div>
                                    <div class="cart-price">${price}</div>
                                    <input type="number" value="1" class="cart-input">
                                </div>

                                <!--Remove Cart-->
                                <i class='bx bxs-trash-alt cart-removed' id='cart-remove' ></i>  `

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox); 

        cartShopBox.getElementsByClassName('cart-removed')[0].addEventListener('click',removeCartItems);
        cartShopBox.getElementsByClassName('cart-input')[0].addEventListener('change',quantityChanged);
}




//  Update Total Price

function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes     = cartContent.getElementsByClassName('cart-box');
    var total       = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$',''));
        var quantity = quantityElement.value;
        var total = total + (price*quantity);

    }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = '$'+ total;
        console.log(total);
    
}