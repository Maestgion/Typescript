import {v4 as uuidV4} from "uuid"



const list = document.querySelector<HTMLUListElement>("#list")

// <HTMLUListElement> : This will enable the list variable to have the default properties of a <ul></ul>. Previously, while hovering over the list it was showing Element | null, it wasn't able to identify the element.
// It enables the typeescript to know the types of the Elements. But, not every functions has the generic syntax to add onto it. E.g. getElementById
// But, we can explicitly do that, like done below!!

const newTaskForm = document.getElementById("new-task-form") as HTMLFormElement | null

const newTaskTitle = document.querySelector<HTMLInputElement>("#new-task-title")

// enum Priority{
//   low="low", 
//   medium="medium",
//   high="high", 
// }

type Task = {
  id: string,
  title: string,
  isCompleted: boolean,
  // taskPriority: {
  //   priority: Priority
  // },
  createdAt: Date

}

const allTasks: Task[] = getTasks()

allTasks.forEach(addTask)

newTaskForm?.addEventListener("submit", (e)=>{
  e.preventDefault();
  console.log("iohh")
  console.log(newTaskTitle)
  if(newTaskTitle?.value == " " || newTaskTitle?.value == null) return


  const newTask: Task ={
    id: uuidV4(),
    title: newTaskTitle.value,
    isCompleted : false,
    // taskPriority: {
    //   priority: Priority.high
    // },
    createdAt: new Date(),
  }

  allTasks.push(newTask)
  saveTasks()

  addTask(newTask)
  console.log(newTask)
  newTaskTitle.value=""


})

function addTask(newTask: Task) {
  const taskListItem = document.createElement("li")
  const taskLabel = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.addEventListener("change", ()=>{
    newTask.isCompleted = checkbox.checked
    saveTasks()
  })
  checkbox.checked = newTask.isCompleted
  taskLabel.append(checkbox, newTask.title)
  taskListItem.append(taskLabel)
  list?.append(taskListItem)
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(allTasks))
}

function getTasks():Task[] {
  const taskData = localStorage.getItem("tasks")
  if(taskData==null)
    return []

  return JSON.parse(taskData)
}
 