function onload(){
    getCategories();
}

function getCategories(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            const catDiv = document.getElementById("categories");
            const res = JSON.parse(this.responseText);
            res['clubs'].forEach(club => {
                const item = document.createElement("li");

                const span = document.createElement("span");
                span.innerText = club + "  ";
                item.appendChild(span);

                const detButton = document.createElement("button");
                detButton.onclick = function() {
                    window.location.href="/src/view/det_cat.html?cat_id=" + club;
                };
                detButton.innerText = "Details";
                item.appendChild(detButton);

                const uptButton = document.createElement("button");
                uptButton.onclick = function() {
                    window.location.href="/src/view/upt_cat.html?cat_id=" + club;
                };
                uptButton.innerText = "Update";
                item.appendChild(uptButton);

                const delButton = document.createElement("button");
                delButton.onclick = deleteCategory(club);
                delButton.innerText = "Delete";
                item.appendChild(delButton);
                
                catDiv.appendChild(item);
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