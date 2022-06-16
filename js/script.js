"use strict"
import { products } from './data.js';
import { filter, find } from './filters.js';

function generateCard(productsArray) {
  let html = '';
  for (const element of productsArray) {
    html +=
      `
      <div class="card mb-5 me-auto" style="width: 18rem">
          <img src="${element.images}" class="card-img-top" alt="${element.model}" />
          <div class="card-body border-top" style="width: 100%">
            <h5 class="card-title">${element.brand}</h5>
            <p class="card-text">${element.model}</p>
            <h5 class="card-title">Precio</h5>
            <div href="#" class="row">
                <div class="col-6">
                  <p class="card-text price">${element.price}</p>
                </div>
                <div class="col-2 divbuttoncarrito">
                  <img src="/img/shopping-cart 3.svg" alt="buttoncarrito" class="imgbuttoncarrito btn-carrito" id=${element.id}>
                </div>
              </div>
          </div>       
      </div>
      `
  }
  const container = document.getElementById('productscontainer');
  container.innerHTML = html;
  
}
generateCard(products);
totalesProductos(products)

// Total de productos
function totalesProductos(products){
  const totales = document.getElementById('totales')
  const productos = products.length
  totales.innerHTML = productos
}

// Buscar por marca
function cbFilterByBrand(element) {
  const inputBrand = document.getElementById('brand-filter')
  console.log(inputBrand)
  return element.brand.toLowerCase().includes(inputBrand.value.toLowerCase())
}

function filterByBrand() {
  let productByBrand = filter(products, cbFilterByBrand)
  console.log(productByBrand)
  generateCard(productByBrand)
}

function addCarrito() {

  document.querySelectorAll('.btn-carrito').forEach((el) => {

    el.addEventListener('click', (e) => {

      const cartProductsIds = JSON.parse(localStorage.getItem('cartProducts')) ?? [];

      const newCartProductsIds = [...cartProductsIds, e.target.id];

      localStorage.setItem('cartProducts', JSON.stringify(newCartProductsIds));

      actualizarCarrito();

    })

  })

}

function actualizarCarrito() {

  const carrito = document.getElementById('cntr-carrito');
  const cartProductsIds = JSON.parse(localStorage.getItem('cartProducts')) ?? [];
  const cartProducts = products.filter(prod => cartProductsIds.includes(String(prod.id)))

  carrito.innerHTML = '';

  let htmlProducts = '';

  for (const element of cartProducts) {
    htmlProducts +=
      `
      <div class="cart-card" >
				<img
					src="${element.images}"
					class="card-img-top"
					alt="${element.model}"
				/>
			<div class="detail-card">
				<div class="cart-product-title">
					<h5 class="textmarca">${element.brand}</h5>
				</div>
				<div class="cart-model-title">
					<p class="textmodelo">${element.model}</p>
				</div>
        <div class="cart-model-title">
					<p class="textmodelo">${element.price}</p>
				</div>
				<input type="number" value="1" class="cart-quantity">
			</div>
				<!--remove-->
					<i class='bx bxs-trash cart-remove' onclick="removeCart(${element.id})"></i>
			</div>
      `
  }

  let total = 0;

  cartProducts.forEach((prod)=>{

    total += parseFloat(prod.price);

  })
  total = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const htmlTotal = `
  <div class="total">
		<div class="total-title">
			Total
		</div>  
		<div class="total-price">
			$${total}
		</div>
	  </div>
		<!--buy button-->
		<button type="button" class="btn-buy" data-bs-toggle="modal" data-bs-target="#pagoModal" onclick="clearLocalStorage()">
			Proceder al pago
		</button>
		<i class='bx bx-x' id="close-cart" onclick="cart.classList.remove('active')"></i>
    `

  carrito.innerHTML = htmlProducts;
  carrito.innerHTML += htmlTotal;

}

function clearLocalStorage(){
  localStorage.clear()
  actualizarCarrito()
}

function removeCart(id){
  console.log('desde remove cart');
  let shoppingCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
 
  let index = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    if(shoppingCart[i] == id) {
      index = i;
      break;
    }
  }
  let del = JSON.parse(localStorage.getItem('cartProducts')) || [];
  
  console.log(shoppingCart);
  del.splice(index,1);
  console.log('del', del);
  console.log(index);
  localStorage.setItem('cartProducts',JSON.stringify(del));
  actualizarCarrito();

}

addCarrito();
actualizarCarrito();

window.filterByBrand = filterByBrand
window.removeCart = removeCart;
window.clearLocalStorage = clearLocalStorage