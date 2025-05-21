const URL = "http://localhost:8080";


(async () => {
    let res = await fetch(URL + "/register")
    let json = JSON.parse(await (await res.blob()).text())
    console.log(json);
})();