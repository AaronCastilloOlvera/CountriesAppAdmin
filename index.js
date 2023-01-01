// const { default: axios } = require("axios");

const baseUrl = 'http://localhost:7192/'; // Only to test

    axios.get("https://localhost:7192/api/Country/")  //`${baseUrl}/flag/1`)
        .then( response => {
            console.log(response)
        })
        

        