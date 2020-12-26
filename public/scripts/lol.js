const banner = document.getElementById("banner");
const championArray = [];
//ChartOne
let chartContent = [];
let chartLabels = [];
let statsName = "Stats";
let chartColor = "";


banner.addEventListener("click", async () => {
    console.log("yolo");

    const api_url = `/lol`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
});

//Load Pokemons to lists
$(document).ready(function () {
    $.ajax({
        url:
            "https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json",
        headers: { Accept: "application/json" },
    }).done(function (data) {
        
        let i = 0;
        for (const [key, value] of Object.entries(data.data)) {
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
    });
});
function getValues(id, nbr){
    const champion= championArray[id];

    if (nbr === 1) {
        chartLabels = [];
        chartContent = [];
        
        
        chartLabels.push(Object.keys(champion['stats'])[0]);
        chartLabels.push(Object.keys(champion['stats'])[5]);
        chartLabels.push(Object.keys(champion['stats'])[9]);
        chartLabels.push(Object.keys(champion['stats'])[16]);
        chartLabels.push(Object.keys(champion['stats'])[19]);
        chartLabels.push(Object.keys(champion['stats'])[3]);

                
        chartContent.push(champion['stats']['hp']);
        chartContent.push(champion['stats']['armor']);
        chartContent.push(champion['stats']['attackrange']);
        chartContent.push(champion['stats']['attackspeed']);
        chartContent.push(champion['stats']['attackdamage']);
        chartContent.push(champion['stats']['mp']);
        chart();

        //PokemonInfo
        $("#name").text(champion['id']);
        $("#image").html(
            '<img src="' + champion["image"]["full"] + '">'
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
                '<p class="type">' +
                champion["tags"][0] +
                    "</p>"
            );
        }
        $("#atack1").text(
            capitalizeFirstLetter(Object.keys(champion['info'])[0])+": "+ champion["info"]["attack"]
        );
        $("#atack2").text(
            capitalizeFirstLetter(Object.keys(champion['info'])[1])+": "+ champion["info"]["defense"]
        );
        $("#atack3").text(
            capitalizeFirstLetter(Object.keys(champion['info'])[2])+": "+ champion["info"]["magic"]
        );
        $("#atack4").text(
            capitalizeFirstLetter(Object.keys(champion['info'])[3])+": "+ champion["info"]["difficulty"]
        );

    }
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
                            suggestedMax: 180,
                            fontColor: "White",
                        },
                    },
                ],
            },
        },
    });
}
