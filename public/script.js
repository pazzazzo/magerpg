import MageAPI from "./MageAPI.js";
let mageAPI = new MageAPI()
mageAPI.register.post({}, (res) => {
    console.log(res);
})