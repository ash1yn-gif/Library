const library = [];

const Book = function(name, year, author) {
    this.name = name;
    this.uuid = crypto.randomUUID();
    this.year = year;
    this.author = author;

    addBook(this);
}

function addBook(book) {
    library.push(book)
    console.log(library)
}

document.addEventListener("submit", (e) => {
    e.preventDefault()
    const form = e.target
    new Book(form.elements["book-name"].value, form.elements["book-year"].value, form.elements["book-author"].value)
    displayBooks()
})

document.addEventListener("click", statusChange)


document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete")) {
        return;
    }
    const delButton = document.querySelector(".delete")
    const uuid = delButton.value;
    const index = library.findIndex(book => book.uuid === uuid);
    library.splice(index, 1)
    displayBooks()
})

function displayBooks() {
    const container = document.querySelector(".container")
    if (container.childElementCount > 0) {
        container.innerHTML = "";
    }
    for (const book of library) {
        
        const div = document.createElement("div");
        container.appendChild(div);
        const delButton = document.createElement("button")
        const statusButton = document.createElement("button")
        for (let i = 0; i < 3; i++) {
            const p = document.createElement("p")
            
            switch(i) {
                case(0):
                    p.textContent = book.name
                    break;
                case(1):
                    p.textContent = book.year
                    break;
                case(2):
                    p.textContent = book.author
                    break;
            }
            
            div.appendChild(p)
            
        }
        delButton.classList.add("delete")
        delButton.textContent = "delete";
        delButton.value = book.uuid;
        const p = document.createElement("p")
        p.classList.add("status-p")
        p.textContent = "not read"
        statusButton.classList.add("status")
        statusButton.textContent = "Read"
        div.appendChild(p)
        div.appendChild(statusButton)
        div.appendChild(delButton)   
    }
}

function statusChange(event) {
    if (!event.target.classList.contains("status")) {
        return;
    }

    const p = document.querySelector(".status-p")
    if (p.textContent === "read") {
        p.textContent = "not read"
    }
    else {
        p.textContent = "read"
    }
    return p;
}