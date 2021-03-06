'use strict';


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
//  КООНСТАНТЫ

var PRODUCT_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

var PRODUCT_IMAGES = ['gum-cedar.jpg', 'gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

var NUTRITION_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var MIN_NUTRITION_CONTENTS_QUANTITY = 2;

var QUANTITY_OF_PRODUCTS = 5; // Количество генерируемых тестовых товаров

var IMG_SOURCE = '/img/cards/';

var LETTERS_CYRILLIC_TO_LATIN = {'Ё': 'Yo', 'Й': 'I', 'Ц': 'Ts', 'У': 'U', 'К': 'K', 'Е': 'E', 'Н': 'N', 'Г': 'G', 'Ш': 'Sh', 'Щ': 'Sch', 'З': 'Z', 'Х': 'H', 'Ъ': '', 'ё': 'yo', 'й': 'i', 'ц': 'ts', 'у': 'u', 'к': 'k', 'е': 'e', 'н': 'n', 'г': 'g', 'ш': 'sh', 'щ': 'sch', 'з': 'z', 'х': 'h', 'ъ': '', 'Ф': 'F', 'Ы': 'I', 'В': 'V', 'А': 'a', 'П': 'P', 'Р': 'R', 'О': 'O', 'Л': 'L', 'Д': 'D', 'Ж': 'Zh', 'Э': 'E', 'ф': 'f', 'ы': 'i', 'в': 'v', 'а': 'a', 'п': 'p', 'р': 'r', 'о': 'o', 'л': 'l', 'д': 'd', 'ж': 'zh', 'э': 'e', 'Я': 'Ya', 'Ч': 'Ch', 'С': 'S', 'М': 'M', 'И': 'I', 'Т': 'T', 'Ь': '', 'Б': 'B', 'Ю': 'Yu', 'я': 'ya', 'ч': 'ch', 'с': 's', 'м': 'm', 'и': 'i', 'т': 't', 'ь': '', 'б': 'b', 'ю': 'yu', ' ': '-'};

var CLOSE_TO_END_NUMBER = 5;

var FILTER_DATA = {
  rangeMin: 30,
  rangeMax: 300
};

//  КОНСТАНТЫ
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
//  ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ

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

//  ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
//  ГЕНЕРАЦИЯ ДАННЫХ

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


// Создание списка товаров
var makeProductDataList = function (quantity) {
  var list = [];
  for (var i = 0; i < quantity; i++) {
    list[i] = makeProductData(PRODUCT_NAMES[i]);
  }
  return list;
};

var productList = makeProductDataList(QUANTITY_OF_PRODUCTS); // Формируем список товаров
var orderList = []; // Формируем список заказанных товаров

//  ГЕНЕРАЦИЯ ДАННЫХ
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
// РАБОТА С УЗЛАМИ ТОВАРОВ

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

  if (productData.amount >= 1 && productData.amount <= 5) {
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
var makeOrderNode = function (cardNode, orderData) {
  var title = cardNode.querySelector('.card-order__title');
  var price = cardNode.querySelector('.card-order__price');
  var amount = cardNode.querySelector('.card-order__count');

  cardNode.setAttribute('data-id', orderData.id);

  title.textContent = orderData.name;
  price.textContent = orderData.price;
  amount.value = orderData.orderAmount;

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

// РАБОТА С УЗЛАМИ ТОВАРОВ
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
// НЕОБХОДИМЫЕ УЗЛЫ ДЛЯ ФОРМИРОВАНИЯ ТОВАРОВ

var catalog = document.querySelector('.catalog__cards'); // Каталог на странице
var cart = document.querySelector('.goods__cards'); // Корзина
var cartPreview = document.querySelector('.main-header__basket');
var getOrders = function () {
  var orders = cart.querySelectorAll('.card-order');
  return orders;
};
getOrders(); // Список заказов

var productCardTemplate = document
  .querySelector('#card')
  .content
  .querySelector('article.card'); // Шаблон карточки товаров

var orderTemplate = document
  .querySelector('#card-order')
  .content
  .querySelector('article.card-order'); // Шаблон заказанного товара

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

// НЕОБХОДИМЫЕ УЗЛЫ ДЛЯ ФОРМИРОВАНИЯ ТОВАРОВ
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
//  РЕНДЕР ТОВАРОВ НА СТРАНИЦЕ

if (productList.length >= 1) {
  catalog.classList.remove('catalog__cards--load');
  catalog.querySelector('.catalog__load')
    .classList
    .add('visually-hidden'); // Скрываем сообщение о загрузке товаров
  catalog.appendChild(fragmentOfProductCards); // Добавляем на страницу готовый список товаров
}

if (orderList.length >= 1) {
  cart.classList.remove('goods__cards--empty'); // Удаляем класс пустого заказа
  cart.querySelector('.goods__card-empty')
    .classList
    .add('visually-hidden'); // Скрываем сообщение о пустом заказе
  cart.appendChild(fragmentOfOrders); // Добавляем на страницу готовый список заказов
}

//  РЕНДЕР ТОВАРОВ НА СТРАНИЦЕ
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
// ДОБАВЛЕНИЕ В ИЗБРАННОЕ

var addToFavoriteHandler = function (evt) {
  var clickedElement = evt.target;
  clickedElement.classList.toggle('card__btn-favorite--selected');
};

var favoriteButton = document.querySelectorAll('.card__btn-favorite');

var listenToFavoriteButtons = function () {
  for (var i = 0; i < favoriteButton.length; i++) {
    favoriteButton[i].addEventListener('click', addToFavoriteHandler);
  }
};
listenToFavoriteButtons();

// ДОБАВЛЕНИЕ В ИЗБРАННОЕ
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
//  БЛОКИРОВКА ФОРМЫ ЗАКАЗА

var orderForm = document.querySelector('#order');
var orderFormFields = orderForm.querySelectorAll('fieldset input, .payment__inputs input');

var toggleOrderForm = function () {
  for (var i = 0; i < orderFormFields.length; i++) {
    if (orderList.length < 1) {
      orderFormFields[i].setAttribute('disabled', '');
    } else {
      orderFormFields[i].removeAttribute('disabled');
    }
  }
};
toggleOrderForm();
//  БЛОКИРОВКА ФОРМЫ ЗАКАЗА
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
//  ДОБАВЛЕНИЕ В КОРЗИНУ

var getProductById = function (targetId, dataArray) {
  for (var i = 0; i < dataArray.length; i++) {
    if (dataArray[i].id === targetId) {
      return dataArray[i];
    }
  }
  return {};
};


var checkIsOrdered = function (product) {
  var productId = product.id;
  var isOrdered = false;

  for (var i = 0; i < orderList.length; i++) {
    if (orderList[i].id === productId) {
      isOrdered = true;
      break;
    }
  }
  return isOrdered;
};


var deleteOrder = function (order) {
  var orderIndex = orderList.indexOf(order);
  orderList.splice(orderIndex, 1);
};


var updateOrderList = function () {
  var ordersToDelete = [];
  for (var i = 0; i < orderList.length; i++) {
    if (orderList[i].orderAmount < 1) {
      ordersToDelete.push(orderList[i]);
    }
  }
  for (var j = 0; j < ordersToDelete.length; j++) {
    deleteOrder(ordersToDelete[j]);
  }
};

var changeOrderAmount = function (product, order, change) {
  if (change === 'increase') {
    if (product.amount > 0) {
      order.orderAmount++;
      product.amount--;
    }
  } else if (change === 'decrease') {
    if (order.orderAmount > 0) {
      order.orderAmount--;
      product.amount++;
    }
  } else if (change === 'reset') {
    product.amount += order.orderAmount;
    order.orderAmount = 0;
    deleteOrder(order);
  }
};


var addNewOrder = function (product) {
  var newOrder = Object.assign({}, product);

  newOrder.orderAmount = 0; // Добавляем счётчик заказа
  delete newOrder.amount; // Удаляем счётчик товара
  orderList.push(newOrder);

  changeOrderAmount(product, newOrder, 'increase');
};


var addProductToOrderList = function (product, isOrdered) {
  if (isOrdered) {
    var orderData = getProductById(product.id, orderList);
    changeOrderAmount(product, orderData, 'increase');
  } else {
    addNewOrder(product);
  }
};

var calculateTotalOrder = function () {
  var sum = 0;
  var amount = 0;
  for (var i = 0; i < orderList.length; i++) {
    sum += orderList[i].price * orderList[i].orderAmount;
    amount += orderList[i].orderAmount;
  }
  return {
    sum: sum,
    amount: amount
  };
};


var updateCatalogProductNode = function (productData, productNode) {
  if (productData.amount > CLOSE_TO_END_NUMBER) {
    if (!productNode.classList.contains('card--in-stock')) {
      productNode.classList.remove('card--little', 'card--soon');
      productNode.classList.add('card--in-stock');
    }
  } else if (productData.amount >= 1 && productData.amount <= CLOSE_TO_END_NUMBER) {
    if (!productNode.classList.contains('card--little')) {
      productNode.classList.remove('card--in-stock', 'card--soon');
      productNode.classList.add('card--little');
    }
  } else {
    if (!productNode.classList.contains('card--soon')) {
      productNode.classList.remove('card--in-stock', 'card--little');
      productNode.classList.add('card--soon');
    }
  }
};


var toggleEmptyCartMessage = function () {
  if (orderList.length >= 1) {
    cart.classList.remove('goods__cards--empty'); // Удаляем класс пустого заказа
    cart.querySelector('.goods__card-empty')
      .classList
      .add('visually-hidden'); // Скрываем сообщение о пустом заказе
  } else {
    cart.classList.add('goods__cards--empty'); // Показываем класс пустого заказа
    cart.querySelector('.goods__card-empty')
      .classList
      .remove('visually-hidden'); // Показываем сообщение о пустом заказе
  }
};


var updateOrderItemNode = function (orderId, isOrdered, orderData) {
  var orderNode;

  if (isOrdered && orderData.orderAmount > 0) {
    orderNode = cart.querySelector('.card-order[data-id="' + orderId + '"]');
    var counter = orderNode.querySelector('.card-order__count');
    counter.value = orderData.orderAmount;
  } else if (isOrdered && orderData.orderAmount === 0) {
    orderNode = cart.querySelector('.card-order[data-id="' + orderId + '"]');
    orderNode.remove();
  } else {
    var templateCopy = orderTemplate.cloneNode(true);
    var newOrderNode = makeOrderNode(templateCopy, orderData);
    newOrderNode.addEventListener('click', manageOrderHandler);

    cart.appendChild(newOrderNode);
  }
};


var updateTotalCart = function () {
  var cartTotalNode = document.querySelector('.goods__total');
  var cartSumNode = cartTotalNode.querySelector('.goods__price');
  var cartBtnNode = cartTotalNode.querySelector('.goods__order-link');

  var totalCartData = calculateTotalOrder();
  var totalSumData = totalCartData.sum;
  var totalAmountData = totalCartData.amount;

  if (totalAmountData > 0) {
    cartPreview.textContent = 'В корзине ' + totalAmountData + ' товара, на сумму ' + totalSumData + ' ₽';
    cartTotalNode.classList.remove('visually-hidden');
    cartTotalNode.querySelector('.goods__total-count')
      .childNodes.item(0)
      .textContent = 'Итого за ' + totalAmountData + ' товаров: ';
    cartSumNode.textContent = totalSumData + ' ₽';
    cartBtnNode.classList.remove('goods__order-link--disabled');
  } else {
    cartPreview.textContent = 'В корзине ничего нет';
    cartTotalNode.classList.add('visually-hidden');
    cartTotalNode.querySelector('.goods__total-count')
      .childNodes.item(0)
      .textContent = 'Итого за 0 товаров: ';
    cartSumNode.textContent = '0 ₽';
    cartBtnNode.classList.remove('goods__order-link--disabled');
    toggleEmptyCartMessage();
  }
};


var addProductToOrderHandler = function (evt) {
  var clickedElement = evt.target;
  var targetCardNode = clickedElement.closest('.catalog__card');
  var targetProductId = targetCardNode.getAttribute('data-id');
  var targetProduct = getProductById(targetProductId, productList);
  var isOrdered = checkIsOrdered(targetProduct);

  addProductToOrderList(targetProduct, isOrdered);
  var orderData = getProductById(targetProductId, orderList);

  toggleEmptyCartMessage();
  updateCatalogProductNode(targetProduct, targetCardNode);
  updateOrderItemNode(targetProductId, isOrdered, orderData);
  updateTotalCart();

  toggleOrderForm();
};

var addToCartButton = document.querySelectorAll('.card__btn');
var listenToCartButtons = function () {
  for (var i = 0; i < addToCartButton.length; i++) {
    addToCartButton[i].addEventListener('click', addProductToOrderHandler);
  }
};
listenToCartButtons();

//  ДОБАВЛЕНИЕ В КОРЗИНУ
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
//  УПРАВЛЕНИЕ ЗАКАЗАМИ

var manageOrderHandler = function (evt) {
  var clickedElementNode = evt.target;
  var targetOrderNode = evt.currentTarget;
  var targetOrderData = getProductById(targetOrderNode.getAttribute('data-id'), orderList);
  var targetProductData = getProductById(targetOrderNode.getAttribute('data-id'), productList);
  var targetProductNode = catalog.querySelector('.catalog__card[data-id="' + targetProductData.id + '"]');

  if (clickedElementNode.classList.contains('card-order__btn--increase')) {
    changeOrderAmount(targetProductData, targetOrderData, 'increase');
  } else if (clickedElementNode.classList.contains('card-order__btn--decrease')) {
    changeOrderAmount(targetProductData, targetOrderData, 'decrease');
  } else if (clickedElementNode.classList.contains('card-order__close')) {
    changeOrderAmount(targetProductData, targetOrderData, 'reset');
  }

  updateOrderList();
  updateOrderItemNode(targetProductData.id, true, targetOrderData);
  updateCatalogProductNode(targetProductData, targetProductNode);
  updateTotalCart();

  toggleOrderForm();
};

//  УПРАВЛЕНИЕ ЗАКАЗАМИ
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
//  ПЕРЕКЛЮЧЕНИЕ ВЛКАДОК ДОСТАВКИ
var toggleButtons = document.querySelectorAll('.toggle-btn');

var findTabs = function (toggler) {
  var tabs = [];
  var tab = toggler.nextElementSibling;

  while (tab) {
    tabs.push(tab);
    tab = tab.nextElementSibling;
  }

  return tabs;
};


var toggleTabs = function (toggler, id, tabsArray) {
  var targetTab = toggler.parentNode.querySelector('[class*="' + id + '"]');

  for (var i = 0; i < tabsArray.length; i++) {
    tabsArray[i].classList.add('visually-hidden');
  }

  targetTab.classList.remove('visually-hidden');
};


var updateToggler = function (toggler, id, evt) {
  var buttons = toggler.querySelectorAll('.toggle-btn__input');
  var targetButton = toggler.querySelector('#' + id);
  evt.preventDefault(); // Обрубаю дефолтное событие браузера по клику на лейбл с атрибутом for

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('checked');
  }

  targetButton.setAttribute('checked', '');
};


var toggleTabsHandler = function (evt) {
  var clickedElement = evt.target;
  var toggler = evt.currentTarget;
  var targetId = clickedElement.getAttribute('for');

  var tabs = findTabs(toggler);
  toggleTabs(toggler, targetId, tabs);
  updateToggler(toggler, targetId, evt);
};


var listenToTabs = function () {
  for (var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener('click', toggleTabsHandler);
  }
};
listenToTabs();

//  ПЕРЕКЛЮЧЕНИЕ ВЛКАДОК ДОСТАВКИ
// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
//  ФИЛЬТР

var priceRange = document.querySelector('.catalog__filter.range');
var priceRangeButtons = priceRange.querySelectorAll('.range__btn');


var calculatePercents = function (currentX, xStart, xEnd, width) {
  var percents = 0;
  if (currentX >= xEnd) {
    percents = 100;
  } else if (currentX <= xStart) {
    percents = 0;
  } else {
    var currentXOffset = currentX - xStart;
    percents = Math.round(currentXOffset / width * 100);
  }
  return percents;
};


var setPriceRangeHandler = function (evt) {
  evt.preventDefault();
  var targetButton = evt.target;
  var targetButtonWidth = targetButton.offsetWidth;

  var range = priceRange;
  var rangeFillLine = range.querySelector('.range__fill-line');
  var rangeWidth = range.offsetWidth - targetButtonWidth / 2; // Ширина слайдера с визуальной компенсацией в половину кнопки
  var rangeXStart = range.offsetLeft + targetButtonWidth / 2; // Начало слайдера с визуальной компенсацией в половину кнопки
  var rangeXEnd = rangeXStart + rangeWidth;

  var isStartButton = targetButton.classList.contains('range__btn--left');

  var rangeStartButton = range.querySelector('.range__btn--left');
  var rangeEndButton = range.querySelector('.range__btn--right');
  var rangeStartButtonXPercent = Math.round(rangeStartButton.offsetLeft / rangeWidth * 100); // Позиция кнопок в процентах относительно слайдера
  var rangeEndButtonXPercent = Math.round(rangeEndButton.offsetLeft / rangeWidth * 100); // Позиция кнопок в процентах относительно слайдера

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = calculatePercents(moveEvt.clientX, rangeXStart, rangeXEnd, rangeWidth);
    var currentPercent = calculatePercents(moveEvt.clientX, rangeXStart, rangeXEnd, rangeWidth);

    var rangeMin = FILTER_DATA.rangeMin;
    var rangeMax = FILTER_DATA.rangeMax - rangeMin;
    var minValNode = priceRange.querySelector('.range__price--min');
    var maxValNode = priceRange.querySelector('.range__price--max');

    var compensation = 2;

    // Проверка на пересечение двух кнопок между собой
    if (isStartButton && shift < rangeEndButtonXPercent - compensation) {
      minValNode.textContent = Math.round(rangeMax / 100 * currentPercent + rangeMin);
      rangeFillLine.style.left = shift + compensation + '%';
    } else if (isStartButton && shift >= rangeEndButtonXPercent - compensation) {
      shift = rangeEndButtonXPercent - compensation;
      minValNode.textContent = Math.round(rangeMax / 100 * shift + rangeMin);
    } else if (!isStartButton && shift <= rangeStartButtonXPercent) {
      shift = rangeStartButtonXPercent + compensation;
      maxValNode.textContent = Math.round(rangeMax / 100 * shift + rangeMin);
    } else {
      maxValNode.textContent = Math.round(rangeMax / 100 * currentPercent + rangeMin);
      rangeFillLine.style.right = 100 - shift - compensation + '%';
    }

    targetButton.style.left = shift + '%';
  };

  var mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};


var listenToPriceRange = function () {
  for (var i = 0; i < priceRangeButtons.length; i++) {
    priceRangeButtons[i].addEventListener('mousedown', setPriceRangeHandler);
  }
};
listenToPriceRange();

//  ФИЛЬТР
// /////////////////////////////////////////////////////////
