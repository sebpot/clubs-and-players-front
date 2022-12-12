let catId;

function onload() {
    const params = new URLSearchParams(window.location.search);
    catId = params.get("cat_id");
    document.getElementById("newEleClub").value = catId;
}

function cancel() {
    window.location.href="/src/view/det_cat.html?cat_id=" + catId;
}

function addElement(){
    console.log("Dodaje element");

    let player = {name: document.getElementById("newEleName").value, 
        age: document.getElementById("newEleAge").value, 
        clubName: document.getElementById("newEleClub").value};

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            window.location.href="/src/view/det_cat.html?cat_id=" + catId;
        }
    };
    
    xhttp.open("POST", "http://localhost:8080/api/players", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(player));
}