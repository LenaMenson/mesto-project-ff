import { initialCards } from './cards.js';
import '../pages/index.css';
import { createCard } from './card.js';
import { deleteCard } from './card.js';
import { likeCard } from './card.js';
import { openPopup } from './modal.js';
import { closePopup } from './modal.js';

//глобальные переменные

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

export const popupImage = document.querySelector('.popup_type_image');

const newPlaceCard = popupNewCard.querySelector('.popup__form');
const newPlaceNameInput = newPlaceCard.querySelector('.popup__input_type_card-name');
const newPlaceUrlInput = newPlaceCard.querySelector('.popup__input_type_url');

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
export const placesList = document.querySelector(".places__list");
export const cardData = [["name", initialCards.name], ["link", initialCards.link]];


// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, zoomPopupImage, likeCard);
    placesList.append(cardElement);
});

// @todo: попап - функция просмотра изображения карточки
export function zoomPopupImage (name, link) {
document.querySelector(".popup__image").alt = name;
document.querySelector(".popup__image").src = link;
openPopup(popupImage)
};
  
//@todo: добавление новой карточки
//слушатель для открытия попапа добавления карточки
profileAddButton.addEventListener('click', function () {
    openPopup(popupNewCard);
});

//функция добавления новой карточки 
function newPlaceForm (evt) {
evt.preventDefault();
const cardData = {
    name: newPlaceNameInput.value, 
    link: newPlaceUrlInput.value
};
placesList.prepend(createCard(cardData, deleteCard, likeCard, zoomPopupImage));
newPlaceCard.reset();
closePopup(popupNewCard);
};
popupNewCard.addEventListener('submit', newPlaceForm);

//@todo: редактирование профиля
//слушатель для открытия попапа редактирования профиля  
profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
    nameInput.placeholder = document.querySelector(".profile__title").textContent;
    jobInput.placeholder = document.querySelector(".profile__description").textContent;
});

//отправка формы редактирования профиля ()
const formElementEditProfile = document.querySelector('input[name="edit-profile"]');
function handleFormSubmit(evt) {
    evt.preventDefault();
const nameValue = nameInput.value;
const jobValue = jobInput.value;
const userNameElement = document.querySelector(".profile__title");
const userJobElement = document.querySelector(".profile__description");
userNameElement.textContent = nameValue;
userJobElement.textContent = jobValue;
closePopup();
formElementEditProfile.reset();
};
formElementEditProfile.addEventListener('submit', handleFormSubmit);