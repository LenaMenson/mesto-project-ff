import { cardTemplate } from './index.js';

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, zoomPopupImage, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", (event) => {
  zoomPopupImage(cardData.name, cardData.link, cardData.name);
});
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);
  return cardElement;
};

// @todo: Функция удаления карточки
export function deleteCard(event) {
  event.target.closest(".card").remove();
};

//@todo:Лайк карточки
export function likeCard (event) {
  event.target.classList.toggle('card__like-button_is-active'); 
};