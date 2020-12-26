const express = require("express");
const app = express();
const port = 3000;
const fetch = require("node-fetch");

app.listen(port, () => console.log("listening att " + port));
app.use(express.static("public"));

app.get("/lol", async (request, response) => {
    const api_url =
        "https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Darius?api_key=RGAPI-eb7c8129-7d81-431a-9010-53c64dc1f844";
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});
