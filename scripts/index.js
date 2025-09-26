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
const editProfileButton = document.getElementById("profile__edit");
const profilePopup = document.getElementById("profilePopup");
const editpopupClose = document.getElementById("editPopup__close");
const popupProfileContent = document.getElementById("popupProfileContent");

editProfileButton.addEventListener("click", () => openPopup(profilePopup));
editpopupClose.addEventListener("click", () => closePopup(profilePopup));

//button add card
const cardAddButton = document.getElementById("cardAdd");
const popupCardContent = document.getElementById("addCardPopup");
const popupCardClose = document.getElementById("popupCardClose");

cardAddButton.addEventListener("click", () => openPopup(popupCardContent));
popupCardClose.addEventListener("click", () => closePopup(popupCardContent));

function openPopup(target) {
  target.classList.add("popup__opened");
}

function closePopup(target) {
  target.classList.remove("popup__opened");
}

// botao de salvar profile
const profileFormElement = document.querySelector("#profilePopup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = document.querySelector("#inputName").value; //pega o novo nome no popup
  const campoNome = document.querySelector("#profile__name"); // pega o nome nome atual que tá no profile
  campoNome.textContent = newName; //seta o novo nome no profile

  const newDescription = document.querySelector("#inputDescription").value;
  const campoDescription = document.querySelector("#profile__description");
  campoDescription.textContent = newDescription;
  closePopup(profilePopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//botao de salvar novo card
const addCardFormElement = document.querySelector("#addCardPopupForm");

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
  addCardFormElement.reset();
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
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__name").textContent = card.name;

  //cria listener para o like
  const likeButton = cardElement.querySelector(".card__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like_active");
  });

  //cria listernet para trash (.remove)
  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");
  const closeImageButton = imagePopup.querySelector(".popup__close");
  const cardImage = cardElement.querySelector(".card__image");

  //criar listener para imagem abrir popup
  cardImage.addEventListener("click", () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;

    openPopup(imagePopup);
  });

  closeImageButton.addEventListener("click", () => {
    closePopup(imagePopup);
  });

  //renderiza o elemento na área destinada
  cardsSection.prepend(cardElement);
}

function openImagePopup(card) {
  const popupImageContent = document.querySelector("#popupImageContent");
  const popupImage = popupImageContent.querySelector("popup__image");
  const popupCaption = document.querySelector("popupCaption");
  popupImage.src = card.link;
  popupCaption.textContent = card.name;
  popupImageContent.classList.add("popup__opened");
}
