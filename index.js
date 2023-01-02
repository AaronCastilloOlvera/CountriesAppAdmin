
    // Get all values!
    const id = document.getElementById('id-country');
    const name = document.getElementById('name');
    const capital = document.getElementById('capital');
    const flag = document.getElementById('flag');
    const silhouette = document.getElementById('silhouette');
    const population = document.getElementById('population');
    const superficie = document.getElementById('superficie');
    const continent = document.getElementById('continent');
    const pib = document.getElementById('pib');
    const myCodeResp = document.getElementById("my-code");

    //
    const btnGet = document.getElementById("btn-get");
    const btnPut = document.getElementById("btn-put");

    const baseUrl = 'https://localhost:7192/api'; // Only to test

    axios.get(`${baseUrl}/country`)
        .then(response => {
            myCodeResp.value = JSON.stringify(response.data, null, 2);
        });

    // - - - - - - - - - - - - - - - -
    btnGet.addEventListener( ('click'), () => {
        Get(id);
    }) 

    btnPut.addEventListener( ('click'), () => {
        Put(id);
    }) 
    

    //
    function Get(id) {

        if (id === "") {
            // alert("no!")
        }
        else {        
            axios.get(`${baseUrl}/Country/id/${id.value}`)
                .then(response => {
                    myCodeResp.value = JSON.stringify(response.data, null, 2);
                
                    name.value = response.data[0].name;
                    capital.value = response.data[0].capital;
                    flag.value = response.data[0].flag;
                    silhouette.value = response.data[0].silhouette;
                    population.value = response.data[0].population;
                    superficie.value = response.data[0].superficie;
                    continent.value = response.data[0].continent;
                    pib.value = response.data[0].pib;
                });
        }   
    }

    function Put(id) {

        const data =  {
            name: name.value,
            capital: capital.value,
            flag: flag.value,
            silhouette: silhouette.value,
            population: population.value,
            superficie: superficie.value,
            continent: continent.value,
            pib: pib.value
        }
        
        axios.put("https://localhost:7192/api/country/1",data)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
    }
