const form = document.querySelector(".search_box form");
const input = document.getElementById("takeInput");
const taskList = document.getElementById("taskList");
const taskProgress = document.getElementById("task-progress");

let totalTasks=0;
let completedTasks=0;
let taskBeingEdited = null;

form.addEventListener('submit',function(e){
    e.preventDefault();
     
    const taskText=input.value.trim();
    if(taskText==="") return;
    
    if(taskBeingEdited ){
      taskBeingEdited.querySelector(".task-text").textContent=taskText;
       taskBeingEdited=null;
       input.value="";
       return;
   }
    
    totalTasks++;

     const task = document.createElement("div");
      task.classList.add("task");

   task.innerHTML=`
   <div class="task-left">
            <input type="checkbox" class="task-check">
             <span class="task-text">${taskText}</span>
            </div>
         <div class="buttons">
            <button class="edit-btn">
            <i class="fas fa-pen-to-square"></i>
         </button>
         <button class="delete-btn">
            <i class="fas fa-trash"></i>
         </button>
         </div>
         `; 


   const checkbox=task.querySelector(".task-check");
   checkbox.addEventListener("change", () =>{
   if(checkbox.checked){
      completedTasks++;
       task.querySelector(".task-text").classList.add("completed");
   } else{
      completedTasks--;
       task.querySelector(".task-text").classList.remove("completed");
   }
   updateProgress();
});

const deleteBtn=task.querySelector(".delete-btn");
deleteBtn.addEventListener("click",() => {
   if(checkbox.checked) completedTasks--;
   totalTasks--;
   task.remove();
   updateProgress();
});

const editBtn=task.querySelector(".edit-btn");
editBtn.addEventListener("click", () =>{
   input.value=task.querySelector(".task-text").textContent;
   taskBeingEdited=task;
   input.focus();
});

taskList.appendChild(task);

input.value="";
updateProgress();
});

function updateProgress(){
   taskProgress.textContent=`${completedTasks}/${totalTasks}`;
}