const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

window.addEventListener("load", () => {
  initialCards.forEach((card) => {
    addCard(card);
  });
});

//edit profile
const editButton = document.getElementById("profile__edit");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup__close");

popupClose.addEventListener("click", closePopup);
editButton.addEventListener("click", openPopup);

function openPopup() {
  popup.classList.add("popup__opened");
}

function closePopup() {
  popup.classList.remove("popup__opened");
}

// botao de salvar
let formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = document.querySelector("#inputName").value; //pega o novo nome no popup
  const campoNome = document.querySelector("#profile__name"); // pega o nome nome atual que tá no profile
  campoNome.textContent = newName; //seta o novo nome no profile

  const newDescription = document.querySelector("#inputDescription").value;
  const campoDescription = document.querySelector("#profile__description");
  campoDescription.textContent = newDescription;
  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//add card
function addCard(card) {
  // pega área onde vai ser renderizado
  const cardsSection = document.querySelector(".content__cards");

  // pega o template
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".cards__card");

  //clona o template em um elemento
  const cardElement = cardTemplate.cloneNode(true);

  //coloca as informações nesse elemento
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__name").textContent = card.name;

  //cria listener para o like
  const likeButton = cardElement.querySelector(".card__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like_active");
  });

  //criar listernet para trash (.remove)
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //criar listener para imagem abrir popup

  //renderiza o elemento na área destinada
  cardsSection.append(cardElement);
}
