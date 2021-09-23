const generationClause = {
    First_Generation: 'offset=0&limit=151',
    Second_Generation: 'offset=151&limit=100',
    Third_Generation: 'offset=251&limit=135', 
    Fourth_Generation: 'offset=386&limit=107',
}

function sendRequest(configs) {
    return new Promise((resolve, reject) => {
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

async function createPokemonCardsContent(generationSelected) {
    openLoader();
    document.querySelector('.content-conteiner').innerHTML = '';
    const pokemonsContent = await getContent(generationSelected);
    
    for(var i = 0; i < pokemonsContent.length; i++) {    
        const card = await createPokemonCard(pokemonsContent[i], i, generationSelected)
        card.classList.add('animate__animated');
        card.classList.add('animate__backInUp');
        document.querySelector('.content-conteiner').appendChild(card);
    }
    closeLoader();
}

function getContent(generationSelected) {
    return this.sendRequest({ url: `https://pokeapi.co/api/v2/pokemon?${generationClause[generationSelected.replace(' ', '_')]}` }).then(response => {
        const pokemonsContent = JSON.parse(response).results;    
        return pokemonsContent;
    });
}

async function createPokemonCard(pokemonContent, index, generationSelected) {
    const conteiner = createFlipperConteiner();
    const frontCard = createFrontCard(pokemonContent, generationPokeNumberStart(generationSelected) + index);
    await createBackCard(pokemonContent).then(backCard => {
        conteiner.firstElementChild.appendChild(frontCard);
        conteiner.firstElementChild.appendChild(backCard);
    });
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

async function createBackCard(pokemonContent) {   
    const backCard = this.createConteiner('card-back');
    await this.createBackCardContent(pokemonContent).then(backCardContent => {
        backCard.appendChild(backCardContent);
    });
    return backCard;
}

function createFrontCardContent(pokemonContent, index) {
    const frontCardContent = this.createConteiner('front-card-content');
    const pokemonName = document.createElement('h2');
    pokemonName.innerHTML = pokemonContent.name;   
    const imageContainer = createImageContainer(index);
    const cardNumberConteiner = createCardNumberConteiner(index + 1); 

    frontCardContent.appendChild(pokemonName);
    frontCardContent.appendChild(imageContainer);
    frontCardContent.appendChild(cardNumberConteiner);

    return frontCardContent;
}

async function createBackCardContent(pokemonContent) {
    const backCardContent = this.createConteiner('back-card-content');
    await this.sendRequest({ url: pokemonContent.url }).then(response => {
        responseContent = JSON.parse(response);
        const abilityConteiner = this.createStatsContainer(responseContent.stats);
        backCardContent.appendChild(abilityConteiner);
    });
    
    return backCardContent;
}

function createImageContainer(index) {
    const imageContainer = this.createConteiner('image-container');
    const image = document.createElement('img');
    image.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`);
    
    imageContainer.appendChild(image);
    return imageContainer;
}

function createStatsContainer(statsContent) {
    const statsConteiner = this.createConteiner('status-conteiner');
    const stats = document.createElement('ul');
    statsContent.forEach(st => {
        const statConteiner = createStatConteiner(st);
        stats.appendChild(statConteiner);
        statsConteiner.appendChild(stats);
    });
    return statsConteiner;
}

function createStatConteiner(status) {
    const statConteiner = this.createConteiner('stat-conteiner');
    
    const stat = document.createElement('li');
    stat.innerHTML = status.stat.name;
    
    const statBar = document.createElement('progress');
    statBar.setAttribute('value', status.base_stat);
    statBar.setAttribute('max', 200);
    
    statConteiner.appendChild(stat);
    statConteiner.appendChild(statBar);

    return statConteiner;
}

function createCardNumberConteiner(pokemonNumber) {
    const cardNumberContainer = createConteiner('card-number-conteiner');
    cardNumberContainer.innerHTML = pokemonNumber;

    return cardNumberContainer;
}

function generationPokeNumberStart(generationSelected) {
    switch(generationSelected) {
        case 'First Generation': return 0;
        case 'Second Generation': return 151;
        case 'Third Generation': return 251;
        case 'Fourth Generation': return 386;
    }
}

function openLoader() {
    const body = document.querySelector('body');
    const contentConteiner = document.querySelector('.content-conteiner');
    const loader = createConteiner('loader');
    contentConteiner.style.display = 'none';
    body.appendChild(loader);   
}

function closeLoader() {
    const body = document.querySelector('body');
    const loader = document.querySelector('.loader');
    const contentConteiner = document.querySelector('.content-conteiner');
    contentConteiner.style.display = 'flex';
    body.removeChild(loader);
}

function createConteiner(cssClass) {
    const conteiner = document.createElement('div');
    conteiner.classList.add(cssClass);
    return conteiner;
}