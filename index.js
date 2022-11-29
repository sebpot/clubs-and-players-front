function onload(){
    getCategories();
}

function getCategories(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let catDiv = document.getElementById("categories");
            let res = JSON.parse(this.responseText);
            res['clubs'].forEach(club => {
                let delButton = '<button onclick="onCatClick(\'' + club + '\')">Usuń</button>';
                let c = '<li>' + club + delButton + '</li>';
                catDiv.innerHTML = catDiv.innerHTML + c;
            }); 
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/clubs", true);
    xhttp.send();
}

function onCatClick(id){
    console.log("Usuwam " + id);
    deleteCategorie(id);
}

function deleteCategorie(id){
    let xhttp = new XMLHttpRequest();
    
    xhttp.open("DELETE", "http://localhost:8080/api/clubs/" + id, true);
    xhttp.send();
}
