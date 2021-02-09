let add_cart = document.getElementsByClassName("add-to-cart");
var cart = document.querySelector('#cart tbody')
var notif = document.querySelector('body')
console.log(add_cart)

//recuperation des données pour le local storage et verifier si la valeur des données n'est pas nul
if (localStorage.getItem('cartStockage') == null) {
    localStorage.setItem('cartStockage', '[]')
}
var cartStockage = JSON.parse(localStorage.getItem('cartStockage'))
for (let i = 0; i < cartStockage.length; i++) {
    addToCart(cartStockage[i])
}

//boucle pour mettre les donnée de l'article dans le local storage
for (let i = 0; i < add_cart.length; i++) {
    const element = add_cart[i];
    element.addEventListener('click', () => {
        let data = element.getAttribute('data-id');
        console.log(data)
        cartStockage.push(data)
        localStorage.setItem('cartStockage', JSON.stringify(cartStockage))
    })
}

//fonction pour mettre les articles dans le panier
function addToCart(id) {
    let course = COURSES[id]
    console.log(`Add ${course.title} to cart`);
    cart.insertAdjacentHTML('afterbegin', `
        <tr>
            <td><img src="img/courses/${course.img}" alt="${course.title} logo"></td>
            <td>${course.title}</td>
            <td>${course.price}€</td>
            <td>1</td>
            <td><img src="img/cross.png" class="remove-course" data-id="${id}" style="width:25px;height:auto;cursor:pointer"></td>
        </tr>
    `)
}
