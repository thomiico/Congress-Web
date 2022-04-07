"use strict"

data.results[0].members.forEach((results)=>{console.table(results.first_name + " " + results.last_name)});

const membersForState = (funcState) => {
    let filterStates = [];
    funcState.results[0].members.forEach(estado =>{
        if(!filterStates.includes(estado.state)){
            filterStates.push(estado.state);
        };
    });
    console.table(filterStates.sort());
}


/* ---------- */

const membersParty = (array, partido) => {
    let filterByParty = array.results[0].members.filter(miembro => miembro.party === partido)

    filterByParty.forEach(member => {
        console.log(member.first_name + " " + member.last_name + "-" + member.party);
    })
}


console.log("-------------");

const membersState = (array, estado) => {
    let filterByState = array.results[0].members.filter(miembro => miembro.state === estado)

    filterByState.forEach(member => {
        console.log(member.first_name + " " + member.last_name + "-" + member.state);
    })
}


/* Checkboxes */
const form = document.querySelector("form")

form.addEventListener("change", evento => handleForm(evento))

function handleForm(e) {
    // Select y Primer Filtro
    let select = form.querySelector("select")
    let primerFiltro = filtrar(data, select.value, "estado")
    drawTable(primerFiltro, "table-body-member", 1)

    // capturar checkboxes 
    let checkboxes = form.querySelectorAll("input[type='checkbox']")
    // filtra los seleccionados, convirtiendo a "checkboxes" en array
    let arrayCheckboxes = Array.from(checkboxes) 
    // obtengo el filtro de los checkboxes "checkeados"
    let checkboxesSeleccionados = arrayCheckboxes.filter(checkbox => checkbox.checked)
    // obtener los valores de los inputs seleccionados (el valor)
    let valoresSeleccionados = checkboxesSeleccionados.map(checkbox => checkbox.value)

    if(valoresSeleccionados.length === 0){
        valoresSeleccionados.push("")
    }

    let filtradosPorPartido = filtrar(primerFiltro, valoresSeleccionados, "partido")
    drawTable(filtradosPorPartido, "table-body-member", 1)
}

// Dibujar el select con los estados
drawSelect(data.results[0].members)
/* Añadir los OPTION con los estados en el SELECT */
function drawSelect(array){

    let stateList = [];

    let idSelect = document.getElementById("select-states")
    
    array.forEach((estado) => {
        if(!stateList.includes(estado.state))
            stateList.push(estado.state)
    })

    stateList.forEach((estado) => {
        let option = document.createElement('option')
        option.value = estado;
        option.text = estado;

        idSelect.appendChild(option);
    })

}

/* FILTRAR */
function filtrar(array, checkList, partyOrState){
    if(partyOrState == "estado"){
        let auxiliar = []
        let selectValue = checkList;
        array.results[0].members.forEach((miembro) =>{
            miembro.state == selectValue ? auxiliar.push(miembro) : selectValue == "all" ? auxiliar = array.results[0].members : ""
        })
        return auxiliar;
    }
    else if(partyOrState == "partido"){
        let auxiliar = []

        checkList.forEach((opcion) => 
        array.map((miembro) => 
        miembro.party === opcion ? 
        auxiliar.push(miembro) : opcion == "" ? auxiliar = array : ""))
    
        let auxiliar2 = new Set(auxiliar);
        auxiliar = Array.from(auxiliar2);
        console.log(auxiliar)
        return auxiliar;
    }
}

/* Tabla Update */

drawTable(data, "table-body-member", 0);

function drawTable(array, listHTML, bFirst){
    const lista = document.querySelector(`#${listHTML}`);

    // Limpio la lista
    lista.innerHTML = ""

    let arrayNew;
    if(bFirst < 1){
        arrayNew = array.results[0].members
    }else{
        arrayNew = array
    }

    if(array.length === 0){
        let tableItem = document.createElement("tr");

        tableItem.innerHTML = `
        <td>No results found</td>
        <td>No results found</td>
        <td>No results found</td>
        <td>No results found</td>
        <td>No results found</td>
        `;

        lista.appendChild(tableItem);
    }
    else {
        arrayNew.forEach(member => {
            let tableItem = document.createElement("tr");
    
            let realName;
            if(member.middle_name === null){
                realName = `${member.first_name} ${member.last_name}`;
            }else {
                realName = `${member.first_name} ${member.middle_name} ${member.last_name}`;
            }
    
            tableItem.innerHTML = `
            <td><a href="${member.url}" target="_blank">${realName}</a></td>
            <td>${member.party}</td>
            <td>${member.state}</td>
            <td>${member.seniority} years</td>
            <td>${member.votes_with_party_pct} %</td>
            `;
    
            lista.appendChild(tableItem);
        }) 
    }      
}










/* 
let cervezasAmargas = beers.filter(beer => beer.ibu > 50)

function dibujarLista(arrayCervezas, idListaHTML){
    // 1- capturar el elemento donde se van a inyectar los hijos
    const lista = document.querySelector(`#${idListaHTML}`)

    // 2- recorrer el array de datos 
    arrayCervezas.forEach(cerveza => {
        // 3- crear el elemento HTML donde se inyectara la info 
        let listItem = document.createElement("li")

        // 4- inyectar la info en el elemento creado 
        listItem.innerText = `${cerveza.name} - abv: ${cerveza.abv} -
        ibu: ${cerveza.ibu}`

        // 5- Inyectar (o anexar) el elemento nuevo con la info en el padre
        lista.appendChild(listItem)
    })
}

dibujarLista(beers, "lista-completa")
*/


/* 
// capturar checkboxes 
let checkboxes = form.querySelectorAll("input[type='checkbox']")
// filtra los seleccionados 
let arrayCheckboxes = Array.from(checkboxes) 
let checkboxesSeleccionados = arrayCheckboxes.filter(checkbox => checkbox.checked)
// obtener los valores de los inputs seleccionados
let valoresSeleccionados = checkboxesSeleccionados.map(checkbox => checkbox.value)

console.log({
    checkboxes,
    arrayCheckboxes,
    checkboxesSeleccionados,
    valoresSeleccionados
})


let select = form.querySelector("select")
// console.log({radioSeleccionado, optionSeleccionada: select.value})

let filtradosPorParidad = filtrar(numeros, radioSeleccionado) 
let numerosFiltrados = filtrar(filtradosPorParidad, select.value)

dibujarLista(numerosFiltrados, "lista-numeros")


function dibujarLista(array, idLista) {
    const listaNumeros = document.querySelector(`#${idLista}`) 
    listaNumeros.innerHTML = ""

    array.forEach(numero => {
        let listItem = document.createElement("li")
        listItem.innerText = numero 
        listaNumeros.appendChild(listItem)  
    })
}

dibujarLista(numeros, "lista-numeros")
*/

