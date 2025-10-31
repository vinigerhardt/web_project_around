import {
  showInputError,
  hideInputError,
  enableValidation,
  setEventListener,
  isValid,
  toggleBtnState,
} from "./validate.js";

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

  document.addEventListener("keydown", closeByEsc);

  target.addEventListener("click", closeByOverlay);
}

function closePopup(target) {
  target.classList.remove("popup__opened");
  document.removeEventListener("keydown", closeByEsc);
  target.removeEventListener("click", closeByOverlay);
  //resetValidation;
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");

    closePopup(openedPopup);
  }
}

function closeByOverlay(evt) {
  // Se clicou exatamente no popup (sobreposição), fecha
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Elemento form de editar profile
const profileFormElement = document.querySelector("#profilePopup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = document.querySelector("#input-name").value; //pega o novo nome no popup
  const campoNome = document.querySelector("#profile__name"); // pega o campo nome que tá no profile
  campoNome.textContent = newName; //seta o novo nome no profile

  const newDescription = document.querySelector("#input-description").value;
  const campoDescription = document.querySelector("#profile__description");
  campoDescription.textContent = newDescription;
  closePopup(profilePopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//botao de salvar novo card
const addCardFormElement = document.querySelector("#addCardPopupForm");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardTitle = document.querySelector("#input-newCardtittle").value;
  const newCardImage = document.querySelector("#input-newCardImage").value;
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
} //fim de addCard

// Form validation

const inputNameElement = document.querySelector("#input-name");
const inputDescriptionElement = document.querySelector("#input-description");
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Listener para nome
inputNameElement.addEventListener("input", () => {
  if (inputNameElement.validity.valid) {
    hideInputError(profileFormElement, inputNameElement, config);
  } else {
    showInputError(
      profileFormElement,
      inputNameElement,
      inputNameElement.validationMessage,
      config
    );
  }
});

//Listener para description
inputDescriptionElement.addEventListener("input", () => {
  if (inputDescriptionElement.validity.valid) {
    hideInputError(profileFormElement, inputDescriptionElement, config);
  } else {
    showInputError(
      profileFormElement,
      inputDescriptionElement,
      inputDescriptionElement.validationMessage,
      config
    );
  }
});

enableValidation(config);
