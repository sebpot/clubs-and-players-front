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
            const eleDiv = document.getElementById("elements_div");
            const table = document.createElement('table');
            table.id = 'elements';

            const headerRow = document.createElement('tr');
            for(const header of ['Players', 'Actions']) {
                const cell = document.createElement('th');
                cell.innerText = header;
                headerRow.appendChild(cell);
            }
            table.appendChild(headerRow);
            eleDiv.appendChild(table);

            const res = JSON.parse(this.responseText);
            res['players'].forEach(player => {
                const row = document.createElement('tr');
                const itemCell = document.createElement('td');
                itemCell.innerText = player;

                const detButton = document.createElement("button");
                detButton.onclick = function() {
                    window.location.href="/src/view/det_ele.html?cat_id=" + catId + "&ele_id=" + player;
                };
                detButton.innerText = "Details";

                const uptButton = document.createElement("button");
                uptButton.onclick = function() {
                    window.location.href="/src/view/upt_ele.html?cat_id=" + catId + "&ele_id=" + player;
                };
                uptButton.innerText = "Update";

                const delButton = document.createElement("button");
                delButton.onclick = deleteElement(player);
                delButton.innerText = "Delete";

                const actCell = document.createElement('td');
                actCell.appendChild(detButton);
                actCell.appendChild(uptButton);
                actCell.appendChild(delButton);

                row.appendChild(itemCell);
                row.appendChild(actCell);
                table.appendChild(row);
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