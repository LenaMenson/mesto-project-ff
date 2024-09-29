export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  popupElement.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
};

// функция закрытия попапов крестиком
export function closePopup (popupElement) {
  popupElement.classList.remove ('popup_is-opened');
  popupElement.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
};

//функция для закрытия попапа при нажатии на оверлей 
function closePopupOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target.closest(".popup"))
  };
};

//функция для закрытия попапа при нажатии на Esc 
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector ('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup)
      };
  };
};