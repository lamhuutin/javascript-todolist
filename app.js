// const TODOLIST = 'TODOLIST';
// const NUMBERCOMPLETED = 'NUMBERCOMPLETED';
// let newTask = document.querySelector('input#yourTask');
// let add = document.querySelector('button#addTask');
// const run = () => {
//     add.onclick = e => {
//         addTask();
//         // console.log(1);
//         e.preventDefault();
//     }
//     render();
// }
// const saveData = data => {
//     localStorage.setItem(TODOLIST, JSON.stringify(data));
// }

// const loadData = () => {
//     let data;
//     data = JSON.parse(localStorage.getItem(TODOLIST));
//     data = data ? data : [];
//     return data;
// }
// const saveNumberCompleted = number =>{
//     localStorage.setItem(NUMBERCOMPLETED,JSON.stringify(number));
// }
// const loadNumberCompleted = ()=>{
//     let number;
//     number = JSON.parse(localStorage.getItem(NUMBERCOMPLETED));
//     number = number?number:0;
//     return number;
// }
// const addTask = () => {
//     if (newTask.value) {
//         let task = {
//             task: newTask.value,
//             is_completed: false
//         };
//         let data = loadData();
//         data.push(task);
//         saveData(data);
//         newTask.value = null;
//         render();
//     }
// }
// const deleteTask = (index,is_completed) => {
//     let data = loadData();
//     let count = loadNumberCompleted();
//     if(is_completed === true){
//         count--;
//     }
//     saveNumberCompleted(count);
//     data.splice(index, 1);
//     saveData(data);
//     render();
// }
// const editTask = index => {
//     run();
//     add.textContent = 'EDIT TASK';
//     let data = loadData();
//     newTask.value = data[index].task;
//     document.querySelector('.edit' + index).style.display = 'none';
//     document.querySelector('.delete' + index).style.display = 'none';
//     updateTask(index);
// }
// const updateTask = index => {
//     let data = loadData();
//     add.onclick = (e) => {
//         add.textContent = 'ADD TASK';
//         document.querySelector('.edit' + index).style.display = 'block';
//         document.querySelector('.delete' + index).style.display = 'block';
//         if(newTask.value!=''){
//             data[index].task = newTask.value;
//             saveData(data);
//             newTask.value = null;
//         }     
//         run();
//         e.preventDefault();
//     }
// }
// const render = () => {
//     let data = loadData();
//     if (data) {
//         let html = data.map((value, index) => {
//             return `
//                 <li class="task-item" is_completed=${value.is_completed}>
//                     <span onclick="handleCompleted(${value.is_completed}, ${index})">${value.task}</span>
//                     <div class="task-action">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
//                             stroke="currentColor" class="w-6 h-6 size-icon edit${index}" onclick="editTask(${index})">
//                             <path stroke-linecap="round" stroke-linejoin="round"
//                                 d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
//                         </svg>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
//                             stroke="currentColor" class="w-6 h-6 size-icon delete${index}" onclick="deleteTask(${index},${value.is_completed})">
//                             <path stroke-linecap="round" stroke-linejoin="round"
//                                 d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//                         </svg>
//                     </div>
//                 </li>
//             `
//         })
//         document.querySelector('ul.task').innerHTML = html.join('');
//         let count = loadNumberCompleted();
//         count>0?document.querySelector('span.task-result').textContent = `Yeah, ${count} task completed`:
//         document.querySelector('span.task-result').textContent = null;
//     }
// }
// let handleCompleted = (is_completed,index)=>{
//     let data = loadData();
//     let count = loadNumberCompleted();
//     if(is_completed === false){
//         data[index].is_completed = true;
//         count++;
//     } else {
//         data[index].is_completed = false;
//         count--;
//     }
//     saveNumberCompleted(count);
//     saveData(data);
//     render();
// }
// run();
// localStorage.clear();
// cách 1///////////

const TODOLIST = 'TODOLIST';
const NUMBERCOMPLETED = 'NUMBERCOMPLETED';
const saveData = data => {
    localStorage.setItem(TODOLIST, JSON.stringify(data));
};
const loadData = () => {
    let data = JSON.parse(localStorage.getItem(TODOLIST));
    data = data ? data : [];
    return data;
};

const addTask = task => {
    let data = loadData();
    data = [...data, task];
    saveData(data);
}

const render = () => {
    let data = loadData();
    let html, result, countCompleted;
    result = document.querySelector('span.task-result');
    countCompleted = 0;
    if (data) {
        html = data.map((value, index) => {
            if (value.is_completed === true) {
                countCompleted++;
            };
            return createTaskItem(value, index);
        });
        countCompleted > 0 ? result.innerText = `Yeah, ${countCompleted} task completed` : result.innerText = '';
        document.querySelector('ul.task').innerHTML = html.join('');
    }
};

const createTaskItem = (value, index) => {
    return `
        <li class="task-item" index=${index} is_completed=${value.is_completed}>
            <span onclick="markTaskCompleted(${value.is_completed}, ${index})">${value.task}</span>
            <div class="task-action div-${index}">
                <button onclick="editTask(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 size-icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                </button>
                <button onclick="deleteTask(this,${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 size-icon">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                </button>
            </div>
        </li>
            `
}

const markTaskCompleted = (is_completed, index) => {
    let data = loadData();
    data[index].is_completed = is_completed === false ? true : false;
    saveData(data);
    render();
};

const deleteTask = (element, index) => {
    let data = loadData();
    let deleteConfirm = confirm(`Bạn có thật sự muốn xoá công việc ${data[index].task} không?`);
    if (deleteConfirm === true) {
        data.splice(index, 1);
        saveData(data);
        element.closest('li.task-item').remove(); // cách xoá 1 thẻ li không cần load lại dom
    }
};

const editTask = index => {
    let data = loadData();
    let button = document.querySelector('button#addTask');
    let taskValue = document.querySelector('input#yourTask');
    taskValue.setAttribute('index', index);
    button.textContent = 'EDIT TASK';
    taskValue.value = data[index].task;
};

const updateTask = (task, index) => {
    let taskValue = document.querySelector('input#yourTask');
    let button = document.querySelector('button#addTask');
    let data = loadData();
    data[index].task = task;
    saveData(data);
    taskValue.removeAttribute('index');
    button.textContent = 'ADD TASK';
}

const formAddTask = document.querySelector('form');
formAddTask.addEventListener('submit', (e) => {
    let task;
    let taskValue = document.querySelector('input#yourTask');
    const index = taskValue.getAttribute('index');
    if(taskValue.value === ''){
        alert('Enter Your Task!');
        return false;
    }

    if (index) {
        updateTask(taskValue.value, index);
    } else {
        task = {
            task: taskValue.value,
            is_completed: false
        };
        addTask(task);
    }
    taskValue.value = '';
    render();
    e.preventDefault();
});
document.addEventListener('keyup',(e)=>{
    if(e.which === 27){
        let taskValue = document.querySelector('input#yourTask');
        let button = document.querySelector('button#addTask');
        taskValue.value = '';
        button.textContent = 'ADD TASK';
        taskValue.removeAttribute('index');
    }
    e.preventDefault();
})
render();

