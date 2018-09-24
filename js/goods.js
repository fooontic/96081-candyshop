'use strict';

var PRODUCT_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var PRODUCT_IMAGES = ['gum-cedar.jpg', 'gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

var NUTRITION_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var MIN_NUTRITION_CONTENTS_QUANTITY = 2;

var QUANTITY_OF_PRODUCTS = 26; // Количество генерируемых тестовых товаров
var QUANTITY_OF_ORDERS = 3; // Количество генерируемых тестовых заказов

var IMG_SOURCE = '/img/cards/';


// Функция рандома
var getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomValues = function (mockArray) {
  var defaultLength = getRandomIntFromInterval(MIN_NUTRITION_CONTENTS_QUANTITY, mockArray.length);
  var mockArrayCopy = mockArray.slice();
  var randomValues = [];
  for (var i = 0; i < defaultLength; i++) {
    var randomIndex = getRandomIntFromInterval(0, mockArrayCopy.length - 1);
    var randomValue = mockArrayCopy.splice(randomIndex, 1);
    randomValues.push(randomValue[0]);
  }

  return randomValues;
};

// Создание тестового товара
var makeProductData = function (productName) {
  var product = {};
  product.name = productName;
  product.picture = IMG_SOURCE + PRODUCT_IMAGES[getRandomIntFromInterval(0, PRODUCT_IMAGES.length)];
  product.amount = getRandomIntFromInterval(0, 20);
  product.price = getRandomIntFromInterval(100, 1500);
  product.weight = getRandomIntFromInterval(30, 300);
  product.rating = {
    value: getRandomIntFromInterval(1, 5),
    number: getRandomIntFromInterval(10, 900)
  };
  product.nutritionFacts = {
    sugar: !!getRandomIntFromInterval(0, 1),
    energy: getRandomIntFromInterval(70, 500),
    contents: getRandomValues(NUTRITION_CONTENTS)
  };
  return product;
};

var makeProductDataList = function (quantity) {
  var list = [];
  for (var i = 0; i < quantity; i++) {
    list[i] = makeProductData(PRODUCT_NAMES[i]);
  }
  return list;
};

var clearStars = function (element) {
  element.classList.remove('stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five');
  return element;
};

// Определение количесва звёзд в рейтинге
var setRatingClass = function (element, value) {
  switch (value) {
    case 1:
      element.classList.add('stars__rating--one');
      break;
    case 2:
      element.classList.add('stars__rating--two');
      break;
    case 3:
      element.classList.add('stars__rating--three');
      break;
    case 4:
      element.classList.add('stars__rating--four');
      break;
    case 5:
      element.classList.add('stars__rating--five');
      break;
  }
  return element;
};

// Создание карточки товара
var makeProductCardNode = function (cardNode, productData) {
  var title = cardNode.querySelector('.card__title');
  var price = cardNode.querySelector('.card__price');
  var weight = cardNode.querySelector('.card__weight');
  var rating = cardNode.querySelector('.stars__rating');
  var count = cardNode.querySelector('.star__count');
  var sugar = cardNode.querySelector('.card__characteristic');
  var contents = cardNode.querySelector('.card__composition-list');

  title.textContent = productData.name;

  price.childNodes.item(0).textContent = productData.price;
  weight.textContent = '/ ' + productData.weight + ' Г';

  clearStars(rating);
  setRatingClass(rating, productData.rating.value);
  rating.textContent = 'Рейтинг: ' + productData.rating.value + ' звёзд';

  count.textContent = '(' + productData.rating.number + ')';

  var sugarText = productData.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
  sugar.textContent = sugarText;

  contents.textContent = productData.nutritionFacts.contents.join(', ');

  return cardNode;
};

// Создание заказанного товара
var makeOrderNode = function (cardNode, productData) {
  var title = cardNode.querySelector('.card-order__title');
  var price = cardNode.querySelector('.card-order__price');

  title.textContent = productData.name;
  price.textContent = productData.price;

  return cardNode;
};

// Последовательное создание карточек с товарами
var createElementsBlockFromTemplate = function (template, elementFactory, dataArray) {
  var elementsListNode = document.createDocumentFragment();

  for (var i = 0; i < dataArray.length; i++) {
    var templateCopy = template.cloneNode(true);
    var newElementNode = elementFactory(templateCopy, dataArray[i]);

    elementsListNode.appendChild(newElementNode);
  }

  return elementsListNode;
};


var catalog = document.querySelector('.catalog__cards'); // Каталог на странице
var order = document.querySelector('.goods__cards'); // Список заказов

var productCardTemplate = document
  .querySelector('#card')
  .content
  .querySelector('article.card'); // Шаблон карточки товаров
var orderTemplate = document
  .querySelector('#card-order')
  .content
  .querySelector('article.card-order'); // Шаблон заказанного товара

var productList = makeProductDataList(QUANTITY_OF_PRODUCTS); // Формируем список товаров
var orderList = makeProductDataList(QUANTITY_OF_ORDERS); // Формируем список заказанных товаров

// Список сформированных карточек с товарами
var fragmentOfProductCards = createElementsBlockFromTemplate(
    productCardTemplate,
    makeProductCardNode,
    productList
);

// Список сформированных карточек с заказанными товарами
var fragmentOfOrders = createElementsBlockFromTemplate(
    orderTemplate,
    makeOrderNode,
    orderList
);

catalog.classList.remove('catalog__cards--load');
catalog.querySelector('.catalog__load')
  .classList
  .add('visually-hidden'); // Скрываем сообщение о загрузке товаров
catalog.appendChild(fragmentOfProductCards); // Добавляем на страницу готовый список товаров

order.classList.remove('goods__cards--empty'); // Удаляем класс пустого заказа
order.querySelector('.goods__card-empty')
  .classList
  .add('visually-hidden'); // Скрываем сообщение о пустом заказе
order.appendChild(fragmentOfOrders); // Добавляем на страницу готовый список заказов
