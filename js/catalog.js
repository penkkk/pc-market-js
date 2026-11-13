import { products } from './data.js';


function createDetail(label, value) {
    const detail = document.createElement('p');
    detail.classList.add('catalog-card__detail');

    const labelElement = document.createElement('strong');
    labelElement.classList.add('catalog-card__label');
    labelElement.textContent = `${label}: `;

    detail.append(labelElement, value);
    return detail;
}

export function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('catalog-card');
    card.dataset.id = product.id;

    const media = document.createElement('div');
    media.classList.add('catalog-card__media');

    if (product.image) {
        const image = document.createElement('img');
        image.classList.add('catalog-card__image');
        image.src = new URL(`../assets/img/${product.image}`, import.meta.url).href;
        image.alt = product.title;
        image.loading = 'lazy';
        image.width = 250;
        image.height = 250;
        media.append(image);
    } else {
        const placeholder = document.createElement('div');
        placeholder.classList.add('catalog-card__image', 'catalog-card__placeholder');
        placeholder.textContent = 'Фото скоро появится';
        media.append(placeholder);
    }

    const content = document.createElement('div');
    content.classList.add('catalog-card__content');

    const title = document.createElement('h2');
    title.classList.add('catalog-card__title');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.classList.add('catalog-card__description');
    description.textContent = product.description;

    const buyButton = document.createElement(product.isAvailable ? 'a' : 'button');
    buyButton.classList.add('catalog-card__link', 'button', 'button--primary');

    if (product.isAvailable) {
        buyButton.href = `order.html?id=${product.id}`;
        buyButton.textContent = 'Купить';
    } else {
        buyButton.type = 'button';
        buyButton.disabled = true;
        buyButton.textContent = 'Нет в наличии';
    }

    const detailsLink = document.createElement('a');
    detailsLink.classList.add('catalog-card__link', 'button', 'button--secondary');
    detailsLink.href = `product.html?id=${product.id}`;
    detailsLink.textContent = 'Подробнее';

    content.append(
        title,
        description,
        createDetail('Гарантия', `${product.warrantyYears} года`),
        createDetail('В наличии', product.isAvailable ? 'Есть' : 'Нет'),
        createDetail('Цена', `${product.price} ₽`),
        buyButton,
        detailsLink
    );

    card.append(media, content);
    return card;
}

export function renderProducts(productList) {
    const catalog = document.querySelector('.catalog');
    if (!catalog) return;


    catalog.replaceChildren();

    if (productList.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Товары не найдены.';
        catalog.append(message);
        return;
    }

    productList.forEach((product) => {
        catalog.append(createProductCard(product));
    });
}

export function initCatalog() {
    renderProducts(products);
}
