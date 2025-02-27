const btnTask = document.querySelector('.app__button--add-task');
const formAddTask =  document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const paragraphDescriptionTask = document.querySelector('.app__section-active-task-description');

const btnRemoveCompleted = document.querySelector('#btn-remover-concluidas');
const btnRemoveAll = document.querySelector('#btn-remover-todas')


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;
let liSelectedTask = null

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
     
    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');
    p.textContent = task.descricao;

    const button = document.createElement('button');
    button.classList.add('app_button-edit');
    const buttonImg = document.createElement('img');
    buttonImg.setAttribute('src', '/imagens/edit.png');
    button.append(buttonImg);

    button.onclick = () => {
        const newDescription = prompt('Qual é o novo nome da tarefa?');
        
        if (newDescription) {
            p.textContent = newDescription;
            task.descricao = newDescription;
            updateTasks(); 
        }
    }


    li.append(svg);
    li.append(p);
    li.append(button);

    if(task.completa) {
        li.classList.add('app__section-task-list-item-complete');
        button.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(Element => {
                    Element.classList.remove('app__section-task-list-item-active')
                })
            if(selectedTask == task) {
                paragraphDescriptionTask.textContent = '';
                selectedTask = null;
                liSelectedTask = null;
                return
            }
            selectedTask = task;
            liSelectedTask = li;
            paragraphDescriptionTask.textContent = task.descricao;
            
            li.classList.add('app__section-task-list-item-active');
    
        }

    }


    return li;
}


btnTask.addEventListener('click', () =>  {
    formAddTask.classList.toggle('hidden');
})

formAddTask.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const task = {
        descricao: textArea.value
    }
    tasks.push(task);
    const elementTask = createTaskElement(task);
    ulTasks.append(elementTask);
    updateTasks();

    textArea.value = '';
    formAddTask.classList.add('hidden');
})

tasks.forEach(task => {
    const elementTask = createTaskElement(task);
    ulTasks.append(elementTask);
});

document.addEventListener('FocoFinalizado', () => {
    if (selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');
        liSelectedTask.querySelector('button').setAttribute('disabled', 'disabled');
        selectedTask.completa = true;
        updateTasks()
    }
});  




const removeTasks = (onlyComplete) => {
    const selector = onlyComplete ?  '.app__section-task-list-item-complete': '.app__section-task-list-item';
    document.querySelectorAll(selector).forEach(element => {
        element.remove()
    })
    tasks = onlyComplete ? tasks.filter(task => !task.completa) : [];
    updateTasks()
}

btnRemoveCompleted.onclick = () => removeTasks(true);
btnRemoveAll.onclick = () => removeTasks(false);