fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'client_id=tmovhfkqxom9z7xkkx46b9jjzn0s9u&client_secret=almavrosf3t119qu5ezcvetlczl69k&grant_type=client_credentials'
}).then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
