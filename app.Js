console.log('Welcome to notes app. This is app.js');

//it is a function
showNotes();

//if user adds a note , add it to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
   // console.log(notesObj);
    showNotes();
});

//
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach(function (element, index) { 
       
        html += `  <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text"> ${element.text} </p>
            <button id = "${index}" onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div> `;
    });

// To show notes 
    let notesElm = document.getElementById("notes");
        if (notesObj.length != 0) {
            notesElm.innerHTML = html;
        }
        else{
            notesElm.innerHTML = `nothing to show "Add notes" Through above Note`;
        }   
}


// Function to delete a note
function deleteNote(index) {
//console.log("I am deleting", index);
   let notes = localStorage.getItem("notes");
   if (notes == null){
    notesObj = [];
   }
   else{
    notes.notesObj = JSON.parse(notes);
   }
   notesObj.splice(index, 1);
   localStorage.setItem("notes", JSON.stringify(notesObj));

   showNotes(); 
     
    }

    // for searching Notes:
    let search = document.getElementById("searchTxt")
    search.addEventListener("input",function(){
        
        let inputval = search.value.toLowerCase();
       // console.log('input event fired',inputval);

        let noteCard = document.getElementsByClassName('noteCard');
        Array.from(noteCard).forEach(function(element){
           let cardTxt = element.getElementsByTagName("p")[0].innerText;

           if(cardTxt.includes(inputval)){
            element.style.display = "block";
           }
           else{
            element.style.display = "none";
           }
          // console.log(cardTxt);


        })
    });
    
    /*
    Further feature add:
    1.Add title
    2.mark a notes as important:
    3.sync with server and host:
    */