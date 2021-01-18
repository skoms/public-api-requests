/**
 * Fetches data from the API specified in the function and parses it to JSON,
 * as well as throwing an error message if something went wrong
 */
function fetchData() {
    fetch('https://randomuser.me/api/?results=12')
        .then( response => response.json() )
        .then( data => generateCards(data.results) )
}

fetchData();
/* 
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">first last</h3>
            <p class="card-text">email</p>
            <p class="card-text cap">city, state</p>
        </div>
    </div> 
*/

function generateCards(employees) {
    const gallery = document.getElementById('gallery');
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div> 
    `);
    }
}

function cardEventHandler() {
    
}