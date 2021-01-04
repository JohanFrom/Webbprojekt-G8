
const pokemonGoArray= []
let pokemonGoOne
const pokemonPicArray= []

(async function () {

    const api_url = `/go`;
    const response = await fetch(api_url);
    const json = await response.json();
    let check=1;
    let formCheck="Normal";
    for (i = 1; i < Object.keys(json).length; i++) {
        if(json[i]["pokemon_id"] === check && json[i]["form"] === formCheck){
            pokemonGoArray.push(json[i]);
            document.getElementById("pokemonList").innerHTML +=
                '<a href="#" class="dropdown-item" id="' +
                (check-1) +
                '" onclick="pokemonSelectFunc(this.id, 1)">' +
                json[i]["pokemon_name"] +
                "</a>";

            document.getElementById("pokemonListTwo").innerHTML +=
                '<a href="#" class="dropdown-itemTwo" id="' +
                (check-1) +
                '" onclick="pokemonSelectFunc(this.id, 2)">' +
                json[i]["pokemon_name"] +
                "</a>";
                check++;
        }
    }
    console.log(pokemonGoArray)
})();

(async function () {
    const fetcher = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=801"
    );
    const jsonConvert = await fetcher.json();
    for (i = 0; i < Object.keys(jsonConvert).length; i++) {
        const fetcher = await fetch(
            jsonConvert[i]["url"]

        );
        const jsonConvert = await fetcher.json();
        pokemonPicArray[i]= jsonConvert;
    }
    console.log("picArray")
    console.log(pokemonPicArray)
    
    
})();

function getValues(id, nbr) {
    const pokemonGo = pokemonGoArray[id];

    if (nbr === 1) {
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