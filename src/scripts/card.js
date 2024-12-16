// import { cardTemplate} from './index.js';
import { putCardLike, deleteCardLike, deleteCardApi} from './api.js';

// @todo: Функция создания карточки
export function createCard(cardData, zoomPopupImage, likeCard, deleteCard, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  // удаление карточки владельцем
  const deleteButton = cardElement.querySelector(".card__delete-button");
    if (userId !== cardData.owner._id) {
      deleteButton.remove();
      } else {
      deleteButton.addEventListener("click", () => {
        const cardId = cardData._id;
        deleteCard(cardElement , cardId);});
      };
  
  //работа с картинкой - попапом
  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", (event) => {
    zoomPopupImage(cardData.name, cardData.link);
    });

  //работа с лайком и счетчиком лайков
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = cardData.likes.length;
  // Проверка наличия лайка пользователя в массиве likes, 
  //добавление класса активного лака
  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  };
  // Слушатель лайка
  likeButton.addEventListener("click", () => {
    likeCard(likeCounter, likeButton, cardData);
  });
  // Возвращаем созданный темплейт
  return cardElement;
};

// @todo: Функция подсчета, постановки, удаления лайков 
export function likeCard(likeCounter, likeButton, cardData) {
const likeMethod = likeButton.classList.contains("card__like-button_is-active") ? deleteCardLike : putCardLike;
likeMethod(cardData._id) 
        .then((res) => {
           likeButton.classList.toggle("card__like-button_is-active"); 
           likeCounter.textContent = res.likes.length; 
        })
.catch(err => console.log(err));
};

// @todo: Функция удаления карточки
export function deleteCard(cardElement, id) {
  // запрос на сервер для удаления карточки
  deleteCardApi(id)
    .then(() => {
      // удаление карточки из DOM после успешного удаления
      cardElement.remove();
    })
    .catch((err) => {
      console.error("ошибка при удалении карточки:", err);
    });
};
