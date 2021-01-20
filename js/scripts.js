/**
 * Creates and displays employee cards dynamically, as well as modal windows, which are initialized as hidden. Also adds listener on the card, to open the associated modal window
 * @param {Array} employees - an array of 'employee' objects retrieved through remote API
 */
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
                        <p class="modal-text">${formatCellNumber(employee.cell)}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formatDateOfBirth(employee.dob.date)}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                </div>
            </div>
        `);
        
        const modal = document.querySelector(`.mod-${i}`);
        const card = document.querySelector(`.crd-${i}`);
        const modalBtnContainer = modal.querySelector('.modal-btn-container');

        if( i !== 0 ) {
            modalBtnContainer.insertAdjacentHTML('beforeend', `
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            `);
        } else {
            modalBtnContainer.insertAdjacentHTML('beforeend', `
                <button type="button" id="modal-prev" class="modal-prev btn" style="display: none;">Prev</button>
            `);
        }
        if( i !== 11 ) {
            modalBtnContainer.insertAdjacentHTML('beforeend', `
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            `);
        } else {
            modalBtnContainer.insertAdjacentHTML('beforeend', `
                <button type="button" id="modal-next" class="modal-next btn" style="display: none;">Next</button>
            `);
        }
        
        card.addEventListener('click', e => {
            modal.classList.remove('hide');
            modal.classList.add('show');
        });
    }
}
/**
 * Dynamically creates and adds search-bar
 */
function createSearchBar() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.insertAdjacentHTML('beforeend', `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input"  placeholder="&#128270;  Search...">
        </form>
    `);
}
/**
 * Formats the cellnumber to match American format
 * @param {string} numStr - cellphone number
 * @returns {string} - Formatted cellnumber
 * OR
 * @returns {string} numbase - unformatted clean number(only if the number is not 10 characters long)
 */
// Credits go to editor Prashant Yadav, on 'https://learnersbucket.com/examples/javascript/how-to-format-phone-number-in-javascript/'.
function formatCellNumber( numStr ) {
    const numBase = numStr.replace(/\D/g, '');
    const match = numBase.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return numBase;
}
/**
 * Formats the date of birth to match American format
 * @param {string} dob - date of birth
 * @returns {string} - Formatted date of birth
 * OR
 * @returns {null} - returns null if the provided argument is invalid
 */
function formatDateOfBirth( dob ) {
    const numBase = dob.replace(/\D/g, '');
    const match = numBase.match(/^(\d{4})(\d{2})(\d{2})/);
    if (match) {
        return  match[2] + ' / ' + match[3] + ' / ' + match[1]
    };
    return null;
}
/**
 * Adds event listeners to all modal windows for 'close', 'next' and 'prev' buttons
 */
function addModalWindowEventHandlers() {
    [...document.querySelectorAll('.modal-close-btn')].forEach( closeButton => {
        closeButton.addEventListener('click', e => {
            console.log(e.target.parentNode.parentNode);
            const modalWindow = closeButton.parentNode.parentNode;
            modalWindow.classList.remove('show');
            modalWindow.classList.add('hide');
        })
    });
    [...document.querySelectorAll('.modal-prev')].forEach( prevButton => {
        prevButton.addEventListener('click', e => {
            const index = [...document.querySelectorAll('.modal-prev')].indexOf( prevButton );
            console.log(e.target.parentNode.parentNode);
            console.log(index);
            if( index !== 0 ) {
                const modalWindow = prevButton.parentNode.parentNode;
                modalWindow.classList.remove('show');
                modalWindow.classList.add('hide');
                const prevModalWindow = document.querySelector(`.mod-${index - 1}`);
                prevModalWindow.classList.remove('hide');
                prevModalWindow.classList.add('show');
            }
        })
    });
    [...document.querySelectorAll('.modal-next')].forEach( nextButton => {
        nextButton.addEventListener('click', e => {
            const index = [...document.querySelectorAll('.modal-next')].indexOf( nextButton );
            console.log(e.target.parentNode.parentNode);
            console.log(index);
            if( index !== 11 ) {
                const modalWindow = nextButton.parentNode.parentNode;
                modalWindow.classList.remove('show');
                modalWindow.classList.add('hide');
                const prevModalWindow = document.querySelector(`.mod-${index + 1}`);
                prevModalWindow.classList.remove('hide');
                prevModalWindow.classList.add('show');
            }
        })
    });
}

function addSearchEventHandlers() {
    const employeeNames = [...document.querySelectorAll('.card-name')];
    const searchInput = document.getElementById('search-input');
    const searchSubmitBtn = document.getElementById('search-submit');

    searchInput.addEventListener('keyup', e => {
        const matches = employeeNames.filter( employeeName => employeeName.textContent.toLowerCase().includes(searchInput.value.toLowerCase()));
        console.log(matches);
        employeeNames.forEach( employeeName => {
            const card = employeeName.parentNode.parentNode;
            card.classList.remove('show');
            card.classList.add('hide');
        });
        matches.forEach( match => {
            const card = match.parentNode.parentNode;
            card.classList.remove('hide');
            card.classList.add('show');
            card.classList.remove('show'); // Removing the class again so not to override other classes styling
        });
    });
}
/**
 * Fetches data from the API specified in the function and parses it to JSON, and then calls all the required functions to get the page up and running.
 */
    fetch('https://randomuser.me/api/?results=12&nat=us')
        .then( response => response.json())
        .then( data => generateCardsAndModalWindows(data.results))
        .then( addModalWindowEventHandlers )
        .then( createSearchBar )
        .then( addSearchEventHandlers )

