const display = document.querySelector(".champion-graph");
const displayTwo = document.querySelector(".champion-graphTwo");
const displayMid = document.getElementById("midPanel");

const pokemonGoArray = [];
const pokemonPicArray = [];
let pokemonGoOne;
let pokemonGoTwo;

const typeHolder = document.querySelector(".typeHolder");
const typeHolderTwo = document.querySelector(".typeHolderTwo");

//ChartOne
let chartContent = [];
let chartLabels = [];
let statsName = "Stats";
let chartColor = "";

//ldjsföal
let pokemonOneResult;
let pokemonTwoResult;

//ChartTwo
let chartContentTwo = [];
let chartLabelsTwo = [];
let statsNameTwo = "Stats";
let chartColorTwo = "";

//CSS variables
const root = document.querySelector(":root");

//Switch
let switcher = false;

//ResultBar
var elem = document.getElementById("myBar");
var procentOne = document.getElementById("resultOne");
var procentTwo = document.getElementById("resultTwo");

let selectedPokemonTypeOne = {};
let selectedPokemonTypeTwo = {};
let selectedPokemonOne = {};
let selectedPokemonTwo = {};

const elementColors = {
    fire: "rgba(255, 90, 0, 0.7)",
    grass: "rgba(0, 186, 0, 0.7)",
    water: "rgba(0, 168, 224, 0.7)",
    bug: "rgba(159, 186, 0, 0.7)",
    normal: "rgba(243, 245, 246, 0.7)",
    electric: "rgba(255, 255, 0, 0.7)",
    ground: "rgba(255, 192, 0, 0.7)",
    psychic: "rgba(255, 57, 196, 0.7)",
    ghost: "rgba(53, 0, 193, 0.7)",
    fairy: "rgba(255, 126, 193, 0.7)",
    dragon: "rgba(0, 0, 255, 0.7)",
    steel: "rgba(180, 180, 180, 0.7)",
    ice: "rgba(0, 255, 255, 0.7)",
    poison: "rgba(136, 0, 135, 0.7)",
    flying: "rgba(73, 128, 255, 0.7)",
    fighting: "rgba(162, 15, 0, 0.7)",
    rock: "rgba(162, 113, 0, 0.7)",
};

(async function () {
    const api_url = `/go`;
    const response = await fetch(api_url);
    const json = await response.json();
    let check = 1;
    let formCheck = "Normal";
    for (i = 1; i < Object.keys(json).length; i++) {
        if (json[i]["pokemon_id"] === check && json[i]["form"] === formCheck) {
            pokemonGoArray.push(json[i]);
            document.getElementById("pokemonList").innerHTML +=
                '<a href="#" class="dropdown-item" id="' +
                (check - 1) +
                '" onclick="getValues(this.id, 1)">' +
                json[i]["pokemon_name"] +
                "</a>";

            document.getElementById("pokemonListTwo").innerHTML +=
                '<a href="#" class="dropdown-itemTwo" id="' +
                (check - 1) +
                '" onclick="getValues(this.id, 2)">' +
                json[i]["pokemon_name"] +
                "</a>";
            check++;
        }
    }
})();

async function getValues(id, nbr) {
    const pokemonGo = pokemonGoArray[id];
    console.log(pokemonGo);
    const fetcher = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + (parseInt(id) + 1) + "/"
    );
    const jsonConvert = await fetcher.json();
    console.log(jsonConvert);
    setChartColor(jsonConvert["types"][0]["type"]["name"], nbr);
    if (nbr === 1) {
        display.style.visibility = "visible";
        pokemonGoOne = pokemonGo;
        selectedPokemonTypeOne = jsonConvert;

        console.log(selectedPokemonTypeOne);

        //till graf
        chartLabels = [];
        chartContent = [];

        chartLabels.push("Attack");
        chartLabels.push("Defense");
        chartLabels.push("Stamina");

        chartContent.push(pokemonGo["base_attack"]);
        chartContent.push(pokemonGo["base_defense"]);
        chartContent.push(pokemonGo["base_stamina"]);
        chart();

        //ChampionInfo
        $("#name").text(capitalizeFirstLetter(jsonConvert["name"]));
        $("#image").html(
            '<img src="' + jsonConvert["sprites"]["front_default"] + '">'
        );
        try {
            typeHolder.innerHTML =
                '<p class="type" style="background-color: ' +
                elementColors[jsonConvert["types"][0]["type"]["name"]] +
                ';">' +
                jsonConvert["types"][0]["type"]["name"] +
                "</p> \n" +
                '<p class="type" style="background-color: ' +
                elementColors[jsonConvert["types"][1]["type"]["name"]] +
                ';">' +
                jsonConvert["types"][1]["type"]["name"] +
                "</p>";
        } catch (error) {
            typeHolder.innerHTML =
                '<p class="type" style="background-color: ' +
                elementColors[jsonConvert["types"][0]["type"]["name"]] +
                ';">' +
                jsonConvert["types"][0]["type"]["name"] +
                "</p>";
        }
        if (switcher) {
            fight();
        }
    } else {
        displayTwo.style.visibility = "visible";
        displayMid.style.visibility = "visible";
        switcher = true;
        pokemonGoTwo = pokemonGo;
        selectedPokemonTypeTwo = jsonConvert;

        //till graf
        chartLabelsTwo = [];
        chartContentTwo = [];

        chartLabelsTwo.push("Attack");
        chartLabelsTwo.push("Defense");
        chartLabelsTwo.push("Stamina");

        chartContentTwo.push(pokemonGo["base_attack"]);
        chartContentTwo.push(pokemonGo["base_defense"]);
        chartContentTwo.push(pokemonGo["base_stamina"]);
        chartTwo();

        //ChampionInfo
        $("#nameTwo").text(capitalizeFirstLetter(jsonConvert["name"]));
        $("#imageTwo").html(
            '<img src="' + jsonConvert["sprites"]["front_default"] + '">'
        );
        try {
            typeHolderTwo.innerHTML =
                '<p class="type" style="background-color: ' +
                elementColors[jsonConvert["types"][0]["type"]["name"]] +
                ';">' +
                jsonConvert["types"][0]["type"]["name"] +
                "</p> \n" +
                '<p class="type" style="background-color: ' +
                elementColors[jsonConvert["types"][1]["type"]["name"]] +
                ';">' +
                jsonConvert["types"][1]["type"]["name"] +
                "</p>";
        } catch (error) {
            typeHolderTwo.innerHTML =
                '<p class="type" style="background-color: ' +
                elementColors[jsonConvert["types"][0]["type"]["name"]] +
                ';">' +
                jsonConvert["types"][0]["type"]["name"] +
                "</p>";
        }
        fight();
    }
}

//Handle Chart logic
function chart() {
    //RÖR INTE DENNA!!!!!!
    $(".chartContainer").html('<canvas id="myChart"></canvas>');

    const myChart = document.getElementById("myChart").getContext("2d");
    const firstChart = new Chart(myChart, {
        type: "bar",
        data: {
            //title: 'Stats',
            labels: chartLabels,
            datasets: [
                {
                    label: statsName,
                    labelColor: "White",
                    data: chartContent,
                    backgroundColor: chartColor,
                    hoverBorderWidth: 2,

                    hoverBorderColor: "black",
                },
            ],
            color: "White",
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 300,
                            fontColor: "White",
                        },
                    },
                ],
            },
        },
    });
}

function chartTwo() {
    //RÖR INTE DENNA
    $(".chartContainerTwo").html('<canvas id="myChartTwo"></canvas>');

    const myChartTwo = document.getElementById("myChartTwo").getContext("2d");
    const firstChartTwo = new Chart(myChartTwo, {
        type: "bar",
        data: {
            //title: 'Stats',
            labels: chartLabelsTwo,
            datasets: [
                {
                    label: statsNameTwo,
                    labelColor: "White",
                    data: chartContentTwo,
                    backgroundColor: chartColorTwo,
                    hoverBorderWidth: 2,

                    hoverBorderColor: "black",
                },
            ],
            color: "White",
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 300,
                            fontColor: "White",
                        },
                    },
                ],
            },
        },
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Ändrar färg baserat på element av pokemon
function setChartColor(type, nr) {
    if (nr === 1) {
        pokemonOneType = type;
        chartColor = elementColors[type];
        chart();
        root.style.setProperty("--allShadow", "0px 6px 15px 0px " + chartColor);
        root.style.setProperty("--typeColor", chartColor);
    } else {
        pokemonTwoType = type;
        chartColorTwo = elementColors[type];
        chartTwo();
        root.style.setProperty(
            "--allShadowTwo",
            "0px 6px 15px 0px " + chartColorTwo
        );

        root.style.setProperty("--typeColorTwo", chartColorTwo);
    }
}

async function fight() {
    let infoOne = await typeRequest(
        selectedPokemonTypeOne["types"][0]["type"]["url"]
    );
    let infoTwo = await typeRequest(
        selectedPokemonTypeTwo["types"][0]["type"]["url"]
    );

    checkDoubleDamage(infoOne["damage_relations"], "One");
    checkDoubleDamage(infoTwo["damage_relations"], "Two");

    pokemonOneResult =
        pokemonGoOne["base_defense"] +
        pokemonGoOne["base_stamina"] +
        pokemonGoOne["base_attack"];
    if (PokemonOneDoubleDmg) {
        pokemonOneResult += pokemonGoOne["base_attack"];
    }

    pokemonTwoResult =
        pokemonGoTwo["base_defense"] +
        pokemonGoTwo["base_stamina"] +
        pokemonGoTwo["base_attack"];
    if (PokemonTwoDoubleDmg) {
        pokemonTwoResult += pokemonGoTwo["base_attack"];
    }

    let totalRating = pokemonOneResult + pokemonTwoResult;

    elem.style.width = (pokemonOneResult / totalRating) * 100 + "%";

    procentOne.innerHTML =
        parseFloat((pokemonOneResult / totalRating) * 100).toFixed(2) + "%";
    procentTwo.innerHTML =
        parseFloat((pokemonTwoResult / totalRating) * 100).toFixed(2) + "%";
}

function checkDoubleDamage(data, num) {
    PokemonOneDoubleDmg = false;
    PokemonTwoDoubleDmg = false;

    for (i = 0; i < data["double_damage_to"].length; i++) {
        if (num === "One") {
            if (data["double_damage_to"][i]["name"] === pokemonTwoType) {
                console.log("pokemon one dbdmg");
                PokemonOneDoubleDmg = true;
            } else {
                PokemonOneDoubleDmg = false;
            }
        } else {
            if (data["double_damage_to"][i]["name"] === pokemonOneType) {
                console.log("pokemon two dbdmg");

                PokemonTwoDoubleDmg = true;
            } else {
                PokemonTwoDoubleDmg = false;
            }
        }
    }
}

async function typeRequest(url) {
    const fetcher = await fetch(url);
    const jsonConvert = await fetcher.json();
    return jsonConvert;
}
