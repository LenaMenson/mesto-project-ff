import '../pages/index.css';
import { openPopup, closePopup } from './modal.js';
import { createCard, likeCard} from './card.js';
import { initialCards } from './cards.js';
import { getInitialCards, addNewCard, getUserData, sendUserData, sendAvatarData } from './api.js';
import { enableValidation } from './validation.js';
//глобальные переменные
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const newPlaceCard = popupNewCard.querySelector('.popup__form');
const newPlaceNameInput = newPlaceCard.querySelector('.popup__input_type_card-name');
const newPlaceUrlInput = newPlaceCard.querySelector('.popup__input_type_url');

const userNameElement = document.querySelector('.profile__title');
const userJobElement = document.querySelector('.profile__description');

const submitButton = document.querySelector('.popup__button');

const formElementEditProfile = document.querySelector('form[name="edit-profile"]');
nameInput.value= document.querySelector(".profile__title").textContent;
jobInput.value = document.querySelector(".profile__description").textContent;

const avatarEditProfile = document.querySelector('form[name="avatar"]');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarEditButton = document.querySelector('.avatar__add-button');
const avatarInput = document.querySelector('.popup__input_type_avatar');
const avatarLink = document.querySelector(".profile__image");

// @todo: DOM узлы
export const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
export function renderCards(cards, zoomPopupImage, likeCard, userId) {
  placesList.innerHTML = "";
  cards.forEach(card => {
    const cardElement = createCard(card, zoomPopupImage, likeCard, userId);
    placesList.appendChild(cardElement);
  });
}

//слушатель для закрытия попапов крестиком
const clickExit = (event) => {
    closePopup(event.target.closest(".popup"));
  };
const closePopupButton = Array.from(document.querySelectorAll('.popup__close'));
closePopupButton.forEach ((closeElement) => {
    closeElement.addEventListener('click', clickExit)
  });

// @todo: попап - функция просмотра изображения карточки
export function zoomPopupImage (name, link) {
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
popupImage.alt = name;
popupImage.src = link;
popupTypeImage.querySelector('.popup__caption').textContent = name;
openPopup(popupTypeImage)
};
    
//@todo: добавление новой карточки
//слушатель для открытия попапа добавления карточки
profileAddButton.addEventListener('click', function () {
    openPopup(popupNewCard);
});

//функция добавления новой карточки 
function newCardForm (evt) {
  evt.preventDefault();
  const cardData = {
    name: newPlaceNameInput.value, 
    link: newPlaceUrlInput.value
  }
  addNewCard(cardData)
  .then((card) => {
    const newCardElement = createCard(card, zoomPopupImage, likeCard, userId);
    //добавление новой карточки в контейнер для карточек
    placesList.prepend(newCardElement);
    closePopup(popupNewCard);
    submitButton.textContent = 'Сохранение...';
  });    
};

popupNewCard.addEventListener('submit', newCardForm);

//@todo: редактирование профиля
//слушатель открытия попапа редактирования профиля  
profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
});

//отправка формы редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const userNameElement = document.querySelector(".profile__title");
  const userJobElement = document.querySelector(".profile__description");
  userNameElement.textContent = nameInput.value;
  userJobElement.textContent = jobInput.value;
  sendUserData(nameInput.value, jobInput.value).then((data) => {
    closePopup(popupTypeEdit);
    submitButton.textContent = 'Сохранение...';
  });  
  formElementEditProfile.reset();
};

popupTypeEdit.addEventListener('submit', handleFormProfileSubmit);

//заполнение аватара с сервера
//слушатель для открытия попапа редактирования аватара
avatarEditButton.addEventListener('click', function () {
  openPopup(popupTypeAvatar);
}); 

//функция обновления аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  avatarLink.style.backgroundImage = `url(${avatarInput.value})`;
  //отправка нового аватара на сервер
  sendAvatarData(avatarInput.value)
  .then(() => {
    submitButton.textContent = 'Сохранение...';
    closePopup(popupTypeAvatar);
   });  
  avatarEditProfile.reset();
};
popupTypeAvatar.addEventListener('submit', handleFormAvatarSubmit);

//Функция для установки информации о пользователе на страницу
let userId = "";
function setUserInfo(user) {
  userNameElement.textContent = user.name;
  userJobElement.textContent = user.about;
  avatarLink.setAttribute(
    "style",
    `background-image: url('${user.avatar}')`
  );
  userId = user._id;
};

//Загрузка карточек с сервера
const promises = [getUserData(), getInitialCards()];

Promise.all(promises)
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, zoomPopupImage, likeCard, user._id);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении карточек:", err);
  });

//Валидация
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: ".popup__text_invalid",
  errorClass: "form__input-error_active",
  errorInput: "form__input_type_error"
};
 
enableValidation(validationConfig);
