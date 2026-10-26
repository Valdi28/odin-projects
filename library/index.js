const myLibrary = [];

function Book(name, author, year, readed) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.readed = readed;
    this.toggleReadingStatus = () => {
        this.readed = this.readed ? false : true;
    };
    this.id = crypto.randomUUID();
};

function addBookToLibrary(library, name, author, year, readed) {
    const book = new Book(name, author, year, readed);

    return library.push(book);
};

addBookToLibrary(myLibrary, 'Harry Potter', 'JK Rowling', '1999', true);
addBookToLibrary(myLibrary, 'Lord of Rings', 'IDK', '1980', true);

console.log(myLibrary);


function renderLibary(tableElement, array) {
    while (tableElement.firstChild) {
        tableElement.removeChild(tableElement.lastChild);
    };

    for (let i = 0; i<array.length; i++) {
        const item = array[i];
        

        const row = document.createElement('tr');

        const name = document.createElement('td');
        name.innerText = item.name;

        const author = document.createElement('td');
        author.innerText = item.author;

        const year = document.createElement('td');
        year.innerText = item.year;

        const readed = document.createElement('td');
        readed.innerText = item.readed ? 'Yes' : 'No';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Delete!"
        deleteBtn.onclick = () => deleteBook(array, item.id)

        const toggleReadingStatus = document.createElement('button');
        toggleReadingStatus.innerText = "Toggle readed status";
        toggleReadingStatus.onclick = () => {
            item.toggleReadingStatus();
            renderLibary(tableElement, myLibrary);
        };

        row.append(name, author, year, readed, deleteBtn, toggleReadingStatus)
        
        tableElement.appendChild(row);
    };

    return tableElement;
};

function deleteBook(array, bookId) {
    const bookIndex = array.findIndex(book => book.id == bookId);

    array.splice(bookIndex, 1)
    

    renderLibary(tableElement, myLibrary);
};

function toogleElementVisibility(element) {
    element.classList.toggle('hidden');
};

const addBookToggle = document.querySelector('.addBookToggle');
const addBookForm = document.querySelector('.addBookForm');
const submitAddBook = document.querySelector('.submitAddBook');

addBookToggle.addEventListener('click', () => toogleElementVisibility(addBookForm));
submitAddBook.addEventListener('click', (event) => {
    event.preventDefault();

    const nameField = document.querySelector('#nameField');
    const authorField = document.querySelector('#authorField');
    const yearField = document.querySelector('#yearField');
    const readedStatusField = document.querySelector('#readedStatusField');

    const name = nameField.value ? nameField.value : "Unknown";
    const author = authorField.value ? authorField.value : "Unknown";
    const year = yearField.value ? yearField.value : "Unknown";
    const readedStatus = readedStatusField.checked ? true : false;

    console.log(readedStatusField.checked);
    

    addBookToLibrary(myLibrary, name, author, year, readedStatus);
    renderLibary(tableElement, myLibrary);
});

const tableElement = document.querySelector(".books")

renderLibary(tableElement, myLibrary);

