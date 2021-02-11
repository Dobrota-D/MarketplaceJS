let add_cart = document.getElementsByClassName("add-to-cart");
let cart = document.querySelector('#cart tbody');
let notif = document.querySelector('body');
//let recap = document.querySelector("#recap");
const container = document.querySelector('.courses__container');
console.log(add_cart);
let is_cart_empty = true;

// recupère le nombre de leçons
let coursesLength = Object.keys(COURSES).length;
// Affichage des cards 
for (let i = coursesLength; i > 0; i--){
    let course = COURSES[i];
    container.insertAdjacentHTML('afterbegin',`
    <div class="course__item">
        <figure class="course_img">
        <img src="img/courses/${course.img}">
        </figure>
        <div class="info__card">
        <h4>${course.title}</h4>
        <figure class="mark m_${course.mark}">
            <img src="img/rates.png">
        </figure>
        <p>
            <span class="price">${course.initial_price} €</span>
            <span class="discount">${course.price} €</span>
        </p>
        <p>
            Disponible: <span class="stock">${course.stock}</span>
        </p>
        <a href="#" class="add-to-cart" data-id=${course.id}><i class="fa fa-cart-plus"></i>Ajouter au panier</a>
        </div>
    </div>
    `);
}

//recuperation des données pour le local storage et verifier si la valeur des données n'est pas nul
if (localStorage.getItem('cartStockage') == null) {
    localStorage.setItem('cartStockage', '[]')
}
let cartStockage = JSON.parse(localStorage.getItem('cartStockage'));
for (let i = 0; i < cartStockage.length; i++) {
    addToCart(cartStockage[i]);
}
//boucle pour mettre les donnée de l'article dans le local storage
for (let i = 0; i < add_cart.length; i++) {
    const element = add_cart[i];
    element.addEventListener('click', () => {
        let data = element.getAttribute('data-id');
        console.log(data)
        cartStockage.push(data)
        localStorage.setItem('cartStockage', JSON.stringify(cartStockage));
        notifDisplayAdd(data);
    })
}

//fonction pour mettre les articles dans le panier
function addToCart(id) {
    let course = COURSES[id];
    console.log(`Add ${course.title} to cart`);
    cart.insertAdjacentHTML('afterbegin', `
        <tr>
            <td><img src="img/courses/${course.img}" alt="${course.title} logo"></td>
            <td>${course.title}</td>
            <td>${course.price}€</td>
            <td>1</td>
            <td><img src="img/cross.jpg" class="remove-course" data-id="${id}" onclick="removeItemFromCart(${id})" style="width:25px;height:auto;cursor:pointer"></td>

        </tr>
    `)
    is_cart_empty = false;
}

//vider le panier
let btn_clear = document.querySelector("#empty-cart");
btn_clear.addEventListener('click', () => {
    localStorage.clear()
    document.location.reload();
    is_cart_empty = true;
})

//retirer un article du panier 
function removeItemFromCart(id) {
    let table = JSON.parse(localStorage.getItem('cartStockage'));
    for (let i = 0; i < table.length; i++) {
        let oui =  table
        console.log(oui)
        const element = oui[i];
        
        if (element == id) {
            oui.splice(i, 1)
            localStorage.setItem('cartStockage', JSON.stringify(oui))
            document.location.reload();
        }
    }

}

//verifie si le panier est vide pour pouvoir valider la commande 
let check_if_cart_empty = document.getElementById("valid-cart");

function alert_cart_empty(event){
    event.preventDefault();
    alert('Votre panier est vide')
}

if (is_cart_empty == true){
    check_if_cart_empty.addEventListener('click', alert_cart_empty)
}

//vider le panier une fois la commande valider 
let btn_clear_after_validation = document.querySelector('#valid-cart')
btn_clear_after_validation.addEventListener('click', () => {
    localStorage.clear();
    is_cart_empty = true;
})

//notification ajout article du panier
function notifDisplayAdd(cardId){
    notif.insertAdjacentHTML('afterbegin', `
        <div class="alert" style="background-color: #00B2BD;">
            <span class="alertaddcart"></span>
            ${COURSES[cardId].title} à été ajouté au panier !
        </div>
    `) 
    setTimeout(function(){
        $('body').children().remove('.alert');
    }, 3000);    
}

//notification supprimer article du panier
function notifDisplayRemove(cardId){
    notif.insertAdjacentHTML('afterbegin', `
        <div class="alert" style="background-color: #00B2BD;">
            <span class="alertaddcart"></span>
            ${COURSES[cardId].title} à bien été supprimer au panier !
        </div>
    `) 
    setTimeout(function(){
        $('body').children().remove('.alert');
    }, 3000);    
}

