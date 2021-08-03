//URL API
const API = "https://swapi.dev/api/starships/";

//Obtener los resultados de la api
const getData = (api) => {

    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            pokeData(json.results), paginacion(json);
        })
        .catch((error) => {
            console.log("Error: ", error);
        })

};

// const pokeData

const pokeData = (data) => {

    let html = "";
    document.getElementById("datosNaves").innerHTML = "";
    data.forEach((pj) => {
        const URL = pj.url;
        return fetch(URL)
            .then((response) => response.json())
            .then((json) => {
                llenarDatos(json, html);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    });

};

// Dibujar cards de personajes
const llenarDatos = (data, html) => {

    html += '<div class="col mt-3">';
    html += '<div class="card" style="width: 30rem;">';
    html += '<div class="card-body">';
    html += `<h5 class="card-title">Nombre: ${data.name}</h5>`;
    html += `<p class="card-text">Modelo: ${data.model}</p>`;
    html += `<p class="card-text">Manufacturera: ${data.manufacturer}</p>`;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    document.getElementById("datosNaves").innerHTML += html;

};

//Paginacion
const paginacion = (data) => {

    let prevDisabled = "";
    let nextDisabled = "";
    if (data.previous == null) {
        prevDisabled = "disabled"
    } else {
        prevDisabled = "";
    }
    if (data.next == null) {
        nextDisabled = "disabled"
    } else {
        nextDisabled = "";
    }
    let html = "";
    html += `<li class="page-item ${prevDisabled}"><a class="page-link" onclick="getData('${data.previous}')"> Previous </a></li>`;
    html += `<li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${data.next}')"> Next </a></li>`;
    document.getElementById("paginacion").innerHTML = html;

};

//llamar getData
getData(API);