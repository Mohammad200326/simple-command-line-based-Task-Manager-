console.log("Task Manager Menu: ");
console.log("1- Add a task");
console.log("2- View all tasks");
console.log("3- Toggle completion");
console.log("4- Delete a task");
console.log("5- Update a task");
console.log("6- Search in tasks");
console.log("7- Exit");

let tasks = [];

let taskChecked = localStorage.getItem("tasks");
if (taskChecked != null) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
} else {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

let idCounter;
let idChecked = localStorage.getItem("id");
if (idChecked != null) {
  idCounter = parseInt(localStorage.getItem("id"));
} else {
  localStorage.setItem("id", 0);
  idCounter = parseInt(localStorage.getItem("id"));
}

function generateId() {
  return ++idCounter;
}

let input = parseInt(prompt("Choose a number from 1 to 7: "));

while (true) {
  if (!(1 <= input && input <= 7)) {
    console.log("You entered invalid input, please try again");
    input = parseInt(prompt("Choose a number from 1 to 7: "));
  } else {
    switch (input) {
      case 1:
        const taskTitle = prompt("Enter title of task: ");
        if (taskTitle) {
          const newTask = {
            id: generateId(),
            title: taskTitle,
            completed: false,
          };
          tasks.push(newTask);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          localStorage.setItem("id", parseInt(localStorage.getItem("id")) + 1);
          console.log(`"${newTask.title}" Task added successfully`);
        } else {
          console.log("You entered invalid input");
        }
        break;
      case 2:
        console.log("Tasks: ");
        tasks.forEach((task) => {
          console.log(
            `${task.id}- ${task.title}   [${
              task.completed ? "Completed" : "Not Completed"
            }]`
          );
        });
        break;
      case 3:
        console.log("Choose task to toggle");
        tasks.forEach((task) => {
          console.log(
            `${task.id}- ${task.title}   [${
              task.completed ? "Completed" : "Not Completed"
            }]`
          );
        });
        let toggleTaskfound = false;
        let taskNumber = parseInt(prompt("Choose task number: "));
        tasks = tasks.forEach((task) => {
          if (task.id == taskNumber) {
            task.completed = !task.completed;
            toggleTaskfound = true;
            console.log(
              `"${task.title}" become ${
                task.completed ? "Completed" : "Not Completed"
              }`
            );
            localStorage.setItem("tasks", JSON.stringify(tasks));
          }
        });
        if (!toggleTaskfound) {
          console.log("You entered invalid input");
        }
        break;
      case 4:
        console.log("Choose task to delete");
        tasks.forEach((task) => {
          console.log(
            `${task.id}- ${task.title}   [${
              task.completed ? "Completed" : "Not Completed"
            }]`
          );
        });
        let deletedTaskFound = false;
        let deletedTaskNumber = parseInt(
          prompt("Enter number of task you want to delete: ")
        );
        tasks = tasks.filter((task) => {
          if (task.id == deletedTaskNumber) {
            deletedTaskFound = true;
            return false;
          }
          return true;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        if (!deletedTaskFound) {
          console.log("You entered invalid input");
        } else {
          console.log("Deleted success");
        }
        break;
      case 5:
        console.log("Choose task to edit");
        tasks.forEach((task) => {
          console.log(
            `${task.id}- ${task.title}   [${
              task.completed ? "Completed" : "Not Completed"
            }]`
          );
        });
        let editedTaskFound = false;
        let editedTaskNumber = parseInt(
          prompt("Enter number of task you want to edit: ")
        );
        tasks.forEach((task) => {
          if (task.id == editedTaskNumber) {
            let editedTask = prompt("Enter a text: ");
            task.title = editedTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            console.log("Edited success");
            editedTaskFound = true;
          }
        });
        if (!editedTaskFound) {
          console.log("You entered invalid input");
        }
        break;
      case 6:
        let search = prompt("Enter a string you want to search in tasks: ");
        let filteredTasks = tasks.filter((task) => {
          return task.title.includes(search);
        });
        if (filteredTasks.length > 0) {
          filteredTasks.forEach((task) => {
            console.log(
              `${task.id}- ${task.title}   [${
                task.completed ? "Completed" : "Not Completed"
              }]`
            );
          });
        } else {
          console.log("No tasks founded match with your text");
        }
        break;
      case 7:
        console.log("Thank You for using task manager :)");
        break;
      default:
        console.log("You entered invalid input");
        break;
    }
    break;
  }
}
