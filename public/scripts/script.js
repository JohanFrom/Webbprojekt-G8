//Html tags
const display = document.querySelector(".pokemon-graph");
const displayTwo = document.querySelector(".pokemon-graphTwo");
const displayMid = document.getElementById("midPanel");

//POKEMON INFO CARD
const pokemonArray = [];

//Selected Pokewmons
let selectedPokemons = [];

//Pokemon info
const pokemonStats = document.querySelector(".pokemon-stats");
const pokemonName = document.getElementById("name");
const pokemonImage = document.getElementById("image");
let pokemonOneType = "";
let pokemonTwoType = "";

//PokemonOne fight stats
let PokemonOneDoubleDmg = false;
let PokemonOneImmune = false;
let PokemonOneStats = [];

//PokemonTwo fight stats
let PokemonTwoDoubleDmg = false;
let PokemonTwoImmune = false;
let PokemonTwoStats = [];

//ldjsföal
let pokemonOneResult;
let pokemonTwoResult;

//ChartOne
let chartContent = [];
let chartLabels = [];
let statsName = "Stats";
let chartColor = "";

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

//ElementColors
const elementColors = {
    fire: "rgba(255, 90, 0, 0.7)",
    grass: "rgba(0, 186, 0, 0.7)",
    water: "rgba(0, 168, 224, 0.7)",
    bug: "rgba(159, 186, 0, 0.7)",
    dark: "rgba(54,36,35,0.7)",
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

//Load Pokemons to lists
$(document).ready(function () {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=801",
        headers: { Accept: "application/json" },
    }).done(function (data) {
        for (i = 0; i < data["results"].length; i++) {
            pokemonArray.push(data["results"][i]);
            document.getElementById("pokemonList").innerHTML +=
                '<a href="#" class="dropdown-item" id="' +
                i +
                '" onclick="pokemonSelectFunc(this.id, 1)">' +
                capitalizeFirstLetter(data["results"][i]["name"]) +
                "</a>";

            document.getElementById("pokemonListTwo").innerHTML +=
                '<a href="#" class="dropdown-itemTwo" id="' +
                i +
                '" onclick="pokemonSelectFunc(this.id, 2)">' +
                capitalizeFirstLetter(data["results"][i]["name"]) +
                "</a>";
        }
    });
});

//Handle Chart logic
function chart() {
    //RÖR INTE DENNA
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
                            suggestedMax: 180,
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
                            suggestedMax: 180,
                            fontColor: "White",
                        },
                    },
                ],
            },
        },
    });
}

//Gör apianrop på en specefik pokeon och sätter dess info till sina html-taggar
function pokemonSelectFunc(id, nr) {
    const details = pokemonArray[id]["url"];

    $.ajax({
        url: details,
        headers: {},
    }).done(function (data) {
        pokemonStats.style.display = "block";
        //ChartData
        console.log("in to setchartcolor " + data["types"][0]["type"]["name"]);
        setChartColor(data["types"][0]["type"]["name"], nr);
        if (nr === 1) {
            display.style.visibility = "visible";
            selectedPokemons[0] = data;
            chartLabels = [];
            chartContent = [];
            for (let c = 0; c < 5; c++) {
                chartLabels.push(
                    capitalizeFirstLetter(data["stats"][c]["stat"]["name"])
                );
                chartContent.push(data["stats"][c]["base_stat"]);
            }
            PokemonOneStats = chartContent;
            chart();

            //PokemonInfo
            $("#name").text(capitalizeFirstLetter(pokemonArray[id]["name"]));
            $("#image").html(
                '<img src="' + data["sprites"]["front_default"] + '">'
            );
            try {
                $(".typeHolder").html(
                    '<p class="type" style="background-color: ' +
                        elementColors[data["types"][0]["type"]["name"]] +
                        ';">' +
                        data["types"][0]["type"]["name"] +
                        "</p> \n" +
                        '<p class="type" style="background-color: ' +
                        elementColors[data["types"][1]["type"]["name"]] +
                        ';">' +
                        data["types"][1]["type"]["name"] +
                        "</p>"
                );
            } catch (error) {
                $(".typeHolder").html(
                    '<p class="type" style="background-color: ' +
                        elementColors[data["types"][0]["type"]["name"]] +
                        ';">' +
                        data["types"][0]["type"]["name"] +
                        "</p>"
                );
            }
            $("#atack1").text(
                capitalizeFirstLetter(data["moves"][0]["move"]["name"])
            );
            $("#atack2").text(
                capitalizeFirstLetter(data["moves"][1]["move"]["name"])
            );
            $("#atack3").text(
                capitalizeFirstLetter(data["moves"][2]["move"]["name"])
            );
            $("#atack4").text(
                capitalizeFirstLetter(data["moves"][3]["move"]["name"])
            );

            if (switcher) {
                fight();
            }
        } else {
            displayTwo.style.visibility = "visible";
            displayMid.style.visibility = "visible";
            switcher = true;
            selectedPokemons[1] = data;
            chartLabelsTwo = [];
            chartContentTwo = [];
            for (let c = 0; c < 5; c++) {
                chartLabelsTwo.push(
                    capitalizeFirstLetter(data["stats"][c]["stat"]["name"])
                );
                chartContentTwo.push(data["stats"][c]["base_stat"]);
            }
            PokemonTwoStats = chartContentTwo;
            chartTwo();

            //PokemonInfo
            $("#nameTwo").text(capitalizeFirstLetter(pokemonArray[id]["name"]));
            $("#imageTwo").html(
                '<img src="' + data["sprites"]["front_default"] + '">'
            );
            try {
                $(".typeHolderTwo").html(
                    '<p class="type" style="background-color: ' +
                        elementColors[data["types"][0]["type"]["name"]] +
                        ';">' +
                        data["types"][0]["type"]["name"] +
                        "</p> \n" +
                        '<p class="type" style="background-color: ' +
                        elementColors[data["types"][1]["type"]["name"]] +
                        ';">' +
                        data["types"][1]["type"]["name"] +
                        "</p>"
                );
            } catch (error) {
                $(".typeHolderTwo").html(
                    '<p class="type" style="background-color: ' +
                        elementColors[data["types"][0]["type"]["name"]] +
                        ';">' +
                        data["types"][0]["type"]["name"] +
                        "</p>"
                );
            }

            $("#atack1Two").text(
                capitalizeFirstLetter(data["moves"][0]["move"]["name"])
            );
            $("#atack2Two").text(
                capitalizeFirstLetter(data["moves"][1]["move"]["name"])
            );
            $("#atack3Two").text(
                capitalizeFirstLetter(data["moves"][2]["move"]["name"])
            );
            $("#atack4Two").text(
                capitalizeFirstLetter(data["moves"][3]["move"]["name"])
            );

            fight();
        }
    });
}

//Sätter första bokstaven till stor bokstav
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

PokemonOneStats[0];
PokemonOneStats[2];

PokemonOneStats[1];

async function fight() {
    let infoOne = await typeRequest(
        selectedPokemons[0]["types"][0]["type"]["url"]
    );
    let infoTwo = await typeRequest(
        selectedPokemons[1]["types"][0]["type"]["url"]
    );

    pokemonOneResult =
        PokemonOneStats[0] +
        PokemonOneStats[2] +
        PokemonOneStats[1] +
        (await checkDoubleDamage(
            infoOne["damage_relations"],
            PokemonOneStats[1],
            pokemonTwoType
        ));

    pokemonTwoResult =
        PokemonTwoStats[0] +
        PokemonTwoStats[2] +
        PokemonTwoStats[1] +
        (await checkDoubleDamage(
            infoTwo["damage_relations"],
            PokemonTwoStats[1],
            pokemonOneType
        ));

    let totalRating = pokemonOneResult + pokemonTwoResult;

    elem.style.width = (pokemonOneResult / totalRating) * 100 + "%";

    procentOne.innerHTML =
        parseFloat((pokemonOneResult / totalRating) * 100).toFixed(2) + "%";
    procentTwo.innerHTML =
        parseFloat((pokemonTwoResult / totalRating) * 100).toFixed(2) + "%";
}

async function checkDoubleDamage(data, dmg, opType) {
    for (i = 0; i < data["double_damage_to"].length; i++) {
        if (data["double_damage_to"][i]["name"] === opType) {
            return dmg;
        }
    }
    return 0;
}

async function typeRequest(url) {
    const fetcher = await fetch(url);
    const jsonConvert = await fetcher.json();
    return jsonConvert;
}
