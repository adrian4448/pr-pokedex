function sendRequest(configs) {
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest;
        xhr.open('GET', configs.url, true);
        xhr.onload = e => {
            if(xhr.status === 200) {
                resolve(xhr.response);
            }else {
                return 'Erro';
            }
        }
        xhr.send();
    });
}

function createContent() {
    sendRequest({ url: 'https://pokeapi.co/api/v2/pokemon?limit=151' }).then(response => {
        const pokemonsContent = JSON.parse(response).results;    
        pokemonsContent.forEach( (pokemonContent, index) => {
            const card = createCard(pokemonContent, index);
            card.classList.add('animate__backInUp');
            document.querySelector('.content-conteiner').appendChild(card);
        });
    });
}

function createCard(pokemonContent, index) {
    const conteiner = createFlipperConteiner();
    const frontCard = createFrontCard(pokemonContent, index);
    conteiner.firstElementChild.appendChild(frontCard);
    return conteiner;
}

function createFlipperConteiner() {
    const flipperConteiner = this.createConteiner('flip-conteiner');
    const flipper = this.createConteiner('flipper');
    flipperConteiner.appendChild(flipper);

    return flipperConteiner;
}

function createFrontCard(pokemonContent, index) {
    const frontCard = this.createConteiner('card-front');
    const frontCardContent = createFrontCardContent(pokemonContent, index);
    frontCard.appendChild(frontCardContent);

    return frontCard;
}

function createFrontCardContent(pokemonContent, index) {
    const frontCardContent = this.createConteiner('front-card-content');
    const pokemonName = document.createElement('h2');
    pokemonName.innerHTML = pokemonContent.name;   
    const imageContainer = createImageContainer(index);
    
    frontCardContent.appendChild(pokemonName);
    frontCardContent.appendChild(imageContainer);

    return frontCardContent;
}

function createImageContainer(index) {
    const imageContainer = this.createConteiner('image-container');
    const image = document.createElement('img');
    image.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`);
    
    imageContainer.appendChild(image);
    return imageContainer;
}

function createConteiner(cssClass) {
    const conteiner = document.createElement('div');
    conteiner.classList.add(cssClass);
    return conteiner;
}