export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  popupElement.addEventListener('click', closePopupOverlay);
};



// функция закрытия попапов крестиком
export function closePopup (popupElement) {
  popupElement.classList.remove ('popup_is-opened');
popupElement.removeEventListener('click', closePopupOverlay);
};

const clickExit = (event) => {
  closePopup(event.target.closest(".popup"));
};

const closePopupButton = Array.from(document.querySelectorAll('.popup__close'));
closePopupButton.forEach ((closeElement) => {
  closeElement.addEventListener('click', clickExit)
});

//функция для закрытия попапа при нажатии на оверлей 
function closePopupOverlay (evt) {
  if (evt.target === evt.currentTarget) {
      const openedPopup = document.querySelector ('.popup_is-opened');
      if (openedPopup) {
          closePopup(openedPopup)
      };
  };
};

//функция для закрытия попапа при нажатии на Esc 
const closePopupEsc = (event) => {
  if (event.key === 'Escape') {
      const openedPopup = document.querySelector ('.popup_is-opened');
      if (openedPopup) {
          closePopup(openedPopup)
      };
  };
};
document.addEventListener('keydown', closePopupEsc);