//  cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//abrir carrito de compras
cartIcon.onclick = () => {
    cart.classList.add("active");
}

//cerrar carrito de compras
// closeCart.onclick = () => {
//     cart.classList.remove("active");
// }
