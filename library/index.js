const myLibrary = [];

function Book(name, author, year) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.id = crypto.randomUUID();
};

function addBookToLibrary(library, name, author, year) {
    const book = new Book(name, author, year);

    return library.push(book);
};

addBookToLibrary(myLibrary, 'Harry Potter', 'JK Rowling', '1999');
addBookToLibrary(myLibrary, 'Lord of Rings', 'IDK', '1980');

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
        year.innerHTML = item.year;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Delete!"
        deleteBtn.onclick = () => deleteBook(array, item.id)

        row.append(name, author, year, deleteBtn)
        
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

    const name = nameField.value ? nameField.value : "Unknown";
    const author = authorField.value ? authorField.value : "Unknown";
    const year = yearField.value ? yearField.value : "Unknown";

    addBookToLibrary(myLibrary, name, author, year);
    renderLibary(tableElement, myLibrary);
});

const tableElement = document.querySelector(".books")

renderLibary(tableElement, myLibrary);

