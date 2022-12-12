let catId;
let eleId;

let eleName;
let eleAge;
let eleClub;

function onload() {
    const params = new URLSearchParams(window.location.search);
    catId = params.get("cat_id");
    eleId = params.get("ele_id");

    eleName = document.getElementById("newEleName");
    eleAge = document.getElementById("newEleAge");
    eleClub = document.getElementById("newEleClub");

    getElement();
}

function getElement() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            console.log(res);

            eleName.value = res.name;
            eleAge.value = res.age;
            eleClub.value = res.club.name;
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/players/" + eleId, true);
    xhttp.send();
}

function uptElement() {
    console.log("Edytuje element");

    let player = { age: eleAge.value ,
        clubName: eleClub.value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            window.location.href="/src/view/det_cat.html?cat_id=" + catId;
        }
    };
    
    xhttp.open("PUT", "http://localhost:8080/api/players/" + eleId, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(player));
}

function cancel() {
    window.location.href="/src/view/det_cat.html?cat_id=" + catId;
}