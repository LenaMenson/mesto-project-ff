import '../pages/index.css';
import { openPopup, closePopup } from './modal.js';
import { createCard, likeCard, deleteCard} from './card.js';
import { initialCards } from './cards.js';
import { getInitialCards, addNewCard, getUserData, sendUserData, sendAvatarData } from './api.js';
import { enableValidation, clearValidation } from './validation.js';
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
const submitAvatarButton = document.querySelector('.form__submit-avatar');
const submitProfileButton = document.querySelector('.form__submit-edit-profile');
const submitNewPlaceButton = document.querySelector('.form__submit-new-place');

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
export function renderCards(cardData, zoomPopupImage, likeCard, deleteCard, userId) {
  placesList.innerHTML = "";
  cardData.forEach(card => {
    const cardElement = createCard(card, zoomPopupImage, likeCard, deleteCard, userId);
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
  clearValidation(popupNewCard, validationConfig);  
  openPopup(popupNewCard);
});

//функция добавления новой карточки 
function newCardForm (evt) {
  evt.preventDefault();
  const newCardData = {
    name: newPlaceNameInput.value, 
    link: newPlaceUrlInput.value
  }
  addNewCard(newCardData)
    .then((card) => {
      const newCardElement = createCard(card, zoomPopupImage, likeCard, deleteCard, userId);
      //добавление новой карточки в контейнер для карточек
      placesList.prepend(newCardElement);
      closePopup(popupNewCard);
    })
    .catch((err) => {
      error.textContent = err;
    })
    .finally(() => {
      submitNewPlaceButton.textContent = 'Сохранение...';
    });  
formElementEditProfile.reset();
};

popupNewCard.addEventListener('submit', newCardForm);

//@todo: редактирование профиля
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

//слушатель открытия попапа редактирования профиля  
profileEditButton.addEventListener('click', function () {
  clearValidation(formElementEditProfile, validationConfig); 
  openPopup(popupTypeEdit);
});

//отправка формы редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  sendUserData(nameInput.value, jobInput.value)
    .then(() => { 
      getUserData()
        .then((user) => {
          setUserInfo(user);
        }); 
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      error.textContent = err;
    })
    .finally(() => {
      submitProfileButton.textContent = 'Сохранение...';
    });
  formElementEditProfile.reset();
};

popupTypeEdit.addEventListener('submit', handleFormProfileSubmit);

//заполнение аватара с сервера
//слушатель для открытия попапа редактирования аватара
avatarEditButton.addEventListener('click', function () {
  clearValidation(avatarEditProfile, validationConfig);
  openPopup(popupTypeAvatar);
}); 

//функция обновления аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  //отправка нового аватара на сервер
  sendAvatarData(avatarInput.value)
    .then(() => {
      getUserData()
        .then((user) => {
          setUserInfo(user);
        });
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      error.textContent = err;
    })
    .finally(() => {
      submitAvatarButton.textContent = 'Сохранение...';
    });
  avatarEditProfile.reset();
};
popupTypeAvatar.addEventListener('submit', handleFormAvatarSubmit);

//Загрузка карточек с сервера
const promises = [getUserData(), getInitialCards()];

Promise.all(promises)
  .then(([user, cardData]) => {
    setUserInfo(user);
    renderCards(cardData, zoomPopupImage, likeCard, deleteCard, user._id);
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
