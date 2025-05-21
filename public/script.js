const URL = "http://localhost:8080";


(async () => {
    let res = await fetch(URL + "/register", {
        "body": {
            "test": 2
        },
        "method": "POST"
    })
    let json = JSON.parse(await (await res.blob()).text())
    console.log(json);
})();