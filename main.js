function makeCard(valueCard) {
  const li = document.createElement('li');
  li.classList.add('play-card', 'play-card--close');
  const p = document.createElement('p');
  p.classList.add('play-card__value');
  const div = makeDiv('play-card__value-wrapper');

  p.textContent = valueCard;
  div.append(p);
  li.append(div);
  return li;
}


function makeList(cardCount = 16) {
  let range = cardCount / 2;
  let valueList = [];
  const ul = document.createElement('ul');
  ul.classList.add('card-list')

  while (cardCount > 0) {
    const valueCard = Math.round((Math.random() * (range - 1)) + 1);
    if (!(valueList.filter((value) => { return value === valueCard }).length > 1)) { // Проверка на наличие такого значения у уже созданных карточек
      valueList.push(valueCard)
      cardCount--

      // Создание карточки
      const li = makeCard(valueCard);
      // Обработка нажатия
      li.addEventListener('click', () => {
        // Карта "переворачивается"
        li.classList.toggle('play-card--close');
        li.classList.toggle('play-card--open');
        // Находится последняя открытая карта
        let selectedCard = document.getElementsByClassName('play-card--selected')[0];

        // Проверка карты на одинаковое значение с последней открытой
        // открытых карт ещё не было
        if (selectedCard === undefined) {
          li.classList.add('play-card--selected');
          return
        }

        // Значения карт не равны
        if (selectedCard.textContent !== li.textContent) {
          selectedCard.classList.toggle('play-card--close');
          selectedCard.classList.toggle('play-card--open');
          selectedCard.classList.toggle('play-card--selected');
          li.classList.toggle('play-card--selected')
        }

        // Значения карт равны
        else {
          selectedCard.classList.toggle('play-card--selected');
        }
      })

      // Добавление получившийся карточки в список
      ul.append(li);
    }
  }
  return ul;
}


function makeDiv(class_) {
  const div = document.createElement('div');
  div.classList.add(class_);
  return div;
}


document.addEventListener('DOMContentLoaded', () => {
  // Создание дом элементов
  const container = makeDiv('container');
  const ulFull = makeList()

  // Сборка DOM
  container.append(ulFull);
  document.body.append(container);
})
