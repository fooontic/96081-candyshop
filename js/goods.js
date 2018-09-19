'use strict';

var PRODUCT_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var PRODUCT_IMAGES = ['gum-cedar.jpg', 'gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

var NUTRITION_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var imgSource = '/img/cards/';


// Функция рандома
var getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Создание состава тестового товара
var makeNutritionContents = function (contents) {
  var quantityOfIngrediens = getRandomIntFromInterval(2, contents.length);
  var ingrediens = [];
  for (var i = 0; i <= quantityOfIngrediens; i++) {
    ingrediens[i] = contents[i];
  }
  return ingrediens;
};

// var makeNutritionContents = function (contents) {
//   var quantityOfIngrediens = getRandomIntFromInterval(2, contents.length);
//   quantityOfIngrediens = 3;
//   var firstIndex = getRandomIntFromInterval(1, quantityOfIngrediens);
//   var indexes = [firstIndex];
//   console.log('indexes: ' + indexes.length);
//   var ingrediens = [];
//   debugger;
//
//   for (var i = 0; i < indexes.length && i <= quantityOfIngrediens; i++) {
//     var randomIndex = getRandomIntFromInterval(1, quantityOfIngrediens);
//     var randomizeIndexes = function () {
//       if (randomIndex !== indexes[i]) {
//         indexes.push(randomIndex);
//         console.log('need to add');
//         console.log('indexes');
//       } else {
//         console.log('find new number');
//         console.log('indexes');
//         randomizeIndexes();
//       }
//     };
//
//     randomizeIndexes();
//   }
//
//   return indexes;
// };
// makeNutritionContents(NUTRITION_CONTENTS);

var getRandomValues = function (mockArray) {
  var defaultLength = getRandomIntFromInterval(10, mockArray.length);
  var mockArrayCopy = mockArray.slice();
  var randomValues = [];
  // debugger;
  for (var i = 0; i < defaultLength; i++) {
    var randomIndex = getRandomIntFromInterval(0, mockArrayCopy.length - 1);
    var randomValue = mockArrayCopy.splice(randomIndex, 1);
    randomValues.push(randomValue[0]);
  }

  return randomValues;
};

console.log(getRandomValues(NUTRITION_CONTENTS));

// Создание тестового товара
var makeProduct = function (productName) {
  var product = {};
  product.name = productName;
  product.picture = imgSource + PRODUCT_IMAGES[getRandomIntFromInterval(0, PRODUCT_IMAGES.length)];
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
    contents: makeNutritionContents(NUTRITION_CONTENTS)
  };
  return product;
};

var quantityOfProducts = 26; // Количество генерируемых тестовых товаров
var makeProductList = function (quantity) {
  var list = [];
  for (var i = 0; i < quantity; i++) {
    list[i] = makeProduct(PRODUCT_NAMES[i]);
  }
  return list;
};

var clearStars = function (element) {
  element.classList.remove('stars__rating--one', 'stars__rating--two', 'stars__rating--three', 'stars__rating--four', 'stars__rating--five');
  return element;
};

// Определение количесва звёзд в рейтинге
var defineRatingClass = function (element, value) {
  // if (value === 1) {
  //   element.classList.add('stars__rating--one');
  // } else if (value === 2) {
  //   element.classList.add('stars__rating--two');
  // } else if (value === 3) {
  //   element.classList.add('stars__rating--three');
  // } else if (value === 4) {
  //   element.classList.add('stars__rating--four');
  // } else if (value === 5) {
  //   element.classList.add('stars__rating--five');
  // }
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
var makeProductCard = function (card, product) {
  var title = card.querySelector('.card__title');
  // var picture = card.querySelector('.card__img');
  var price = card.querySelector('.card__price');
  // var weight = card.querySelector('.card__weight');
  var rating = card.querySelector('.stars__rating');
  var count = card.querySelector('.star__count');
  var sugar = card.querySelector('.card__characteristic');
  var contents = card.querySelector('.card__composition-list');

  title.textContent = product.name;

  // picture.src = product.picture;
  // picture.alt = product.name;

  // price.textContent = product.price;
  // weight.textContent = product.weight;
  price.innerHTML =
    product.price +
    ' <span class="card__currency">₽</span><span class="card__weight">/ ' +
    product.weight +
    'Г</span>';

  clearStars(rating);
  defineRatingClass(rating, product.rating.value);
  rating.textContent = 'Рейтинг: ' + product.rating.value + ' звёзд';

  count.textContent = '(' + product.rating.number + ')';

  var sugarText = 'Содержит сахар';
  if (!product.nutritionFacts.sugar) {
    sugarText = 'Без сахара';
  }
  sugar.textContent = sugarText;

  contents.textContent = product.nutritionFacts.contents;

  return card;
};

// Создание заказанного товара
var makeOrderItem = function (card, product) {
  var title = card.querySelector('.card-order__title');
  var price = card.querySelector('.card-order__price');

  title.textContent = product.name;
  price.textContent = product.price;

  return card;
};

// Последовательное создание карточек с товарами
var addNewElements = function (source, make, array, dest) {
  for (var i = 0; i < array.length; i++) {
    var template = source.cloneNode(true);
    var newCard = make(template, array[i]);

    dest.appendChild(newCard);
  }
};


var catalog = document.querySelector('.catalog__cards'); // Каталог на странице
var order = document.querySelector('.goods__cards');

var productCardTemplate = document
  .querySelector('#card')
  .content
  .querySelector('article.card'); // Шаблон карточки товаров
var orderTemplate = document
  .querySelector('#card-order')
  .content
  .querySelector('article.card-order'); // Шаблон заказанного товара

var fragmentOfProductCards = document.createDocumentFragment(); // Временный элемент с карточками товаров
var fragmentOfOrder = document.createDocumentFragment(); // Временный элемент с карточками товаров

var productList = makeProductList(quantityOfProducts); // Формируем список товаров
var orderList = makeProductList(3); // Формируем список заказанных товаров

// Последовательно создаём карточки с товарами
addNewElements(
    productCardTemplate,
    makeProductCard,
    productList,
    fragmentOfProductCards
);

// Последовательно создаём заказанные товары
addNewElements(
    orderTemplate,
    makeOrderItem,
    orderList,
    fragmentOfOrder
);

catalog.classList.remove('catalog__cards--load'); // Удаляем класс загрузки товаров
catalog.querySelector('.catalog__load')
  .classList
  .add('visually-hidden'); // Скрываем сообщение о загрузке товаров
catalog.appendChild(fragmentOfProductCards); // Добавляем на страницу готовый список товаров

order.classList.remove('goods__cards--empty'); // Удаляем класс пустого заказа
order.querySelector('.goods__card-empty')
  .classList
  .add('visually-hidden'); // Скрываем сообщение о пустом заказе
order.appendChild(fragmentOfOrder); // Добавляем на страницу готовый список заказов
