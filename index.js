document.querySelector("#pokemons").innerHTML = "<h2 id='loading'>Loading...</h2>"

window.onload = function(){


    init()

    console.log(document.querySelectorAll("#pokemons"))
 
}

const init = async() => {

    const todosPokemon  =  await pokemons()

    console.log(todosPokemon);

    mappedPokemons(todosPokemon)

    findOnePokemon(todosPokemon)

    showAllPokemon(todosPokemon)
    //here works as well
    // const element = document.getElementById('loading');
    // element.remove();

}



const pokemons = async()=> {

    
        let result = [];

        for(let i = 1; i <= 151; i++ ){
         
         let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)

         console.log("pokemon content", pokemon)
    
         let resultPokemon =  await pokemon.json()

         console.log(resultPokemon)
    
         result.push(resultPokemon)
    
       }
    
        return result;
    

}


let mappedPokemons = (pokemons) => {

    pokemons.map(pokemon => {

       return  printPokemon({ name: pokemon.name, img: pokemon.sprites.other.home.front_default, height: (pokemon.height)/10}) 
           })

    
}

   let printPokemon = (pokemon) => {

   let pokemonContainer = document.querySelector('#pokemons')

   pokemonContainer.innerHTML += `<div class="allpokemons">
   <h2 class="pokemonName">${pokemon.name.toUpperCase()}</h2>
   <img class="pokemonImage" src=${pokemon.img} alt=${pokemon.name}>
   <p class="pokemonHeight">Height: ${pokemon.height}m</p>
   </div>
   `
   
   
}


   const findOnePokemon = ((pokemonlist) => {


    let button = document.querySelector("#searchButton")

    button.addEventListener("click", function(e){

        let inputValue = document.querySelector("#searchInput").value.toLowerCase()
        e.preventDefault()

        let pokemonContainer = document.querySelector('#pokemons')

        pokemonContainer.innerHTML = "";
         
        
          let mappedpokemon = pokemonlist.map(pokemon => {
          return { name: pokemon.name, img: pokemon.sprites.other.home.front_default, height: (pokemon.height)/10}
         })

          let onePokemon = mappedpokemon.filter(pokemon => pokemon.name === inputValue)

          if(onePokemon.length == 0){

            if(inputValue.length == 0){
                pokemonContainer.innerHTML = `
                <h2 class="errorMessage">Please write the pokemon's name.</h2>
                `
                return;
            }
            pokemonContainer.innerHTML = `
            <h2 class="errorMessage">The name ${inputValue} doesn't exist. Please try another name.</h2>
            `

            return;
          }

          pokemonContainer.innerHTML = `<div class="allpokemons">
          <h2 class="pokemonName">${onePokemon[0].name?.toUpperCase()}</h2>
          <img class="pokemonImage" src=${onePokemon[0].img} alt=${onePokemon[0].name}>
          <p class="pokemonHeight">Height: ${onePokemon[0].height}m</p>
          </div>
          `
         
          document.querySelector("#searchInput").value = "";
        
       console.log(inputValue);
       
    })

   }

 
 )


 const showAllPokemon = ((pokemons)=> {

   let button = document.querySelector("#showAllButton")

    button.addEventListener("click", function(){

        

        let pokemonContainer = document.querySelector('#pokemons')
    
        pokemonContainer.innerHTML = "";

        printPokemon(pokemons)

        

    })

    const element = document.getElementById('loading');
        element.remove();

 })

