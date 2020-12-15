//HTML 
    //DROPDOWN
    function pokemonDropdown() {
        document.getElementById("pokemon-content-list").classList.toggle("show");
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

    //POKEMON INFO CARD
    


//is-active
const dropDown = document.querySelector('#gameSelector');
let dropCount = 0;
const pokemonSelect = document.querySelector('#pokemonSeletor');
let pokemonCount = 0;
let pokemonArray = [];

//Pokemon info
const pokemonStats = document.querySelector('.pokemon-stats');
const pokemonName = document.getElementById('name');
const pokemonImage = document.getElementById('image');

//Chart 
let chartContent = [];
let chartLabels = [];
let statsName = 'Stats';
let chartColor = '';

//Load Pokemons to Graph        
$(document).ready(function () { 
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=151",
        headers: {"Accept": "application/json"} 
    })
    .done(function (data) { 
        for(i = 0; i < data['results'].length; i++){
            pokemonArray.push(data['results'][i]);
            document.getElementById('pokemonList').innerHTML += '<a href="#" class="dropdown-item" id="' + i + '" onclick="pokemonSelectFunc(this.id)">' + data['results'][i]['name'] + '</a>';
        }
    });       
});



// Handle drop down menues
/*
dropDown.addEventListener('click', () => {
    if(dropCount % 2 == 0){
        dropDown.classList.add('is-active')
        dropCount++
    }else {
        dropDown.classList.remove('is-active')
        dropCount++
    }
})

pokemonSelect.addEventListener('click', () => {
    if(pokemonCount % 2 == 0){
        pokemonSelect.classList.add('is-active')
        pokemonCount++
    }else {
        pokemonSelect.classList.remove('is-active')
        pokemonCount++
    }
})*/

//Handle Chart logic
function chart(){
    //RÖR INTE DENNA 
    $('.chartContainer').html('<canvas id="myChart"></canvas>');


    const myChart = document.getElementById('myChart').getContext('2d');
    const firstChart = new Chart(myChart, {
        type: 'bar',
        data: {
            title: 'Stats',
            labels: chartLabels,
            datasets: [{
                label: statsName,
                data: chartContent,
                backgroundColor: chartColor,
                hoverBorderWidth: 2,
                
                hoverBorderColor: "black"
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 180
                    }
                }]
            }
        }
    });
}

function pokemonSelectFunc(id){
    const details = pokemonArray[id]['url'];
    
    console.log(pokemonArray[0]['url'])
    $.ajax({
        url: details,
        headers: {"Accept": "application/json"}
    })
    .done(function (data) {
        pokemonStats.style.display = "block";
        //ChartData
        setChartColor(data["types"][0]["type"]["name"])
        chartLabels = [];
        chartContent = [];
        for(let c = 0; c < 5; c++){
            chartLabels.push(data["stats"][c]["stat"]["name"]);
            chartContent.push(data["stats"][c]["base_stat"]);
        }

        chart();
        
        /*
        chartContent.push(data["height"]);
        chartContent.push(data["weight"]);
        */
        

        //PokemonInfo 
        $('#name').text(capitalizeFirstLetter(pokemonArray[id]['name']));
        $('#image').html('<img src="' + data['sprites']['front_default'] + '">');
        $('#atack1').text(capitalizeFirstLetter(data['moves'][0]['move']['name']));
        $('#atack2').text(capitalizeFirstLetter(data['moves'][1]['move']['name']));
        $('#atack3').text(capitalizeFirstLetter(data['moves'][2]['move']['name']));
        $('#atack4').text(capitalizeFirstLetter(data['moves'][3]['move']['name']));
    });
}
chart();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//gör funktion som ändrar färg baserat på element av pokemon
function setChartColor(type){
    console.log(type);
    if(type === 'fire'){
        chartColor = 'rgba(215, 85, 20, 0.54)';
        chart();
    } else if (type === 'grass'){
        chartColor = 'rgba(20, 215, 23, 0.54)';
        chart();
    } else if (type === 'water'){
        chartColor = 'rgba(20, 195, 215, 0.54)';
        chart();
    } else if (type === 'bug'){
        chartColor = 'rgba(150, 215, 20, 0.54)';
        chart();
    } else if (type === 'normal'){
        chartColor = 'rgba(119, 123, 111, 0.54)';
        chart();
    } else if (type === 'electric'){
        chartColor = 'rgba(238, 190, 17, 0.54)';
        chart();
    } else if (type === 'ground'){
        chartColor = 'rgba(218, 58, 37, 0.54)';
        chart();
    } else if (type === 'psychic'){
        chartColor = 'rgba(203, 37, 218, 0.54)';
        chart();
    } else if (type === 'ghost'){
        chartColor = 'rgba(115, 37, 218, 0.54)';
        chart(); 
    } else if (type === 'fairy'){
        chartColor = 'rgba(218, 37, 173, 0.54)';
        chart();
    } else if (type === 'dragon'){
        chartColor = 'rgba(37, 55, 218, 0.54)';
        chart();
    } else if (type === 'steal'){
        chartColor = 'rgba(153, 153, 153, 0.54)';
        chart();
    } else if (type === 'ice'){
        chartColor = 'rgba(117, 178, 189, 0.54)';
        chart();
    } else if (type === 'poison'){
        chartColor = 'rgba(130, 95, 211, 0.54)';
        chart();
    } else if (type === 'flying'){
        chartColor = 'rgba(95, 153, 211, 0.54)';
        chart();
    } else if (type === 'fighting'){
        chartColor = 'rgba(198, 115, 83, 0.54)';
        chart();
    }
}
