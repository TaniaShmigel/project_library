let data = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];

if (!JSON.parse(localStorage.getItem("books"))) {
  localStorage.setItem("books", JSON.stringify(data));
}

const root = document.querySelector("#root");

const left = document.createElement("div");
left.classList.add("left");

const right = document.createElement("div");
right.classList.add("right");

root.append(left, right);
// console.log(root)

const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "LIBRARY";

const list = document.createElement("ul");
list.classList.add("list");

const button = document.createElement("button");
button.classList.add("button");
button.textContent = "ADD";

left.append(title, list, button);
// console.log(left)

button.addEventListener("click", addBook);

function renderBooksList() {
  const books = JSON.parse(localStorage.getItem("books"));
  console.log(books);
  const markup = books
    .map(
      ({ id, title }) =>
        `<li id = "${id}" class="item">
  <p class="books-title">${title}</p>
  <button class = "btn-delete">Delete</button>
  <button class = "btn-edit">Edit</button>
  </li>`
    )
    .join("");
  list.innerHTML = "";
  list.insertAdjacentHTML("beforeend", markup);

  const booksTitle = document.querySelectorAll(".books-title");
  booksTitle.forEach((title) => title.addEventListener("click", renderPreview));
  const btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((btn) => btn.addEventListener("click", deleteBook));
  const btnEdit = document.querySelectorAll(".btn-edit");
  btnEdit.forEach((btn) => btn.addEventListener("click", editBook));
}
renderBooksList();

function renderPreview(e) {
  const books = JSON.parse(localStorage.getItem("books"));
  const book = books.find(({ title }) => title === e.target.textContent);
  console.log(book);
  const markup = createPreviewMarkup(book);
  right.innerHTML = "";
  right.insertAdjacentHTML("beforeend", markup);
}

function createPreviewMarkup({ id, title, author, img, plot }) {
  const markupPreview = `<div data-id = "${id}" class = "preview-box">
  <h2 class ="preview-title">${title}</h2>
  <p class="preview-author">${author}</p>
  <img src = "${img}" alt ="${title}">
  <p class="preview-text">${plot}</p>
  </div>`;
  return markupPreview;
}

function deleteBook(e) {
  const books = JSON.parse(localStorage.getItem("books"));
  const id = e.target.parentNode.id;
  const newBooks = books.filter((book) => book.id !== id);

  renderBooksList();
  localStorage.setItem("books", JSON.stringify(newBooks));
  setTimeout(() => alert("Book was sucessfully deleted"), 300);
}

function addBook() {
  const newBook = {
    id: Date.now(),
    title: "",
    author: "",
    img: "",
    plot: "",
  };

  const markup = createForm(newBook);

  right.insertAdjacentHTML("beforeend", markup);
  formValue(newBook);

  const formEl = document.querySelector("form");

  formEl.addEventListener("submit", onFormSubmit);

  function onFormSubmit(e) {
    e.preventDefault();
    const valuesNewBook = Object.values(newBook);
    if (valuesNewBook.some((value) => value === "")) {
      alert("Fill all field");
      return;
    }
    const books = JSON.parse(localStorage.getItem("books"));
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooksList();
    const previewMarkup = createPreviewMarkup(newBook);
    right.innerHTML = "";
    right.insertAdjacentHTML("beforeend", previewMarkup);
  }
  setTimeout(() => alert("Book was sucessfully added"), 300);
}

function createForm(book) {
  const { title, author, img, plot } = book;
  const markup = `<form action="">
<label for="">Title<input type="text" name="title" value="${title}"></label>
<label for="">Author<input type="text" name="author" value="${author}"></label>
<label for="">Img<input type="text" name="img" value="${img}"></label>
<label for="">Plot<input type="text" name="plot" value="${plot}"></label>
<button>Save</button>
</form>`;
  return markup;
}

function formValue(book) {
  const refInput = document.querySelectorAll("input");
  refInput.forEach((input) => input.addEventListener("change", onInputChange));
  function onInputChange(evt) {
    book[evt.target.name] = evt.target.value;
  }

  console.log(refInput);
}

function editBook(e) {
  const id = e.target.parentNode.id;
  const books = JSON.parse(localStorage.getItem("books"));
  const targetBook = books.find((book) => book.id === id);
  console.log(targetBook);
  const formMarkup = createForm(targetBook);
  right.insertAdjacentHTML("beforeend", formMarkup);
  const formEl = document.querySelector("form");

  formEl.addEventListener("submit", onFormSubmit);
  function onFormSubmit(e) {
    e.preventDefault();
    const indexBook = books.findIndex((book) => book.id === id);
    books.splice(indexBook, 1, targetBook);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooksList();
    const previewMarkup = createPreviewMarkup(targetBook);
    right.innerHTML = "";
    right.insertAdjacentHTML("beforeend", previewMarkup);
  }
  setTimeout(() => alert("Book was sucessfully edited"), 300);
}
