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
    for (let i = 0; i<array.length; i++) {
        const item = array[i];
        

        const row = document.createElement('tr');

        const name = document.createElement('td');
        name.innerText = item.name;

        const author = document.createElement('td');
        author.innerText = item.author;

        const year = document.createElement('td');
        year.innerHTML = item.year;

        row.append(name, author, year)
        
        tableElement.appendChild(row);
    };

    return tableElement;
};

const tableElement = document.querySelector(".books")

renderLibary(tableElement, myLibrary);