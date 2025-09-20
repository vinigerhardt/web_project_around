function addCard(card) {
  // pega área onde vai ser renderizado
  const cardsSection = document.querySelector(".content__cards");

  // pega o template
  const cardTemplate = document
    .querySelector("card-template")
    .content.querySelector(".cards__card");

  //clona o template em um elemento
  const cardElement = cardTemplate.cloneNode(true);

  //coloca as informações nesse elemento
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__name").textContent = card.name;

  //cria listener para o like
  const likeButton = cardElement.querySelector(".card__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle(".card__like_active");
  });

  //renderiza o elemento na área destinada
  cardsSection.append(cardElement);
}
