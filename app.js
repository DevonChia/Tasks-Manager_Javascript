const newtask = document.querySelector('#task-form'),
        taskinput = document.querySelector('#task'),
        tasks = document.querySelector(".tasks"),
        taskcollection = document.querySelector(".collection"),
        clearbtn = document.querySelector(".clear-btn");

loadEventListeners();

function loadEventListeners(){
    // Load the page with ref to Local Storage data
    document.addEventListener("DOMContentLoaded",reloadTasks);
    newtask.addEventListener("submit",addTask);
    taskcollection.addEventListener("click",removeTask);
    clearbtn.addEventListener("click",removeAllTasksfromLocalStorage);

}

function removeTask(e){
    if (e.target.parentElement.parentElement.parentElement.classList.contains('taskRow')){
        e.target.parentElement.parentElement.parentElement.parentElement.remove()

        var fullword = e.target.parentElement.parentElement.textContent
        var taskname = fullword.slice(0,-5)
        removeTaskfromLocalStorage(taskname);
    }};

function addTask(e){
    if (taskinput.value === ''){
        alert('Add a task!');
    }
    else{
        var li = document.createElement("li");
        var form = document.createElement("form");
        form.className = "taskRow";

        var label = document.createElement("label");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.className = "checker";
        var span = document.createElement("span");
        span.className = "checkboxfont";
        span.style = "color:black";
        var tasktext = document.createTextNode(taskinput.value);
        span.appendChild(tasktext);

        var a = document.createElement("a");
        a.href = "#!";
        a.className = "secondary-content";
        a.innerHTML = '<i class="tiny material-icons" >clear</i>'

        label.appendChild(input);
        label.appendChild(span);
        label.appendChild(a);
        form.appendChild(label);
        li.appendChild(form);
        taskcollection.appendChild(li);

        addTasktoLocalStorage(taskinput.value);

        taskinput.value = '';
        M.toast({html: 'New Task Added!', displayLength: 1000})
        M.updateTextFields();
    }
    e.preventDefault();
}

function reloadTasks(){
    let tasklist = [];
    tasklist = JSON.parse(localStorage.getItem('tasks'));

    tasklist.forEach(function(task){
        var li = document.createElement("li");
        var form = document.createElement("form");
        form.className = "taskRow";

        var label = document.createElement("label");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.className = "checker";
        var span = document.createElement("span");
        span.className = "checkboxfont";
        span.style = "color:black";
        var tasktext = document.createTextNode(task);
        span.appendChild(tasktext);

        var a = document.createElement("a");
        a.href = "#!";
        a.className = "secondary-content";
        a.innerHTML = '<i class="tiny material-icons" >clear</i>'

        label.appendChild(input);
        label.appendChild(span);
        label.appendChild(a);
        form.appendChild(label);
        li.appendChild(form);
        taskcollection.appendChild(li);
    })

}

function addTasktoLocalStorage(task){
    let tasklist;
    if (localStorage.getItem('tasks') === null){
        tasklist = [];
    }else{
        tasklist = JSON.parse(localStorage.getItem('tasks'));
    }
    tasklist.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasklist));
}

function removeTaskfromLocalStorage(taskname){
    let tasklist = [];
    tasklist = JSON.parse(localStorage.getItem('tasks'));

    tasklist.forEach(function(task,index){
        if (task === taskname){
            tasklist.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasklist));
}

function removeAllTasksfromLocalStorage(e){
    let tasklist = [];
    localStorage.setItem('tasks',JSON.stringify(tasklist));

    // Get all task elements
    const alltasks = document.querySelectorAll('.taskRow')
    if (alltasks.length !== 0){
        console.log(alltasks.length)
        alltasks.forEach(function(task){
            task.remove();
        })
        M.toast({html: 'All Tasks Removed!', displayLength: 1000})
        M.updateTextFields();
    }else{
        alert('No task to be removed!');
    }
    e.preventDefault();
}
