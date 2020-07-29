const editForm = document.querySelector("#editform")

const editSessionBtn = document.querySelector("#editsessionbtn")

editSessionBtn.onclick = ()=>{
    editForm.style.display = "flex";
    editForm.style.flexDirection = "column";
}