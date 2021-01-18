function generateCardsAndModalWindows(employees) {
    const gallery = document.getElementById('gallery');
    const body = document.body;

    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        gallery.insertAdjacentHTML('beforeend', `
            <div class="crd-${i} card ">
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

        body.insertAdjacentHTML('beforeend', `
            <div class="mod-${i} modal-container hide">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${employee.dob.date}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `);
        console.log(`modal-${i} made`);

        const modal = document.querySelector(`.mod-${i}`);
        const card = document.querySelector(`.crd-${i}`)
        card.addEventListener('click', e => {
            modal.classList.remove('hide');
            modal.classList.remove('show');
        });
    }
    [...document.querySelectorAll('.modal-close-btn')].forEach( button => {
        button.addEventListener('click', e => {
            console.log(e.target.parentNode.parentNode);
            const modalWindow = button.parentNode.parentNode;
            modalWindow.classList.remove('show');
            modalWindow.classList.add('hide');
        })
    });
}

/**
 * Fetches data from the API specified in the function and parses it to JSON
 */
    fetch('https://randomuser.me/api/?results=12')
        .then( response => response.json())
        .then( data => {
            generateCardsAndModalWindows(data.results);            
        })

        
