let catId;

let clubName;
let clubBudget;
let clubYear;

function onload() {
    const params = new URLSearchParams(window.location.search);
    catId = params.get("cat_id");

    clubName = document.getElementById("catName");
    clubBudget = document.getElementById("catBudget");
    clubYear = document.getElementById("catYear");

    document.getElementById("newPlayerLink").href="/src/view/add_ele.html?cat_id=" + catId;

    getCategory();
    getElementsOfCategory();
}

function getCategory() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            const res = JSON.parse(this.responseText);
            console.log(res);

            clubName.innerText = res.name;
            clubBudget.innerText = res.budget;
            clubYear.innerText = res.yearFounded;
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/clubs/" + catId, true);
    xhttp.send();
}

function getElementsOfCategory() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            const eleDiv = document.getElementById("elements");
            const res = JSON.parse(this.responseText);
            console.log(res);

            res['players'].forEach(player => {
                const item = document.createElement("li");

                const span = document.createElement("span");
                span.innerText = player + "  ";
                item.appendChild(span);

                const detButton = document.createElement("button");
                detButton.onclick = function() {
                    window.location.href="/src/view/det_ele.html?cat_id=" + catId + "&ele_id=" + player;
                };
                detButton.innerText = "Details";
                item.appendChild(detButton);

                const uptButton = document.createElement("button");
                uptButton.onclick = function() {
                    window.location.href="/src/view/upt_ele.html?cat_id=" + catId + "&ele_id=" + player;
                };
                uptButton.innerText = "Update";
                item.appendChild(uptButton);

                const delButton = document.createElement("button");
                delButton.onclick = deleteElement(player);
                delButton.innerText = "Delete";
                item.appendChild(delButton);

                eleDiv.appendChild(item);
            }); 
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/players/club/" + catId, true);
    xhttp.send();
}

function deleteElement(id){
    return function(){
        console.log("Usuwam element " + id);

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                location.reload();
            }
        };
        
        xhttp.open("DELETE", "http://localhost:8080/api/players/" + id, true);
        xhttp.send();
    }
}