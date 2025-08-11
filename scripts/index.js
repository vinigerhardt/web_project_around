const editButton = document.getElementById("profile__edit");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup__close");

editButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);

function openPopup() {
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
}
