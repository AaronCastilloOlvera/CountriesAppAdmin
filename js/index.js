import { GetCountryById, GetAllCountries } from "./requests.js";
    
    GetAllCountries().then( mydata => { 

        $(document).ready(function () {
            $('#table_id').DataTable({
                data: mydata,
                columns: [

                    { data: 'id', title: 'Id' },
                    { data: 'name', title: 'Name' },
                    { data: 'capital', title: 'Captial' },
                    {
                        data: 'flag', title: 'Flag' ,
                        render: (data) => {
                            return `<img src=${data}  style=width:40px >`;
                        }
                    },
                    {
                        data: 'silhouette', title: 'Silhouette',
                        render: (data) => {
                            return `<img src=${data}  style=width:40px >`;
                        }
                    },
                    { data: 'continent', title: 'Continent' },
                    { data: 'population', title: 'Population', mask: "#,##0",  },
                    {
                        data: null,
                        title: 'Actions',
                        defaultContent: " <button class='btn btn-warning'> " +
                                            '<i class="bi bi-pen text-light" ></i>' +
                                        " </button> " +
                                        " <button class='btn btn-danger'> " + 
                                            '<i class="bi bi-trash3 text-light" ></i>' +
                                        " </button>" 
                    }
                    
                ],
                "columnDefs": [
                    {"className": "dt-center", "targets": "_all"}
                    
                  ], 
            })
        });

    })


    // Obtiene el elemento input
    const inputFile = document.getElementById('inputFile');
    inputFile.addEventListener('change', (event) => {
       
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const array = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            console.log(array);
        };
        reader.readAsArrayBuffer(file);
    });
    
    function updateTable() {
        
        GetAllCountries().then( data => {
            
            const tbl = document.createElement("table");
            tbl.className = "table table-striped table-hover"
            
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