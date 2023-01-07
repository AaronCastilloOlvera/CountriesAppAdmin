import { GetCountryById, GetAllCountries, PostCountry } from "./requests.js";

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
    
    _getAllCountries()

    function _getCountryById() {
        if ( Number.isInteger(parseInt(id.value))) {
            GetCountryById(id.value)
                .then( data => {
                    const myCountry = data[0];
                    name.value = myCountry.name;
                    capital.value = myCountry.capital;
                    flag.value = myCountry.flag;
                    silhouette.value = myCountry.silhouette;
                    population.value = myCountry.population;
                    superficie.value = myCountry.superficie;
                    continent.value = myCountry.continent;
                    pib.value = myCountry.pib;
                    myCodeResp.value = JSON.stringify( myCountry, null, 2);            
            })
        }
    }

    function _getAllCountries() {
        GetAllCountries()
            .then( data => {
                myCodeResp.value = JSON.stringify( data, null, 2 ); 
            })
    }

    
    // - - - - - - - - - - - - - - - -
    btnGet.addEventListener( ('click'), () => {
        _getCountryById();
    }) 

    btnPut.addEventListener( ('click'), () => {
        Put(id);
    }) 
    //
    
    function Put(id) {

        const data =  {
            id: parseInt(id.value),
            name: name.value,
            capital: capital.value,
            flag: flag.value,
            silhouette: silhouette.value,
            population: parseInt(population.value),
            superficie: parseInt(superficie.value),
            continent: continent.value,
            pib: parseInt(pib.value)
        }
        
        axios.put("https://localhost:7192/api/country/1",data)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
    }

    // Obtener los elementos del botón y del modal
    const btnModal = document.getElementById('btn-modal');
    const modal = document.getElementById('modal');
    const btnClose = document.getElementById('btn-close');

    // Mostrar el modal al hacer clic en el botón
    btnModal.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Ocultar el modal al hacer clic en el botón de cerrar
    btnClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

