const nomePokemon = document.querySelector('.pokemon_name');
const numberPokemon = document.querySelector('.pokemon_number');
const imagePokemon = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const pokemonTypes = document.querySelector('.pokemon-types');
const pokedexMain = document.querySelector('.pokedex_main');

let pokemonType = document.querySelectorAll('.pokemon-type')
let pokemonId = 1;

let pokemons = [];
const pokemonsList = document.querySelector('#pokemon-list')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')


const buscarPokemon = async (pokemon) => {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(api.status == 200){
        const data = await api.json();
        return data;
    }
}

const buscarNomesPokemons = async () => {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    const data = await api.json()

    pokemons = Object.keys(data.results).map((x) => data.results[x].name);
    pokemons.sort();

    loadNomesPokemons(pokemons, pokemonsList)

}

const filterPokemonNames = (data, searchText) => {
    return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
}

const loadNomesPokemons = (data, element) => {
    if(data){
        removeElements(element)
        data.forEach((item, index) => {
            if((data.includes(item.toLowerCase()))){
                const newElement = document.createElement('li');
                const innerNewElement = document.createTextNode(item[0].toUpperCase() + item.substring(1))
                newElement.appendChild(innerNewElement);
                element.appendChild(newElement)
                newElement.addEventListener('click', () => {
                    pokemonRender(newElement.innerText.toLowerCase());
                })
            }
        })
        
    }

}




const pokemonRender = async (pokemon) => {
    const addElement = () => {
        for(let i = 0; i < Object.keys(data.types).length; i++){
            const newElement = document.createElement('div');
            const types = document.createTextNode(data.types[i].type.name[0].toUpperCase() + data.types[i].type.name.substring(1));
            newElement.classList.add('pokemon-type');
            newElement.appendChild(types)
            pokemonTypes.appendChild(newElement);
            switch (data.types[i].type.name) {
                case 'grass':
                    newElement.classList.add('grass');
                    break;
                case 'bug':
                    newElement.classList.add('bug');
                    break;
                case 'fighting':
                    newElement.classList.add('fighting');
                    break;
                case 'flying':
                    newElement.classList.add('flying');
                    break;
                case 'poison':
                    newElement.classList.add('poison');
                    break;
                case 'ground':
                    newElement.classList.add('ground');
                    break;    
                case 'rock':
                    newElement.classList.add('rock');
                    break;
                case 'ghost':
                    newElement.classList.add('ghost');
                    break;
                case 'steel':
                    newElement.classList.add('steel');
                    break;
                case 'fire':
                    newElement.classList.add('fire');
                    break;
                case 'water':
                    newElement.classList.add('water');
                    break;
                case 'electric':
                    newElement.classList.add('electric');
                    break;    
                case 'ice':
                    newElement.classList.add('ice');
                    break;
                case 'dragon':
                    newElement.classList.add('dragon');
                    break;
                case 'dark':
                    newElement.classList.add('dark');
                    break;    
                case 'fairy':
                    newElement.classList.add('fairy');
                    break;
                case 'normal':
                    newElement.classList.add('normal');
                    break;
                case 'psychic':
                    newElement.classList.add('psychic');
                    break;
            }
        }
    }
    removeElements(pokemonsList)
    removeElements(pokemonTypes);
    

    nomePokemon.innerHTML = "Carregando...";
    
    const data = await buscarPokemon(pokemon);

    if(data){
        nomePokemon.innerHTML = data.name[0].toUpperCase() + data.name.substring(1);
        numberPokemon.innerHTML = `Nº${data.id}`;
        if(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] == null && data['sprites']['other']['home']['front_default'] == null){
            imagePokemon.src = 'https://media1.giphy.com/media/gKH0yJ21ia3chGqPxu/giphy.gif?cid=6c09b952wc9oje0e29s5lwt8k169gu5bbhwfxgipo0za5rmp&rid=giphy.gif&ct=ts'
        } else if(data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] != null){
            imagePokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        } else if(data['sprites']['other']['home']['front_default'] != null){
            imagePokemon.src = data['sprites']['other']['home']['front_default'];
        }

        pokemonId = data.id;
        if(pokemonId === 1){
            btnPrev.style.visibility = "hidden";
        } else if(pokemonId === 10249){
            btnNext.style.visibility = "hidden";
        } else {
            btnNext.style.visibility = "visible";
            btnPrev.style.visibility = "visible";
        }

        if(Object.keys(data.types).length){
            addElement();
        } 
        
    } else {
        nomePokemon.innerHTML = "Pokemon não encontrado!";
        numberPokemon.innerHTML = `Nº0000`;
        imagePokemon.src = "https://media1.giphy.com/media/gKH0yJ21ia3chGqPxu/giphy.gif?cid=6c09b952wc9oje0e29s5lwt8k169gu5bbhwfxgipo0za5rmp&rid=giphy.gif&ct=ts"
    }
    input.value = "";

    
}

const removeElements = (element) =>{
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    pokemonRender(input.value.toLowerCase());
    input.value = "";
    
})

btnNext.addEventListener('click', () => {
    if(pokemonId !== 10249){
        pokemonId += 1;
        pokemonRender(pokemonId)
    }
})

btnPrev.addEventListener('click', () => {
    if(pokemonId !== 1){
        pokemonId -= 1;
        pokemonRender(pokemonId)
    } 
})

input.addEventListener('input', () => {
    const filteredNames = filterPokemonNames(pokemons, input.value);
    loadNomesPokemons(filteredNames, pokemonsList);

})

input.addEventListener('focus', () => {
    buscarNomesPokemons();
    
})

document.querySelector('html').addEventListener('click', () => {

    pokemonsList.innerHTML = "";
})
