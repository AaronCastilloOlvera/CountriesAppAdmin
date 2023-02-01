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

    const main = document.getElementById("tableContainer");

    _getAllCountries()

    updateTable();

    // JS for my Modal
    const modal2 = document.getElementById("modal");
    const btn = document.getElementById("openModalButton");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = () => { 
        modal2.style.display = "block";  
        document.body.style.overflow = "hidden";
    }


    span.onclick = () => { 
        modal2.style.display = "none";
        document.body.style.overflow = "auto";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal2.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }


    function updateTable() {
        
        GetAllCountries().then( data => {
            
            const tbl = document.createElement("table");
            tbl.style = "table-layout:fixed;"
            
            // Table Head
            const title = ["Id","Name","Captial","Flag","Sillhouette", "Action" ]
            const tblHead = document.createElement("thead");
            const row = document.createElement("tr")
            tbl.appendChild(row);

            title.forEach( i => {
                //
                const title = document.createElement("th");
                title.innerHTML = i
                row.appendChild(title)

                //
                tblHead.appendChild(row)
            });
            
           
            // Table Body
            const tblBody = document.createElement("tbody");

            for (let i = 0; i < data.length ; i++) {
            
                const row = document.createElement("tr");
                
                const cell = document.createElement("td");
                cell.innerHTML = data[i].id;
                row.appendChild(cell);

                const cell2 = document.createElement("td");
                cell2.innerHTML = data[i].name;
                row.appendChild(cell2);

                const cell3 = document.createElement("td");
                cell3.innerHTML = data[i].capital;
                row.appendChild(cell3);

                // Flag Image
                const cell4 = document.createElement("td");
                const imageFlag = document.createElement('img');
                imageFlag.src = data[i].flag;
                imageFlag.style = "height: 30px";
                cell4.append(imageFlag);
                row.appendChild(cell4);

                const cell5 = document.createElement("td");
                const imageSill = document.createElement('img')
                imageSill.src = data[i].silhouette
                imageSill.style = "height: 40px";
                cell5.append(imageSill);
                row.appendChild(cell5);              

                const cell6 = document.createElement("td");

                // Edit Button
                const btnEdit = document.createElement("button")
                btnEdit.className = "btn-edit"
                const iEdit = document.createElement("i");
                iEdit.className = "fas fa-edit";
                btnEdit.append(iEdit);

                // Delete Button
                const btnDelete = document.createElement("button")
                btnDelete.className = "btn-delete"
                const iDelete = document.createElement("i");
                iDelete.className = "fas fa-trash";
                btnDelete.append(iDelete);

                cell6.append(btnEdit);
                cell6.append(btnDelete);

                row.appendChild(cell6);     

                // add the row to the end of the table body
                tblBody.appendChild(row);
            }

            tbl.appendChild(tblHead);
            tbl.appendChild(tblBody);
            main.appendChild(tbl);
        
        })

    }

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

    /*
    // - - - - - - - - - - - - - - - -
    btnGet.addEventListener( ('click'), () => {
        _getCountryById();
    }) 

    btnPut.addEventListener( ('click'), () => {
        Put(id);
    }) 
    //
    */
    
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
        
        let url = `https://localhost:7192/api/country/${id.value}`

        axios.put(url ,data)
            .then(response => {
                console.log("!" + response);
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


    


/*    
    <!-- HTML para el botón que abrirá el modal -->
    <button id="btn-modal">Abrir modal</button>

    <!-- HTML para el modal -->
    <div id="modal" style="display: none;">
        <div id="modal-content">
            <div id="modal-header">
                <span id="btn-close">&times;</span>
                <h2>Título del modal</h2>
            </div>
            <div id="modal-body">
                Contenido del modal
            </div>
            <div id="modal-footer">
                <button id="btn-aceptar">Aceptar</button>
                <button id="btn-cancelar">Cancelar</button>
            </div>
        </div>
    </div>

    */