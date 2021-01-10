const banner = document.getElementById("banner");
const display = document.querySelector(".champion-graph");
const displayTwo = document.querySelector(".champion-graphTwo");

//All Champions
const championArray = [];
var elem = document.getElementById("myBarLol");
var procentOne= document.getElementById("resultOne");
var procentTwo= document.getElementById("resultTwo");


//ChampionOne
let championOneCurrentLvl = 0;
let championOne = {};

//ChampionTwo
let championTwoCurrentLvl = 0;
let championTwo = {};

//ChartOne
let chartContent = [];
let chartLabels = [];
let statsName = "Stats";
let chartColor = [
    "rgba(0, 186, 0, 0.7)",
    "rgba(200, 0, 0, 0.7)",
    "rgba(255, 245, 0, 0.7)",
    "rgba(0, 168, 224, 0.7)",
    "rgba(255, 90, 0, 0.7)",
    "rgba(0, 80, 224, 0.7)",
];

//ChartTwo
let chartContentTwo = [];
let chartLabelsTwo = [];
let statsNameTwo = "Stats";
let chartColorTwo = [
    "rgba(0, 186, 0, 0.7)",
    "rgba(200, 0, 0, 0.7)",
    "rgba(255, 245, 0, 0.7)",
    "rgba(0, 168, 224, 0.7)",
    "rgba(255, 90, 0, 0.7)",
    "rgba(0, 80, 224, 0.7)",
];

//Load champions to lists when the html-page gets loaded
(async function () {
    const fetcher = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json"
    );
    const jsonConvert = await fetcher.json();
    let i = 0;
    for (const [key, value] of Object.entries(jsonConvert.data)) {
        championArray.push(value);

        document.getElementById("pokemonList").innerHTML +=
            '<a href="#" class="dropdown-item" id="' +
            i +
            '" onclick="getValues(this.id, 1)">' +
            key +
            "</a>";

        document.getElementById("pokemonListTwo").innerHTML +=
            '<a href="#" class="dropdown-itemTwo" id="' +
            i +
            '" onclick="getValues(this.id, 2)">' +
            key +
            "</a>";
        i++;
    }
})();

function getValues(id, nbr) {
    const champion = championArray[id];

    if (nbr === 1) {
        document.getElementById("lvlUpOne").innerHTML = "lvl up";
        display.style.visibility = "visible";
        championOne = champion;
        championOneCurrentLvl = 1;
        chartLabels = [];
        chartContent = [];

        chartLabels.push(Object.keys(champion["stats"])[0]);
        chartLabels.push(Object.keys(champion["stats"])[5]);
        chartLabels.push(Object.keys(champion["stats"])[9]);
        chartLabels.push(Object.keys(champion["stats"])[16]);
        chartLabels.push(Object.keys(champion["stats"])[19]);
        chartLabels.push("ability power");

        chartContent.push(champion["stats"]["hp"]);
        chartContent.push(champion["stats"]["armor"]);
        chartContent.push(champion["stats"]["attackrange"]);
        chartContent.push(champion["stats"]["attackspeed"]);
        chartContent.push(champion["stats"]["attackdamage"]);
        chartContent.push(champion["stats"]["mp"]);
        chart();

        //ChampionInfo
        $("#name").text(champion["id"]);
        $("#image").html(
            '<img src="' +
                "http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/" +
                champion["image"]["full"] +
                '">'
        );
        try {
            $(".typeHolder").html(
                '<p class="type" >' +
                    champion["tags"][0] +
                    "</p> \n" +
                    '<p class="type" >' +
                    champion["tags"][1] +
                    "</p>"
            );
        } catch (error) {
            $(".typeHolder").html(
                '<p class="type">' + champion["tags"][0] + "</p>"
            );
        }
        $("#atack1").text(
            capitalizeFirstLetter(Object.keys(champion["info"])[0]) +
                " Rating: " +
                champion["info"]["attack"]
        );
        $("#atack2").text(
            capitalizeFirstLetter(Object.keys(champion["info"])[1]) +
                " Rating: " +
                champion["info"]["defense"]
        );
        $("#atack3").text(
            capitalizeFirstLetter(Object.keys(champion["info"])[2]) +
                " Rating: " +
                champion["info"]["magic"]
        );
        $("#atack4").text(
            capitalizeFirstLetter(Object.keys(champion["info"])[3]) +
                " Rating: " +
                champion["info"]["difficulty"]
        );
    }
     else {
        document.getElementById("lvlUpTwo").innerHTML = "lvl up";
        displayTwo.style.visibility = "visible";
        championTwo = champion;
        championTwoCurrentLvl = 1;
        chartLabelsTwo = [];
        chartContentTwo = [];

        chartLabelsTwo.push(Object.keys(champion["stats"])[0]);
        chartLabelsTwo.push(Object.keys(champion["stats"])[5]);
        chartLabelsTwo.push(Object.keys(champion["stats"])[9]);
        chartLabelsTwo.push(Object.keys(champion["stats"])[16]);
        chartLabelsTwo.push(Object.keys(champion["stats"])[19]);
        chartLabelsTwo.push("ability power");

        chartContentTwo.push(champion["stats"]["hp"]);
        chartContentTwo.push(champion["stats"]["armor"]);
        chartContentTwo.push(champion["stats"]["attackrange"]);
        chartContentTwo.push(champion["stats"]["attackspeed"]);
        chartContentTwo.push(champion["stats"]["attackdamage"]);
        chartContentTwo.push(champion["stats"]["mp"]);
        chartTwo();

        //ChampionInfo
        document.getElementById("nameTwo").innerHTML = champion["id"];
        //$("#nameTwo").text(champion["id"]);
        $("#imageTwo").html(
            '<img src="' +
                "http://ddragon.leagueoflegends.com/cdn/10.25.1/img/champion/" +
                champion["image"]["full"] +
                '">'
        );
        try {
            $(".typeHolderTwo").html(
                '<p class="type" >' +
                    champion["tags"][0] +
                    "</p> \n" +
                    '<p class="type" >' +
                    champion["tags"][1] +
                    "</p>"
            );
        } catch (error) {
            $(".typeHolderTwo").html(
                '<p class="type">' + champion["tags"][0] + "</p>"
            );
        }
        document.getElementById("atack1Two").innerHTML =
            capitalizeFirstLetter(Object.keys(champion["info"])[0]) +
            " Rating: " +
            champion["info"]["attack"];
        document.getElementById("atack2Two").innerHTML =
            capitalizeFirstLetter(Object.keys(champion["info"])[1]) +
            " Rating: " +
            champion["info"]["defense"];
        document.getElementById("atack3Two").innerHTML =
            capitalizeFirstLetter(Object.keys(champion["info"])[2]) +
            " Rating: " +
            champion["info"]["magic"];
        document.getElementById("atack4Two").innerHTML =
            capitalizeFirstLetter(Object.keys(champion["info"])[3]) +
            " Rating: " +
            champion["info"]["difficulty"];
            compareChamps()
    }
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
                            suggestedMax: 2000,
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
                            suggestedMax: 2000,
                            fontColor: "White",
                        },
                    },
                ],
            },
        },
    });
}
function championLvlUp(nbr) {
    if (nbr === 1 && championOneCurrentLvl < 16) {
        championOneCurrentLvl++;
        document.getElementById("lvlUpOne").innerHTML = championOneCurrentLvl;
        chartContent[0] += championOne["stats"]["hpperlevel"];
        chartContent[1] += championOne["stats"]["armorperlevel"];
        chartContent[3] += championOne["stats"]["attackspeedperlevel"];
        chartContent[4] += championOne["stats"]["attackdamageperlevel"];
        chartContent[5] += championOne["stats"]["mpperlevel"];
        chart();
    } else if (nbr === 2 && championTwoCurrentLvl < 16) {
        championTwoCurrentLvl++;
        document.getElementById("lvlUpTwo").innerHTML = championTwoCurrentLvl;
        chartContentTwo[0] += championTwo["stats"]["hpperlevel"];
        chartContentTwo[1] += championTwo["stats"]["armorperlevel"];
        chartContentTwo[3] += championTwo["stats"]["attackspeedperlevel"];
        chartContentTwo[4] += championTwo["stats"]["attackdamageperlevel"];
        chartContentTwo[5] += championTwo["stats"]["mpperlevel"];
        chartTwo();
    }
}

function compareChamps(){

    let championOneRatings = championOne["info"]["attack"]+championOne["info"]["defense"]+championOne["info"]["magic"]
    let championTwoRatings= championTwo["info"]["attack"]+championTwo["info"]["defense"]+championTwo["info"]["magic"]
    let totalRating;
    console.log(championOneRatings)
    console.log(championTwoRatings)
    
    totalRating= championOneRatings+ championTwoRatings

    elem.style.width = championOneRatings/totalRating*100 + "%";
    procentOne.innerHTML= parseFloat(championOneRatings/totalRating*100).toFixed(2)+ "%";
    procentTwo.innerHTML= parseFloat(championTwoRatings/totalRating*100 ).toFixed(2)+ "%";

}