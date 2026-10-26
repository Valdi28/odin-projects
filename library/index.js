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


