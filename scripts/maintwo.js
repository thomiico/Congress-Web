
let nDemocrats = 0;
let nRepublicans = 0; 
let nIndependents = 0;
let nTotal = 0;

let percentDemocrats = 0;
let percentRepublicans = 0; 
let percentIndependents = 0; 
let percentTotal = 0;

countRepsPercentParty();

function countRepsPercentParty(){

    let array = data.results[0].members
    array.forEach((member) => { 
        if(member.party == "D"){
            nDemocrats++
            percentDemocrats += member.votes_with_party_pct;
        }    
        else if(member.party == "R"){
            nRepublicans++
            percentRepublicans += member.votes_with_party_pct;
        }
        else if(member.party == "ID"){
            nIndependents++
            percentIndependents += member.votes_with_party_pct;
        }
    })

    nTotal = nDemocrats + nRepublicans + nIndependents;

    percentTotal = (percentDemocrats + percentRepublicans + percentIndependents).toFixed(2);
    percentTotal = (percentTotal / nTotal).toFixed(2)
    printTable();
}

function printTable(){
    let tableSelector = document.querySelector(".table-body-count");

    let percentID = 0;
    if(nIndependents !== 0){
        percentID = (percentIndependents / nIndependents).toFixed(2)
    }

    tableSelector.innerHTML = `
    <tr><td>Democrats</td> <td>${nDemocrats}</td> <td>${(percentDemocrats / nDemocrats).toFixed(2)}</td></tr>
    <tr><td>Republicans</td> <td>${nRepublicans}</td> <td>${(percentRepublicans / nRepublicans).toFixed(2)}</td></tr>
    <tr><td>Independents</td> <td>${nIndependents}</td> <td>${percentID}</td></tr>
    <tr><td>Total</td> <td>${nTotal}</td> <td>${percentTotal}</td></tr>
    `;
    console.log(percentTotal)
}


//---------------- task 3 tablas loyalty/attendance ---------------

if(document.getElementById("tabla-attendance"))
{
    function printTableML(reverse){

        let selectorLeast = document.querySelector(".table-least-engaged")
        let selectorMost = document.querySelector(".table-most-engaged")

        let dataArrayB = data.results[0].members.sort((x, y) => {
            if(x.missed_votes_pct < y.missed_votes_pct){
                return 1;
            }
            else if(x.missed_votes_pct > y.missed_votes_pct){
                return -1;
            }else{
                return 0;
            }
        });

        let dataArray = dataArrayB.filter((member) => member.total_votes !== 0)

        if(reverse){
            dataArray = dataArray.reverse();
        }

        let dataArrayLength = 0;
        dataArrayLength = Math.round(dataArray.length*0.1)-1;

        console.log(dataArray);
        console.log(dataArrayLength)
        console.log("-----")
        console.log(dataArray[dataArrayLength-1].first_name,dataArray[dataArrayLength-1].missed_votes_pct)

        while(dataArray[dataArrayLength-1].missed_votes_pct === dataArray[dataArrayLength].missed_votes_pct){
            console.log(dataArrayLength)
            dataArrayLength++;
        }

        console.log(dataArrayLength)

        for(let i = 0; i < dataArrayLength; i++){
            let leastTR = document.createElement("tr");

            let realName;

            if(dataArray[i].middle_name === null){
                realName = `${dataArray[i].first_name} ${dataArray[i].last_name}`;
            }else {
                realName = `${dataArray[i].first_name} ${dataArray[i].middle_name} ${dataArray[i].last_name}`;
            }

            leastTR.innerHTML = `
            <td><a href="${dataArray[i].url}" target="_blank">${realName}<a></td><td>${dataArray[i].missed_votes}</td><td>${dataArray[i].missed_votes_pct}%</td>
            `

            reverse ? selectorMost.appendChild(leastTR) : selectorLeast.appendChild(leastTR);
        }
    }

    printTableML(0)
    printTableML(1)

}
else {

    function printTableLoyal(reverse){

        let selectorLeastL = document.querySelector(".table-least-loyalty")
        let selectorMostL = document.querySelector(".table-most-loyalty")

        let dataArray = data.results[0].members.sort((x, y) => {
            if(x.votes_with_party_pct > y.votes_with_party_pct){
                return 1;
            }
            else if(x.votes_with_party_pct < y.votes_with_party_pct){
                return -1;
            }else{
                return 0;
            }
        });

        //let dataArray = dataArrayB.filter((member) => member.total_votes !== 0)

        if(reverse){
            dataArray = dataArray.reverse();
        }

        let dataArrayLength = Math.round(dataArray.length*0.1);

        console.log(dataArray);
        console.log("-----")
        console.log(dataArray[dataArrayLength-1].first_name,dataArray[dataArrayLength-1].missed_votes_pct)


        while(dataArray[dataArrayLength-1].votes_with_party_pct == dataArray[dataArrayLength].votes_with_party_pct){
            dataArrayLength++
        }

        console.log(dataArrayLength)

        for(let i = 0; i < dataArrayLength; i++){
            let leastTRL = document.createElement("tr");

            let realName;

            if(dataArray[i].middle_name === null){
                realName = `${dataArray[i].first_name} ${dataArray[i].last_name}`;
            }else {
                realName = `${dataArray[i].first_name} ${dataArray[i].middle_name} ${dataArray[i].last_name}`;
            }

            let votesParty = Math.round((dataArray[i].total_votes / 100) * dataArray[i].votes_with_party_pct)
            leastTRL.innerHTML = `
            <td><a href="${dataArray[i].url}" target="_blank">${realName}<a></td><td>${votesParty}</td><td>${dataArray[i].votes_with_party_pct}%</td>
            `

            reverse ? selectorMostL.appendChild(leastTRL) : selectorLeastL.appendChild(leastTRL);
        }
    }

    printTableLoyal(0)
    printTableLoyal(1)

}