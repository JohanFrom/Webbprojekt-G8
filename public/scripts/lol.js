const banner = document.getElementById("banner");

banner.addEventListener("click", async () => {
    console.log("yolo");

    const api_url = `/lol`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
});
/*
$(document).ready(function () {
    $.ajax({
        url:
            "https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json",
        headers: { Accept: "application/json" },
    }).done(function (data) {
        console.log(data);
    });
});
*/

//Load Pokemons to lists
$(document).ready(function () {
    $.ajax({
        url:
            "https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json",
        headers: { Accept: "application/json" },
    }).done(function (data) {
        console.log(data);
        let i = 0;
        for (const [key, value] of Object.entries(data.data)) {
            console.log(`${key}`);

            document.getElementById("pokemonList").innerHTML +=
                '<a href="#" class="dropdown-item" id="' +
                i +
                '" onclick="pokemonSelectFunc(this.id, 1)">' +
                key +
                "</a>";

            document.getElementById("pokemonListTwo").innerHTML +=
                '<a href="#" class="dropdown-itemTwo" id="' +
                i +
                '" onclick="pokemonSelectFunc(this.id, 2)">' +
                key +
                "</a>";
            i++;
        }
        /*
        for (i = 0; i < Object.keys(data.data).length; i++) {
            console.log(i);
            console.log(data.data[i].id);
            /*
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
        */
    });
});
