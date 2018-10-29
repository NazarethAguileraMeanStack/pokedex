  

$(document).ready(function(){
  let pokemonIndex = 1;
  let pokemonName = '';
  let pokemonGenus = '';
  let pokemonInfo = '';
  let pokemonEvolution = '';
  let imageSource = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  let englishArray = [10, 11, 12, 19, 20, 21, 22, 25, 26, 27, 28, 35, 36, 37, 38, 39, 40, 41, 42, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74, 75, 76, 79, 80, 81, 82, 88, 89, 90, 91, 92, 93, 94, 96, 97, 102, 103, 104, 105, 113, 115, 118, 119, 120, 121, 123, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 142, 143, 147, 148, 149];
  //2
  getPokemonInfo();
  load();
  
  

  
  
  
  function setPokemonImage() {
    let image = document.getElementById('main-image');
    image.src = imageSource;
  }
  
  function getPokemonImage() {
    let index = '';
    if (pokemonIndex < 10) {
      index = '00' + pokemonIndex.toString();
    } else if (pokemonIndex < 100) {
      index = '0' + pokemonIndex.toString();
    } else {
      index = pokemonIndex.toString();
    }
    
    imageSource = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + index  + '.png';
    
  }
  
  function getPokemonInfo() {
    $.getJSON("https://pokeapi.co/api/v2/pokemon-species/" + pokemonIndex.toString() + "/",
      function(data){
        pokemonName = data.name;
        pokemonGenus = data.genera[2].genus;
      
      if (englishArray.includes(pokemonIndex)) {
        pokemonInfo = data.flavor_text_entries[2].flavor_text;
      } else {
        pokemonInfo = data.flavor_text_entries[1].flavor_text;
      }
        
        pokemonEvolution = data.evolves_from_species;
      console.log(pokemonEvolution);
      
       let uppercaseName = pokemonName.replace(pokemonName.charAt(0), pokemonName.charAt(0).toUpperCase()); 
        $('#name').text(uppercaseName);
        $('#idNumber').text(pokemonIndex);
        $('#genus').text(pokemonGenus);
        $('#description').text(pokemonInfo);
        
        if (pokemonEvolution === null) {
          $('#evolution').text('N/A');
        } else {
          $('#evolution').text(pokemonEvolution.name);
        }
      });
    
  }
  

  document.getElementById("nextPokemon").addEventListener("click", function(){
    if (pokemonIndex < 151) pokemonIndex++;
    load();
  });
  
   document.getElementById("prevPokemon").addEventListener("click", function(){
    if (pokemonIndex > 1) pokemonIndex--;
    load();
  });
  
  document.getElementById('search').addEventListener('keyup', function() {
    let inputValue = document.getElementById('search').value;
    if (parseInt(inputValue) > 0 && parseInt(inputValue) < 152){
      pokemonIndex = parseInt(inputValue);
    } else {
      pokemonIndex = 1;
    }
    load();
  });
  
  $("body").keydown(function(e){
    // left arrow
    if ((e.keyCode || e.which) == 37)
    {   
        if (pokemonIndex > 1) pokemonIndex--;
        load();
    }
    // right arrow
    if ((e.keyCode || e.which) == 39)
    {
        if (pokemonIndex < 151) pokemonIndex++;
        load();
    }   
});


function load(){
    getPokemonInfo();
    getPokemonImage();
    setPokemonImage();
  }
  
});