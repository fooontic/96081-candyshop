'use strict';

var PRODUCT_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var PRODUCT_IMAGES = ['gum-cedar.jpg', 'gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

var NUTRITION_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var MIN_NUTRITION_CONTENTS_QUANTITY = 2;

var QUANTITY_OF_PRODUCTS = 5; // Количество генерируемых тестовых товаров
// var QUANTITY_OF_ORDERS = 3; // Количество генерируемых тестовых заказов

var IMG_SOURCE = '/img/cards/';

var LETTERS_CYRILLIC_TO_LATIN = {'Ё': 'Yo', 'Й': 'I', 'Ц': 'Ts', 'У': 'U', 'К': 'K', 'Е': 'E', 'Н': 'N', 'Г': 'G', 'Ш': 'Sh', 'Щ': 'Sch', 'З': 'Z', 'Х': 'H', 'Ъ': '', 'ё': 'yo', 'й': 'i', 'ц': 'ts', 'у': 'u', 'к': 'k', 'е': 'e', 'н': 'n', 'г': 'g', 'ш': 'sh', 'щ': 'sch', 'з': 'z', 'х': 'h', 'ъ': '', 'Ф': 'F', 'Ы': 'I', 'В': 'V', 'А': 'a', 'П': 'P', 'Р': 'R', 'О': 'O', 'Л': 'L', 'Д': 'D', 'Ж': 'Zh', 'Э': 'E', 'ф': 'f', 'ы': 'i', 'в': 'v', 'а': 'a', 'п': 'p', 'р': 'r', 'о': 'o', 'л': 'l', 'д': 'd', 'ж': 'zh', 'э': 'e', 'Я': 'Ya', 'Ч': 'Ch', 'С': 'S', 'М': 'M', 'И': 'I', 'Т': 'T', 'Ь': '', 'Б': 'B', 'Ю': 'Yu', 'я': 'ya', 'ч': 'ch', 'с': 's', 'м': 'm', 'и': 'i', 'т': 't', 'ь': '', 'б': 'b', 'ю': 'yu'};

var CLOSE_TO_END_NUMBER = 5;


var getRandomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var transliterateCyrillicToLatin = function (word) {
  return word.split('').map(function (char) {
    return LETTERS_CYRILLIC_TO_LATIN[char] || char;
  }).join('');
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
  product.id = transliterateCyrillicToLatin(productName);
  product.picture = IMG_SOURCE + PRODUCT_IMAGES[getRandomIntFromInterval(0, PRODUCT_IMAGES.length)];
  product.amount = getRandomIntFromInterval(0, 6);
  product.price = getRandomIntFromInterval(100, 1500);
  product.weight = getRandomIntFromInterval(30, 300);
  product.rating = {
    value: getRandomIntFromInterval(1, 20),
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

// Определение количества звёзд в рейтинге
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

  cardNode.setAttribute('data-id', productData.id);

  if (productData.amount > 1 && productData.amount <= 5) {
    cardNode.classList.remove('card--in-stock');
    cardNode.classList.add('card--little');
  } else if (productData.amount < 1) {
    cardNode.classList.remove('card--in-stock');
    cardNode.classList.add('card--soon');
  }

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
  var amount = cardNode.querySelector('.card-order__count');

  cardNode.setAttribute('data-id', productData.id);

  title.textContent = productData.name;
  price.textContent = productData.price;
  amount.value = productData.orderAmount;

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
var cart = document.querySelector('.goods__cards'); // Список заказов

var totalOrderSum = 0;
var totalOrderAmount = 0;

var productCardTemplate = document
  .querySelector('#card')
  .content
  .querySelector('article.card'); // Шаблон карточки товаров
var orderTemplate = document
  .querySelector('#card-order')
  .content
  .querySelector('article.card-order'); // Шаблон заказанного товара

var productList = makeProductDataList(QUANTITY_OF_PRODUCTS); // Формируем список товаров
var orderList = []; // Формируем список заказанных товаров

var findProductById = function (targetId, dataArray) {
  var target = {};
  for (var i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id === targetId) {
      target = dataArray[i];
    }
  }
  return target;
};

// Список сформированных карточек с товарами
var fragmentOfProductCards = createElementsBlockFromTemplate(
    productCardTemplate,
    makeProductCardNode,
    productList
);

/*
// Список сформированных карточек с заказанными товарами
var fragmentOfOrders = createElementsBlockFromTemplate(
    orderTemplate,
    makeOrderNode,
    orderList
);
*/

catalog.classList.remove('catalog__cards--load');
catalog.querySelector('.catalog__load')
  .classList
  .add('visually-hidden'); // Скрываем сообщение о загрузке товаров
catalog.appendChild(fragmentOfProductCards); // Добавляем на страницу готовый список товаров

/*
cart.classList.remove('goods__cards--empty'); // Удаляем класс пустого заказа
cart.querySelector('.goods__card-empty')
  .classList
  .add('visually-hidden'); // Скрываем сообщение о пустом заказе
cart.appendChild(fragmentOfOrders); // Добавляем на страницу готовый список заказов
*/

// Добавление в избранное //////////////////////////////////////////////

var favButton = document.querySelectorAll('.card__btn-favorite');
var favButtonHandler = function (evt) {
  var clickedElement = evt.target;
  clickedElement.classList.toggle('card__btn-favorite--selected');
};

var listenToFavButtons = function () {
  for (var i = 0; i < favButton.length; i++) {
    favButton[i].addEventListener('click', favButtonHandler);
  }
};
listenToFavButtons();


// Корзина //////////////////////////////////////////////
var orderNodes = document.querySelectorAll('.card-order');
var formOrderNodes = function functionName() {
  orderNodes = document.querySelectorAll('.card-order');
  return orderNodes;
};

var addToCart = function (targetId, targetNode) {
  var cardNodesInCart = cart.querySelectorAll('.goods_card'); // заказы в корзине
  var targetProductData = findProductById(targetId, productList); // товар в каталоге
  var isOrdered = false;
  var alreadyInCart;

  for (var i = 0; i < cardNodesInCart.length; i++) {
    if (cardNodesInCart[i].getAttribute('data-id') === targetId) {
      isOrdered = true;
      alreadyInCart = cardNodesInCart[i];
    }
  }

  if (isOrdered) {
    var targetOrderData = findProductById(targetId, orderList);
    var orderAmountNode = alreadyInCart.querySelector('.card-order__count');
    var increaseAmount = function () {
      targetOrderData.orderAmount++;
      targetProductData.amount--;
      orderAmountNode.value = targetOrderData.orderAmount;
    };

    if (targetProductData.amount >= CLOSE_TO_END_NUMBER) {
      increaseAmount();
    } else if (targetProductData.amount >= 1 && targetProductData.amount < CLOSE_TO_END_NUMBER) {
      increaseAmount();

      targetNode.classList.remove('card--in-stock');
      targetNode.classList.add('card--little');
    } else {
      targetNode.classList.remove('card--in-stock');
      targetNode.classList.add('card--soon');
    }
  } else {
    var newOrderData = Object.assign({}, targetProductData);
    targetProductData.amount--;
    newOrderData.orderAmount = 1;
    delete newOrderData.amount;

    orderList.push(newOrderData);
    var newOrderNode = makeOrderNode(orderTemplate, newOrderData);

    if (cardNodesInCart.length < 1) {
      cart.classList.remove('goods__cards--empty'); // Удаляем класс пустого заказа
      cart.querySelector('.goods__card-empty')
        .classList
        .add('visually-hidden'); // Скрываем сообщение о пустом заказе
    }

    cart.appendChild(newOrderNode);
  }
  formOrderNodes();
  listenToAmountButtons();
};

var toCartButton = document.querySelectorAll('.card__btn');
var toCartHandler = function (evt) {
  var clickedElement = evt.target;
  var cardNode = clickedElement.closest('.catalog__card');
  var productId = cardNode.getAttribute('data-id');

  addToCart(productId, cardNode);
};

var listenToCartButtons = function () {
  for (var i = 0; i < toCartButton.length; i++) {
    toCartButton[i].addEventListener('click', toCartHandler);
  }
};
listenToCartButtons();


// Управление заказом

var orderedGoodsHandler = function (evt) {
  var clickedElementNode = evt.target;
  var targetOrderNode = evt.currentTarget;
  var targetOrderData = findProductById(targetOrderNode.getAttribute('data-id'), orderList);
  var targetProductData = findProductById(targetOrderNode.getAttribute('data-id'), productList);
  var amountNode = targetOrderNode.querySelector('.card-order__count');
  var changeAmount = function (change) {
    switch (change) {
      case 'increase':
        targetOrderData.orderAmount++;
        targetProductData.amount--;
        break;
      case 'decrease':
        targetOrderData.orderAmount--;
        targetProductData.amount++;
        break;
      case 'reset':
        console.log(targetProductData);
        targetProductData.amount += targetOrderData.amount;
        console.log(targetProductData);
        break;
    }
    amountNode.value = targetOrderData.orderAmount;
  };

  switch (true) {
    case clickedElementNode.classList.contains('card-order__btn--increase'):
      if (targetProductData.amount >= 5) {
        changeAmount('increase');
      } else if (targetProductData.amount >= 1 && targetProductData.amount < CLOSE_TO_END_NUMBER) {
        changeAmount('increase');
        targetOrderNode.classList.remove('card--in-stock');
        targetOrderNode.classList.add('card--little');
      } else {
        targetOrderNode.classList.remove('card--in-stock');
        targetOrderNode.classList.add('card--soon');
      }
      break;
    case clickedElementNode.classList.contains('card-order__btn--decrease'):
      if (targetProductData.amount === 0) {
        return;
      } else if (targetProductData.amount < CLOSE_TO_END_NUMBER) {
        changeAmount('decrease');
        targetOrderNode.classList.remove('card--little');
        targetOrderNode.classList.add('card--in-stock');
      }
      break;
    case clickedElementNode.classList.contains('card-order__btn--close'):
      changeAmount('reset');
      targetOrderNode.remove();
  }
};

var listenToAmountButtons = function () {
  for (var i = 0; i < orderNodes.length; i++) {
    orderNodes[i].removeEventListener('click', orderedGoodsHandler);
    orderNodes[i].addEventListener('click', orderedGoodsHandler);
  }
};
listenToAmountButtons();
