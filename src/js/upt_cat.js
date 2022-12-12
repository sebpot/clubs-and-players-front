let catId;

let clubName;
let clubBudget;
let clubYear;

function onload() {
    const params = new URLSearchParams(window.location.search);
    catId = params.get("cat_id");

    clubName = document.getElementById("newCatName");
    clubBudget = document.getElementById("newCatBudget");
    clubYear = document.getElementById("newCatYear");

    getCategory();
}

function getCategory() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            console.log(res);

            clubName.value = res.name;
            clubBudget.value = res.budget;
            clubYear.value = res.yearFounded;
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/clubs/" + catId, true);
    xhttp.send();
}

function uptCategory() {
    console.log("Edytuje kategorię");

    let club = { budget: document.getElementById("newCatBudget").value };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            window.location.href="/src/view/index.html"
        }
    };
    
    xhttp.open("PUT", "http://localhost:8080/api/clubs/" + catId, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(club));
}