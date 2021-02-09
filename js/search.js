let searchBar = document.getElementById('search-item');
let courses = document.querySelectorAll('.courses__container .course__item');
let noCourse = document.getElementById('no_course');

searchBar.addEventListener('keyup', (input) => {
    // récupère valeur dans l'input et le transforme en miniscule
    let searchInput = input.target.value.toLowerCase();
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i]
        // récupère le noms de la leçon et le transforme en miniscule
        const courseLangage = course.querySelector('h4').innerHTML.toLowerCase();
        // Si l'input est présent dans le nom l'affiche
        if (courseLangage.indexOf(searchInput) > -1) {
            course.style.display = "flex";
        }else{ // Sinon le cache
            course.style.display = "none";
        }
    }
    let count = 0;
    for (let i = 0; i < courses.length; i++){
        // Si un cours est affiché ajoute +1 à count
        if(courses[i].style.display == 'flex'){
            count++;
        }
    }
    // Si aucun cours n'est affiché et que l'input n'est pas vide
    if (count == 0 && searchBar != ''){
        noCourse.classList.remove('hidden');
        // Enleve "hidden" à la classe qui rend visible le message d'erreur
    }
    // Si un ou plusieurs cours sont affichés ou que l'input est pas vide
    if (searchInput == '' || count != 0 ){
        noCourse.classList.add('hidden');
        // Ajoute "hidden" à la classe qui rend caché le message d'erreur
    }
});