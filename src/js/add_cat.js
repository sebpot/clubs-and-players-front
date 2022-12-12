function addCategory(){
    console.log("Dodaje kategorię");

    let club = {name: document.getElementById("newCatName").value, 
        budget: document.getElementById("newCatBudget").value, 
        yearFounded: document.getElementById("newCatYear").value};

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            window.location.href="/src/view/index.html"
        }
    };
    
    xhttp.open("POST", "http://localhost:8080/api/clubs", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(club));
}