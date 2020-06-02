//импорт данных
import Api from './js/API.js';
import Card from './js/card.js';
import CardList from './js/cardList.js';
import FormValidator from './js/formValidator.js';
import Popup from './js/popup.js';
import ShowPicture from './js/showPicture.js';
import UserInfo from './js/userInfo.js';
import './pages/index.css';
//объявление переменных

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/' : 'https://praktikum.tk/';

const api = new Api({
  url: `${serverUrl}cohort10/`,
  token: '07b7bffe-e07f-4b18-83ed-c2ba51646289',
  header: 'application/json'
});
//23a40bc402fd00844fffe55d
//api.getLikes();

const placesList = document.querySelector('.places-list');
const addButtonOpen = document.querySelector('#add-button');
const editButtonOpen = document.querySelector('#edit-button');
const addPopupClose = document.querySelector('#close-new');
const editPopupClose = document.querySelector('#close-edit');
const imageContainer = document.querySelector('#popup__image');
const imagePopupClose = document.querySelector('#close-image');
/*REVIEW. Можно лучше. Полагается во всём проекте обращаться к DOM-элементам одинаковым способом - если с помощью querySelector, то
во всём проекте всегда с помощью querySelector. */
const form = document.forms.new;
const formEdit = document.forms.formEdit;

//одна карточка
const card = (data) => {
    const card = new Card(api);
  return card.create(data);
}

const formEditObject = {
    name: formEdit.elements.editName,
    info: formEdit.elements.editInfo,
};

//массив карточек
const cardlist = new CardList(placesList, card, api);

//попапы для форм
const popupElemNew = new Popup(document.querySelector('#popup-add-card'));
const popupElemEdit = new Popup(document.querySelector('#popup-edit-info'));

//увеличение картинки
const popupImage = new Popup(document.querySelector('#popup__image'));
const zoomPicture = new ShowPicture(imageContainer);

//валидация
const formValidatorEdit = new FormValidator(formEdit);
const formValidatorNew = new FormValidator(form);

const userInfo = new UserInfo(formEditObject, api, popupElemEdit);
userInfo.renderData();

//отрисовка карточек
cardlist.getCards();

//слушатели на открытие форм

//открытие формы карточки
addButtonOpen.addEventListener('click', () => {

  const errors = form.querySelectorAll('.popup__input-required');

  errors.forEach((elem) => {
    elem.textContent = '';
  });

  form.elements.name.value = '';
  form.elements.link.value = '';

  const popupSubmit = document.querySelector('#submit-new');

  popupSubmit.classList.add('popup__button_disabled');
  popupSubmit.setAttribute('disabled', true);

  popupElemNew.open(event);
});

//открытие формы профиля
editButtonOpen.addEventListener('click', (event) => {
  const errors = formEdit.querySelectorAll('.popup__input-required');

  errors.forEach((elem) => {
    elem.textContent = '';
  });

  const popupSubmit = document.querySelector('#submit-formEdit');
  popupSubmit.classList.remove('popup__button_disabled');
  popupSubmit.removeAttribute('disabled', true);

  popupElemEdit.open(event);
});

//слушатели на сабмиты форм

//сабмит карточки
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  const formObject = {
    name: form.elements.name,
    link: form.elements.link
  };

  cardlist.addNewCard(formObject);

  form.reset();
  popupElemNew.close(event);
});

//сабмит профиля
formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  userInfo.setUserInfo();
});

//слушатели валидации форм
formValidatorEdit.setEventListeners();
formValidatorNew.setEventListeners();

//слушатели на закрытие попапов
addPopupClose.addEventListener('click', popupElemNew.close.bind(popupElemNew));
editPopupClose.addEventListener('click', popupElemEdit.close.bind(popupElemEdit));

//слушатели на зум, открытие и закрытие картинки

placesList.addEventListener('click', zoomPicture.addLink.bind(event));
placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__image')) {
    popupImage.open(popupImage);
  }
});

imagePopupClose.addEventListener('click', popupImage.close.bind(popupImage));


