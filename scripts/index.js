// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

initialCards.forEach(function (element) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__title").textContent = element.name;
  document.querySelectorAll(".card__delete-button").forEach(function (element) {
    element.addEventListener("click", function () {
      this.closest(".places__item").remove();
    });
  });

  placesList.append(cardElement);
});








