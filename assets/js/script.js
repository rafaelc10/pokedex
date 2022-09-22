// LEFT SIDE ELEMENTS
const pokemonIdentity = document.querySelector('#pokemon_identity');
const form = document.querySelector('.form');
const input = document.querySelector('.search-pokemon');
const visorPokemon = document.querySelector('.visor-pokemon')
const leftGrayButton = document.querySelector('.left-gray-button')
const leftOrangeButton = document.querySelector('.left-orange-button')
const leftGreenButton = document.querySelector('.left-green-button')
const crossTop = document.querySelector('.cross-top')
const crossLeft = document.querySelector('.cross-left')
const crossBottom = document.querySelector('.cross-bottom')
const crossRight = document.querySelector('.cross-right')

// RIGHT SIDE ELEMENTS
const pokemonTypes = document.querySelector('.pokemon-types');
const types = document.querySelector('#types')
const pokemonHeight = document.querySelector('#pokemon-height')
const pokemonWeight = document.querySelector('#pokemon-weight')
const spanHeight = document.querySelector('#span-height')
const spanWeight = document.querySelector('#span-weight')
const visorSliders = document.querySelector('.visor-sliders')
const visorStats = document.querySelectorAll('.visor-stats')
const h3Evolutions = document.querySelector('#no-evolutions')
const visorEvolutions = document.querySelector('.visor-evolutions')
const visorEvolutionsImg = document.querySelector('.visor-evolutions-img')
const rightOrangeButton = document.querySelector('.right-orange-button')
const rightGreenButton = document.querySelector('.right-green-button')
const visorLeftButton = document.querySelector('.button-left')
const visorRightButton = document.querySelector('.button-right')

// Criação de um Array com todos os ID's dos pokemons
let idKeys = 0;
let idAtual = 0;
let pokemonId = [];
for(let i = 1; i <= 905; i++){
    pokemonId.push(i)
}
for(let i = 10001; i <= 10249; i++){
    pokemonId.push(i)
}

// Busca os dados do pokemon
const buscarPokemon = async (pokemon) => {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (api.status == 200) {
        const data = await api.json();
        return data;
    }
}

// Renderiza Os Dados na Tela
const pokemonRender = async (pokemon) => {
    // Adiciona os Tipos dos Pokemons
    const addElement = () => {
        for (let i = 0; i < Object.keys(data.types).length; i++) {
            const newElement = document.createElement('div');
            const types = document.createTextNode(data.types[i].type.name[0].toUpperCase() + data.types[i].type.name.substring(1));
            newElement.classList.add('pokemon-type');
            newElement.appendChild(types)
            pokemonTypes.appendChild(newElement);
            newElement.classList.add(data.types[i].type.name)
        }
    }
    // Remove os Dados Antigos
    removeElements(visorPokemon)
    removeElements(visorEvolutionsImg)
    removeElements(pokemonTypes);

    visorSliders.style.display = "flex";
    pokemonIdentity.innerHTML = "Carregando...";


    const data = await buscarPokemon(pokemon);

    if (data) {

        getImages(pokemon)
        
        pokemonIdentity.innerText = `#${data.id} - ${data.name[0].toUpperCase() + data.name.substring(1)}`;
        idAtual = data.id;
        if (Object.keys(data.types).length) {
            addElement();
        }

        let hp = data.stats[0].base_stat;
        let atk = data.stats[1].base_stat;
        let def = data.stats[2].base_stat
        let sp_atk = data.stats[3].base_stat;
        let sp_def = data.stats[4].base_stat;
        let speed = data.stats[5].base_stat;

        chart(hp, atk, def)
        chart2(sp_atk, sp_def, speed)

        if (data.height && data.weight) {
            let height = data.height / 10;
            spanHeight.innerText = "Altura: "
            pokemonHeight.innerText = `${height} M`;

            let weight = data.weight / 10;
            pokemonWeight.innerText = `${weight} Kg`
            spanWeight.innerText = "Peso: "
        }

        getEvolution(pokemon)

    } else {
        idAtual = 1;
        idKeys = 0;
        pokemonIdentity.innerText = "Pokemon não encontrado!";
        imagePokemon.src = "https://media1.giphy.com/media/gKH0yJ21ia3chGqPxu/giphy.gif?cid=6c09b952wc9oje0e29s5lwt8k169gu5bbhwfxgipo0za5rmp&rid=giphy.gif&ct=ts"
        types.innerHTML = "";
    }
    input.value = "";

}

const removeElements = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    pokemonRender(input.value.toLowerCase());
    input.value = "";
})
// Slides Charts
let currentSlide = 0;
let totalSlides = document.querySelectorAll('.visor-slide').length;

visorLeftButton.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    let newMargin = currentSlide * 250;
    visorSliders.style.marginLeft = `-${newMargin}px`
})

visorRightButton.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide > totalSlides - 1) {
        currentSlide = 0;
    }
    let newMargin = currentSlide * 250;
    visorSliders.style.marginLeft = `-${newMargin}px`

})
visorSliders.style.width = `calc(250px * ${totalSlides})`


// Função para criar os charts
const chart = (hp, atk, def) => {
    removeElements(visorStats[0])
    const canvas = document.createElement('canvas')
    visorStats[0].appendChild(canvas)
    canvas.setAttribute('id', 'pokemon-stats1')
    canvas.setAttribute('width', '200');
    canvas.setAttribute('height', '110')
    canvas.setAttribute('aria-label', 'Pokemon Stats')
    Chart.defaults.color = "#072c01"
    Chart.defaults.font.family = 'BitFontRegular';
    Chart.defaults.font.size = 16;
    const ctx = document.getElementById('pokemon-stats1').getContext('2d');
    const chartStats = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'ATK', 'DEF'],
            datasets: [{
                label: 'Stats',
                data: [hp, atk, def],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 165, 0, 0.8)',
                    'rgba(54, 162, 235, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(54, 162, 235, 1)'

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: {
                    left: 20,
                    bottom: 20,
                    right: 20
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

const chart2 = (sp_atk, sp_def, speed) => {
    removeElements(visorStats[1])
    const canvas = document.createElement('canvas')
    visorStats[1].appendChild(canvas)
    canvas.setAttribute('id', 'pokemon-stats2')
    canvas.setAttribute('width', '200');
    canvas.setAttribute('height', '140')
    canvas.setAttribute('aria-label', 'Pokemon Stats 2')
    Chart.defaults.color = "#072c01"
    Chart.defaults.font.family = 'BitFontRegular';
    Chart.defaults.font.size = 14;
    const ctx = document.getElementById('pokemon-stats2').getContext('2d');
    const chartStats = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['SP-ATK', 'SP-DEF', 'SPEED'],
            datasets: [{
                label: 'Stats',
                data: [sp_atk, sp_def, speed],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 165, 0, 0.8)',
                    'rgba(54, 162, 235, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(54, 162, 235, 1)'

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            layout: {
                padding: {
                    left: 20,
                    bottom: 20,
                    right: 20
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Renderiza as Evoluções
const getEvolution = async (pokemon) => {
    const data = await buscarPokemon(pokemon);


    const fetchSpecies = await fetch(`${data.species.url}`)
    const dataSpecies = await fetchSpecies.json()
    
    const fetchEvolution = await fetch(`${dataSpecies.evolution_chain.url}`)
    const dataEvolution = await fetchEvolution.json()

    let evolutions = []
    // PEGAR NOME DAS EVOLUÇÕES
    if (fetchEvolution.ok) {
        let lengthArray = dataEvolution.chain.evolves_to.length
        evolutions.push(dataEvolution.chain.species.url)
        if (dataEvolution.chain.evolves_to.length > 0) {
            for (let i = 0; i < lengthArray; i++) {
                let lengthArray2 = dataEvolution.chain.evolves_to[i].evolves_to.length;
                evolutions.push(dataEvolution.chain.evolves_to[i].species.url)
                if (dataEvolution.chain.evolves_to[i].evolves_to.length > 0) {
                    for (let ii = 0; ii < lengthArray2; ii++) {
                        evolutions.push(dataEvolution.chain.evolves_to[i].evolves_to[ii].species.url)
                    }
                }
            }
        }
        // Remove as Evoluções Anteriores
        if (evolutions.findIndex((item) => item == pokemon) > -1) {
            console.log(evolutions.findIndex((item) => item == pokemon))
            evolutions.reverse()
            evolutions.splice(evolutions.findIndex((item) => item === pokemon))
            evolutions.reverse()
        }
    }

    // PEGAR ID DOS POKEMONS PELA URL
    evolutions.forEach((item) => {
        let indexOf = item.indexOf('species/')
        evolutions.push(item.substring(indexOf + 8, item.length - 1))
    })
    for (let i = 0; i <= evolutions.length / 2; i++) {
        evolutions.shift()
    }
    for (let i in evolutions) {
        if (evolutions[i] == data.id) {
            evolutions.reverse()
            evolutions.splice(evolutions.indexOf(data.id.toString()));
            evolutions.reverse()
        }
    }
    if (evolutions.length < 1) {
        // Pokemon Sem Evoluções
        visorEvolutions.appendChild(h3Evolutions)
        h3Evolutions.classList.add('visor-evolutions')
        h3Evolutions.setAttribute('id', 'no-evolutions')
        
        h3Evolutions.style.visibility = "visible"

        const h3 = document.querySelector('.visor-evolutions h3')
        h3.style.visibility = "hidden"

    } else {
        // Adiciona os Elementos se o pokemon tiver evoluções
        for (let i in evolutions) {
            let evolution = await buscarPokemon(evolutions[i])
            let img = evolution.sprites.other.home.front_default
            let pokemonName = evolutions[i]

            h3Evolutions.style.visibility = "hidden";

            const h3 = document.querySelector('.visor-evolutions h3')
            visorEvolutionsImg.classList.add('visor-evolutions-img')

            const newFigure = document.createElement('figure')
            const newImg = document.createElement('img')
            const newFigCaption = document.createElement('figcaption')
            visorEvolutionsImg.appendChild(newFigure)
            newFigure.appendChild(newImg)
            newFigure.appendChild(newFigCaption)

            newImg.setAttribute('src', img)
            h3.style.visibility = "visible"
            h3.innerText = `Evoluções: ${evolutions.length}`
            h3.style.top = '10px';
            newFigCaption.innerText = evolution.name;
            newFigCaption.innerHTML = newFigCaption.innerText[0].toUpperCase() + newFigCaption.innerText.substring(1)


            const allNewFigures = document.querySelectorAll('figure')
            allNewFigures[i].addEventListener('click', () => {
                pokemonRender(pokemonName)
            })

            // EVENTO PREV E NEXT SLIDE EVOLUÇÕES
            let currentSlideEvolution = 0;
            let totalSlideEvolution = document.querySelectorAll('.visor-evolutions-img figure').length;
            visorEvolutionsImg.style.height = `calc(200px * ${totalSlideEvolution})`
            rightOrangeButton.addEventListener('click', () => {
                currentSlideEvolution--;
                if (currentSlideEvolution < 0) {
                    currentSlideEvolution = totalSlideEvolution - 1;
                }
                let newMargin = currentSlideEvolution * 200;
                visorEvolutionsImg.style.marginTop = `-${newMargin}px`
            })
            rightGreenButton.addEventListener('click', () => {
                if (visorSliders.style.marginLeft === '-500px') {
                    currentSlideEvolution++;
                    if (currentSlideEvolution > totalSlideEvolution - 1) {
                        currentSlideEvolution = 0
                    }
                    let newMargin = currentSlideEvolution * 200;
                    visorEvolutionsImg.style.marginTop = `-${newMargin}px`
                }
            })

        }
    }

}
// Proximo Pokemon
crossTop.addEventListener('click', () => {
    nextPokemon()
})
// Proximo Pokemon
crossRight.addEventListener('click', () => {
    nextPokemon()
})
// Pokemon Anterior
crossLeft.addEventListener('click', () => {
    prevPokemon()
})
// Pokemon Anterior
crossBottom.addEventListener('click', () => {
    prevPokemon()
})

// Renderiza as Imagens do Pokemon
const getImages = async (pokemon) => {
    const data = await buscarPokemon(pokemon)

    let imagesUrl = [];
    imagesUrl.push(data.sprites.front_default)
    imagesUrl.push(data.sprites.back_default)
    imagesUrl.push(data.sprites.front_shiny)
    imagesUrl.push(data.sprites.back_shiny)

    imagesUrl = imagesUrl.filter((item) => item != null ? true : false)

    if(imagesUrl.length != 0){
        for (let i in imagesUrl) {
            const newImg = document.createElement('img')
            visorPokemon.appendChild(newImg)
            newImg.classList.add('visor-pokemon-img-png')
            newImg.setAttribute('src', imagesUrl[i])

        }
    } else {
        const h3 = document.createElement('h3')
        visorPokemon.appendChild(h3)
        h3.classList.add('no-image')
        h3.innerText = "Pokemon Sem Foto Disponível."


    }

    let currentSlideVisor = 0;
    let totalSlideVisor = document.querySelectorAll('.visor-pokemon img').length;

    visorPokemon.style.height = `calc(${185}px * ${totalSlideVisor})`

    leftOrangeButton.addEventListener('click', () => {
        currentSlideVisor--;
        if (currentSlideVisor < 0) {
            currentSlideVisor = totalSlideVisor - 1;
        }

        let newMargin = currentSlideVisor * 185;
        visorPokemon.style.marginTop = `-${newMargin}px`
        

    })
    leftGreenButton.addEventListener('click', () => {
        currentSlideVisor++;
        if (currentSlideVisor > totalSlideVisor - 1) {
            currentSlideVisor = 0
        }
        let newMargin = currentSlideVisor * 185;
        visorPokemon.style.marginTop = `-${newMargin}px`
    })

}
// Pokemon Aleatório
leftGrayButton.addEventListener('click', () => {
    const randomNumber = (min, max) => {
        return Math.floor(((max + 1) - min) * Math.random() + min);
    }
    if(randomNumber(1, 2) === 1){
        pokemonRender( randomNumber(1, 905) )
    } else {
        pokemonRender( randomNumber(10001, 10249) )
    }
})

const nextPokemon = ()  => {
    if(idAtual >= 1 && idAtual <= 905 || idAtual >= 10001 && idAtual <= 10249){
        if(idKeys < 1153){
            idKeys = pokemonId.indexOf(idAtual);
            idKeys++;
        } else {
            idKeys = 0;
            idAtual = 1;
        }
    } else {
        idAtual = 1;
        idKeys = 0;
    }
    pokemonRender(pokemonId[idKeys])
}

const prevPokemon = () => {
    if(idAtual >= 1 && idAtual <= 905 || idAtual >= 10001 && idAtual <= 10249){
        if(idKeys === 0){
            idKeys = 1153
        } else {
            idKeys = pokemonId.indexOf(idAtual);
            idKeys--;
        }
    } 
    pokemonRender(pokemonId[idKeys])
}