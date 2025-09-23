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

//button edit profile
const editButton = document.getElementById("profile__edit");
const profilePopup = document.getElementById("profilePopup");
const popupClose = document.getElementById("editPopup__close");
const popupProfileContent = document.getElementById("popupProfileContent");

//button add card
const cardAddButton = document.getElementById("cardAdd");
const popupCardContent = document.getElementById("popupCardContent");
const popupCardClose = document.getElementById("popupCardClose");

cardAddButton.addEventListener("click", () => openPopup(popupCardContent));
popupCardClose.addEventListener("click", () => closePopup(popupCardContent));

editButton.addEventListener("click", () => openPopup(popupProfileContent));
popupClose.addEventListener("click", () => closePopup(popupProfileContent));

function openPopup(target) {
  target.classList.add("popup__opened");
}

function closePopup(target) {
  target.classList.remove("popup__opened");
}

// botao de salvar profile
let profileFormElement = document.querySelector("#profilePopup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = document.querySelector("#inputName").value; //pega o novo nome no popup
  const campoNome = document.querySelector("#profile__name"); // pega o nome nome atual que tá no profile
  campoNome.textContent = newName; //seta o novo nome no profile

  const newDescription = document.querySelector("#inputDescription").value;
  const campoDescription = document.querySelector("#profile__description");
  campoDescription.textContent = newDescription;
  closePopup(popupProfileContent);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//botao de salvar novo card
let addCardFormElement = document.querySelector("#addCardPopupForm");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardTitle = document.querySelector("#newCardtittle").value;
  const newCardImage = document.querySelector("#newCardImage").value;
  const newCardData = {
    name: newCardTitle,
    link: newCardImage,
  };

  const newCard = addCard(newCardData);
  closePopup(popupCardContent);
  addCardFormElement.request();
}

addCardFormElement.addEventListener("submit", handleCardFormSubmit);

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
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.addEventListener("click", () => {
    openImagePopup(imageElement);
  });

  //renderiza o elemento na área destinada
  cardsSection.prepend(cardElement);
}
