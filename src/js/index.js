function onload(){
    getCategories();
}

function getCategories(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            const catDiv = document.getElementById("categories_div");
            const table = document.createElement('table');
            table.id = 'categories';

            const headerRow = document.createElement('tr');
            for(const header of ['Clubs', 'Actions']) {
                const cell = document.createElement('th');
                cell.innerText = header;
                headerRow.appendChild(cell);
            }
            table.appendChild(headerRow);
            catDiv.appendChild(table);

            const res = JSON.parse(this.responseText);
            res['clubs'].forEach(club => {
                const row = document.createElement('tr');
                const itemCell = document.createElement('td');
                itemCell.innerText = club;
                
                const detButton = document.createElement("button");
                detButton.onclick = function() {
                    window.location.href="/src/view/det_cat.html?cat_id=" + club;
                };
                detButton.innerText = "Details";

                const uptButton = document.createElement("button");
                uptButton.onclick = function() {
                    window.location.href="/src/view/upt_cat.html?cat_id=" + club;
                };
                uptButton.innerText = "Update";

                const delButton = document.createElement("button");
                delButton.onclick = deleteCategory(club);
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
    xhttp.open("GET", "http://localhost:8080/api/clubs", true);
    xhttp.send();
}

function deleteCategory(id){
    return function(){
        console.log("Usuwam kategorię " + id);

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                location.reload();
            }
        };
        
        xhttp.open("DELETE", "http://localhost:8080/api/clubs/" + id, true);
        xhttp.send();
    }
}