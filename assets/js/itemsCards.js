function createItemCardsContent() {
    document.querySelector('.content-conteiner').innerHTML = '';
    this.sendRequest({ url: "https://pokeapi.co/api/v2/item" }).then(response => {
        const items = JSON.parse(response);
        items.results.forEach((item,index) => {
            this.sendRequest({ url: `https://pokeapi.co/api/v2/item/${index}`}).then(itemData => {
                const card = createItemCard(item, JSON.parse(itemData));
                card.classList.add('animate__animated');
                card.classList.add('animate__backInUp');
                document.querySelector('.content-conteiner').appendChild(card);
            });
        });
    });
}

function createItemCard(item, itemData) {
    const card = createConteiner('item-card');
    const frontCardContent = createItemFrontCardContent(item, itemData);

    card.appendChild(frontCardContent);
    return card;
}

function createItemFrontCardContent(item, itemData) {
    const frontCardContent = this.createConteiner('front-card-content');
    const itemName = document.createElement('h2');
    itemName.innerHTML = item.name;
    const imageContainer = createItemImageContainer(item.name);

    const itemDescription = createConteiner('item-description');
    itemDescription.innerHTML = itemData.effect_entries[0].effect;

    frontCardContent.appendChild(itemName);
    frontCardContent.appendChild(imageContainer);
    frontCardContent.appendChild(itemDescription);
    
    return frontCardContent;
}

function createItemImageContainer(itemName) {
    const imageContainer = this.createConteiner('image-container');
    const image = document.createElement('img');
    image.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemName}.png`);
    
    imageContainer.appendChild(image);
    return imageContainer;
}

function createConteiner(cssClass) {
    const conteiner = document.createElement('div');
    conteiner.classList.add(cssClass);
    return conteiner;
}