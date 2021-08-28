function sendRequest(configs) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest;
        xhr.open('GET', configs.url);

        xhr.onload = resp => {
            if(xhr.status == 200) {
                resolve(xhr.response)
            }else {
                reject('Ocorreu um erro ao enviar a requisição');
            }
        }
        xhr.send();
    });
}

function createItemCardsContent() {
    document.querySelector('.content-conteiner').innerHTML = '';
    this.sendRequest({ url: "https://pokeapi.co/api/v2/item/" }).then(response => {
        const items = JSON.parse(response);
        items.results.forEach(item => {
            const card = createItemCard(item);
            document.querySelector('.content-conteiner').appendChild(card);
        })
    });
}

function createItemCard(itemContent) {
    const card = createConteiner('item-card');
    const frontCardContent = createItemFrontCardContent(itemContent);

    card.appendChild(frontCardContent);
    return card;
}

function createItemFrontCardContent(itemContent) {
    const frontCardContent = this.createConteiner('front-card-content');
    const itemName = document.createElement('h2');
    itemName.innerHTML = itemContent.name;   
    const imageContainer = createItemImageContainer(itemContent.name);
    
    frontCardContent.appendChild(itemName);
    frontCardContent.appendChild(imageContainer);

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