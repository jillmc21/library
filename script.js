let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Displays added book on the screen
function displayBooks(index) {
    const body = document.querySelector(".table-body");
    const rows = document.getElementsByClassName('.row');
    const noBooks = document.querySelector('.no-books');

    let book = myLibrary[index];
    const title = book.title;
    const author = book.author;
    const pages = book.pages;
    const read = book.read;

    const row = document.createElement('div');
    row.className = "row";
    row.dataset.index = index;
    body.appendChild(row);

    const displayTitle = document.createElement('div');
    displayTitle.className = "cell";
    displayTitle.textContent = title;
    row.appendChild(displayTitle);

    const displayAuthor = document.createElement('div');
    displayAuthor.className = "cell";
    displayAuthor.textContent = author;
    row.appendChild(displayAuthor);

    const displayPages = document.createElement('div');
    displayPages.className = "cell";
    displayPages.textContent = pages;
    row.appendChild(displayPages);

    const displayRead = document.createElement('div');
    const readButton = document.createElement('button');
    readButton.className = "read-button";
    displayRead.className = "cell";
    readButton.textContent = read;
    row.appendChild(displayRead);
    displayRead.appendChild(readButton);

    //Adds functionality to read/not read buttons
    const readButtons = document.querySelectorAll('.read-button');
    readButtons.forEach(button => {
        if (button.dataset.check != "listened") {
            button.dataset.check = "listened";
            button.addEventListener('click', function () {
                if (this.textContent == "read") {
                    this.textContent = "not read";
                }
                else {
                    this.textContent = "read";
                }
            })
        }
    });

    const displayDelete = document.createElement('div');
    displayDelete.className = "cell";
    row.appendChild(displayDelete);
    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-button";
    deleteButton.textContent = "DELETE";
    deleteButton.dataset.index = index;
    displayDelete.appendChild(deleteButton);

    if (rows != null) {
        noBooks.textContent = "";
    }
}

const submit = document.querySelector(".submit");
submit.addEventListener('click', function () {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value.toLowerCase();

    const titleError = document.getElementById('title-error');
    const authorError = document.getElementById('author-error');
    const pagesError = document.getElementById('pages-error');
    const readError = document.getElementById('read-error');

    let re = /^[0-9]+$/g;

    //Checks if user entered the correct information
    if (title == "" || author == "" || pages == "" || !re.test(pages) || (read != "not read" && read != "read")) {

        title == "" ? titleError.textContent = "Please enter the book's title" : titleError.textContent = "";
        author == "" ? authorError.textContent = "Please enter the book's author" : authorError.textContent = "";
        pages == "" || !re.test(pages) ? pagesError.textContent = "Please enter a numeric value" : pagesError.textContent = "";
        (read != "read" && read != "not read") ? readError.textContent = "Please type 'read' or 'not read'" : readError.textContent = "";
    }

    //If user entered correct information, else statement executes
    //Adds the book to myLibrary object and clears input boxes
    else {
        titleError.textContent = "";
        authorError.textContent = "";
        pagesError.textContent = "";
        readError.textContent = "";

        const book = new Book(title, author, pages, read);
        myLibrary.push(book);
        const index = myLibrary.indexOf(book);
        displayBooks(index);
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read").value = "";

        //Adds functionality to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => button.addEventListener('click', function () {
            const index = this.dataset.index;
            const row = document.querySelector(`.row[data-index="${index}"]`);
            if (row != null) {
                row.remove();
            }
            
            //Displays "no books" message if there are no books in the library
            const noBooks = document.querySelector('.no-books');
            const rows = document.querySelectorAll('.row');
            if (rows.length == 0) {
                noBooks.textContent = "There are currently no books in the library."
            }
        }));
    }
});