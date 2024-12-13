// import { cardTemplate} from './index.js';
import { getInitialCards, createTodo, getUserData, putCardLike, deleteCardLike, sendUserData, deleteCardApi} from './api.js';

// @todo: Функция создания карточки
export function createCard(cards, zoomPopupImage, likeCard, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cards.link;
  cardElement.querySelector(".card__title").alt = cards.name;
  cardElement.querySelector(".card__title").textContent = cards.name;
  // удаление карточки владельцем
  const deleteButton = cardElement.querySelector(".card__delete-button");
    if (userId !== cards.owner._id) {
      deleteButton.remove();
      } else {
      deleteButton.addEventListener("click", () => {
        const cardId = cards._id;
        deleteCard(cardElement , cardId);});
      };
  
  //работа с картинкой - попапом
  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", (event) => {
    zoomPopupImage(cards.name, cards.link);
    });

  //работа с лайком и счетчиком лайков
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = cards.likes.length;
  // Проверка наличия лайка пользователя в массиве likes, 
  //добавление класса активного лака
  const isLiked = cards.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  };
  // Слушатель лайка
  likeButton.addEventListener("click", () => {
    likeCard(likeCounter, likeButton, cards);
  });
  // Возвращаем созданный темплейт
  return cardElement;
};

// @todo: Функция подсчета, постановки, удаления лайков 
export function likeCard(likeCounter, likeButton, cards) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    // удаление лайка пользователя
    deleteCardLike(cards._id)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при удалении лайка:", err);
    });
  } else {
    // лайк пользователя
    putCardLike(cards._id)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при добавлении лайка:", err);
    });
  }
};

// @todo: Функция удаления карточки
function deleteCard(cardElement, id) {
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
