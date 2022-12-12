let eleId;
let catId;

let eleName;
let eleAge;
let eleClub;

function onload() {
    const params = new URLSearchParams(window.location.search);
    eleId = params.get("ele_id");
    catId = params.get("cat_id");

    eleName = document.getElementById("eleName");
    eleAge = document.getElementById("eleAge");
    eleClub = document.getElementById("eleClub");

    getElement();
}

function getElement() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            console.log(res);

            eleName.innerText = res.name;
            eleAge.innerText = res.age;
            eleClub.innerText = res.club.name;
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/players/" + eleId, true);
    xhttp.send();
}

function cancel() {
    window.location.href="/src/view/det_cat.html?cat_id=" + catId;
}