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

  const newDescription = document.querySelector("#inputDescription").value; // ok
  const campoDescription = document.querySelector("#profile__description");
  campoDescription.textContent = newDescription;
  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
