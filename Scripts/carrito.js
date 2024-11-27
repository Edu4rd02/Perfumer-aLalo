const nameClient = document.getElementById("nameClient");
const clientsList = document.getElementById("clientsList");
const wishlistTitle = document.getElementById("wishlistTitle");
const listInfo = document.getElementById("listInfo");

var car = [];

function addProduct(){
    if (!selection.value || !selection2.value || !selection3.value || !priceBox.value || !nameClient.value) {
        alert("Selecciona de completamente tu producto");
    }
    else{
        if (car.length===0) {
            car.push(nameClient.value,selection.value,selection2.value,selection3.value,priceBox.value);    
            nameClient.setAttribute("disabled","");
        }else{
            car.push(selection.value,selection2.value,selection3.value,priceBox.value);
        }
    }
}

function payProducts() {
    if (car.length!==0) {
        fetch('./DB/updatesell.php', {
            method: 'POST',
            headers:{
                'Content-Type':'aplicattion/JSON'
            },
            body:JSON.stringify(car)
        })
        .then(response => response.text())
        .then(data =>{
            showClients();
            if (!data) {
                alert("No hay nada en el carrito");
            }
        });
    }
    else{
        alert("No hay productos aún en el carrito.");
    }

    car = [];
    nameClient.removeAttribute("disabled");
    listEmpty();
}

function showWishlist() {
    if (car.length===0) {
        listEmpty();
    }
    else{
        contProducts = 1;
        info = "";
        wishlistTitle.innerHTML = "Carrito de "+car[0];
        for (let i = 1; i < car.length; i+=4) {
            info+=`
                <h3>Producto no.${contProducts}</h3>
            `;
            contProducts = contProducts+1;
                let limite = i+4;
                let infoProducts = i;
                while (infoProducts<limite) {
                    info+=`
                    <li>${car[infoProducts]}</li>
                    `;
                    infoProducts = infoProducts + 1;
                }
        }
        listInfo.innerHTML = info;
    }
}
function listEmpty() {
    wishlistTitle.innerHTML = `Carrito vacío`;
    listInfo.innerHTML = ``;
}
function showClients(){
    fetch('./DB/getmoney.php',)
    .then(response => response.json())
    .then(data =>{
        const parsedData = data.map(item => JSON.parse(item));
        clients = parsedData;
        console.log(clients);

        let table = "";

        clients.forEach(client => {
            table+=`
            <tr>
              <td>${client[0]}</td>
              <td>
                <ul>
                    ${getInformation(client,1)}
                </ul>
              </td>
              <td>
                <ul>
                    ${getInformation(client,2)}
                </ul>
              </td>
              <td>
                <ul>
                    ${getInformation(client,3)}
                </ul>
              </td>
              <td>
                <ul>
                    ${getInformation(client,4)}
                </ul>
              </td>
            </tr>
            `;
        });
        clientsList.innerHTML = table;
    });
}

function getInformation(clients,startIndex) {
    let row = "";
    for (let i = startIndex; i < clients.length; i=i+4) {
        row+=`
            <li>${clients[i]}</li>
        `
    }
    return row;
}