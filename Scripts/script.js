//Elementos de la pagina principal
const selection = document.getElementById('inputGroupSelect01');
const selection2 = document.getElementById('inputGroupSelect02');
const selection3 = document.getElementById('SelectBottle');
const priceBox = document.getElementById('price');

//Elementos de los modales
const selectionModalBrand = document.getElementById('selectBrand');
const modelAdd = document.getElementById('nameAddModel');
const brand = document.getElementById('nameBrand');
const model = document.getElementById('nameModel');

const selectDeleteBrand = document.getElementById('selectDeleteBrand');
const selectDeleteBrandModel = document.getElementById('selectDeleteBrandModel');
const selectDeleteModel = document.getElementById('selectDeleteModel');


//Los AddeventListener son ejecutados por separado para evitar generar conflictos al seleccionar marcas o modelos
selection.addEventListener('change', (event) => {
    cambioMarca(selection, selection2);
});
selectDeleteBrandModel.addEventListener('change', (event) => {
    cambioMarca(selectDeleteBrandModel, selectDeleteModel);
});


selection2.addEventListener('change', cambioModelo);
selection3.addEventListener('change', getPrice);

function init() {
    fetch('./DB/listfragances.php')
        .then(list => list.text())
        .then(data => {
            ejemplos = data.split('\n');

            selection.innerHTML = `<option>Escoge uno...</option>`;
            selectionModalBrand.innerHTML = `<option>Escoge uno...</option>`;
            selectDeleteBrandModel.innerHTML = `<option>Escoge uno...</option>`;
            selectDeleteBrand.innerHTML = `<option>Escoge uno...</option>`;

            ejemplos.forEach(perfumes => {
                selection.innerHTML += `
                <option>${perfumes}</option>
            `;
                selectionModalBrand.innerHTML += `
                <option>${perfumes}</option>
            `;
                selectDeleteBrand.innerHTML += `
                <option>${perfumes}</option>
            `;
                selectDeleteBrandModel.innerHTML += `
                <option>${perfumes}</option>
            `;
            });
        })

    showClients();
}

function cambioMarca(selectPrimary, select) {
    console.log(select.value);
    select.innerHTML = `<option>Escoge uno...</option>`;

    fetch('./DB/getmodels.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: selectPrimary.value //Envia el valor actual de la marca
    })
        .then(response => response.text()) // Procesar la respuesta como texto
        .then(data => {
            modelos = data.split('\n');

            console.log(modelos[0]);
            if (modelos[0] !== '') {
                select.removeAttribute('disabled');
                modelos.forEach(valores => {
                    select.innerHTML += `
                    <option>${valores}</option> 
                `;
                });
            }
            else {
                select.setAttribute('disabled', '');
                select.innerHTML += `
                <option>No hay valores disponibles</option>
            `;
            }
        })
        .catch(error => console.error('Error al enviar:', error));
}

function cambioModelo() {
    console.log(selection.value);
    selection3.innerHTML = `<option>Escoge uno...</option>`;

    fetch('./DB/getsize.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: selection2.value //Envia el valor actual de la marca
    })
        .then(response => response.text()) // Procesar la respuesta como texto
        .then(data => {
            modelos = data.split('\n');

            console.log(modelos[0]);
            if (modelos[0] !== '') {
                selection3.removeAttribute('disabled');
                modelos.forEach(valores => {
                    selection3.innerHTML += `
                    <option>${valores}</option> 
                `;
                });
            }
            else {
                selection3.setAttribute('disabled', '');
                selection3.innerHTML += `
                <option>No hay valores disponibles</option>
            `;
            }
        })
        .catch(error => console.error('Error al enviar:', error));
}

function getPrice() {
    valores = [selection2.value, Number(selection3.value)];

    fetch('./DB/getprice.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(valores) //Envia el valor actual de la marca
    })
        .then(response => response.text()) // Procesar la respuesta como texto
        .then(data => {
            console.log(data);
            priceBox.value = data;
        })
        .catch(error => priceBox.value = "No disponible");
}

function addBrandModel() {
    cant = [50, 75, 100]
    checklist = [checkFT, checkSF, checkHN];
    inputlist = [inputFT, inputSF, inputHN];
    let product = [brand.value, model.value];

    for (let i = 0; i < checklist.length; i++) {
        const element = checklist[i];

        if (otro(element) && inputlist[i].value !== "" && !isNaN(inputlist[i].value)) {
            product.push(cant[i]);
            product.push(inputlist[i].value);
        }
    }

    if (product.length !== 2) {
        if (brand.value !== "" && model.value !== "") {
            console.log(JSON.stringify(product));
            fetch('./DB/addproduct.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    deleteValue(brand);
                    deleteValue(model);
                    deleteValue(inputFT);
                    deleteValue(inputSF);
                    deleteValue(inputHN);
                    init();
                });

        }
        else {
            alert("Seleccione correctamente los valores y/o elige al menos un precio.");
        }
    }
    else {
        alert("Seleccione al menos un precio.");
    }
}

function addModel() {
    let product = [selectionModalBrand.value, modelAdd.value];
    cant = [50, 75, 100]
    checklist = [checkModelFT, checkModelSF, checkModelHN];
    inputlist = [inputModelFT, inputModelSF, inputModelHN];

    for (let i = 0; i < checklist.length; i++) {
        const element = checklist[i];

        if (otro(element) && inputlist[i].value !== "" && !isNaN(inputlist[i].value)) {
            product.push(cant[i]);
            product.push(inputlist[i].value);
        }
    }
    console.log(JSON.stringify(product));
    if (!selectEmpty(selectionModalBrand) && model.value === "") {
        if (product.length !== 2) {
            fetch('./DB/addmodel.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    deleteValue(modelAdd);
                    deleteValue(inputModelFT);
                    deleteValue(inputModelSF);
                    deleteValue(inputModelHN);
                    init();
                });
        }
        else {
            alert("Seleccione por lo menos un precio.");
        }
    }
    else {
        alert("Inserte el modelo que desea agregar.");
    }

}

function deleteModel() {
    values = [selectDeleteBrandModel.value, selectDeleteModel.value];
    if (!selectEmpty(selectDeleteBrandModel) && !selectEmpty(selectDeleteModel)) {
        fetch('./DB/deletemodel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.text())
            .then(data => {
                console.log("Se ha eliminado");
                init();
            })
    } else {
        alert("Selecciona correctamente los valores.");
    }
}

function deleteBrand() {
    if (!selectEmpty(selectDeleteBrand)) {
        fetch('./DB/deletebrand.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: selectDeleteBrand.value //Envia el valor actual de la marca
        })
            .then(response => response.text())
            .then(data => {
                init();
            })
            .catch(error => console.error('Error al enviar:', error));
    }
    else {
        alert("Selecciona correctamente la marca.");
    }
}

function selectEmpty(select) {
    return select.value === "Escoge uno...";
}

function deleteValue(someObject) {
    someObject.value = "";
}

window.onload = init();