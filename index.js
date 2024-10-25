
const inputId = document.querySelector('input');
const buttonId = document.querySelector('button');
const boxDiv = document.querySelector('.boxes');
let data = []

buttonId.addEventListener('click', function () {
    console.log(data)
    if(inputId.value.length > 0){
        data.push( {id: Math.random(), name: inputId.value, complete: false, edit: true} )
        uiUpdate()
        inputId.style.border = '0px'
    } else {
        inputId.style.border = '3px solid red'
    }
})
function uiUpdate () {
  boxDiv.innerHTML = ''
  inputId.value = ''
  const stringData = JSON.stringify(data)

  localStorage.setItem('myTodoData', stringData)

  for(let item of data) {
    const listDiv = document.createElement('div');
    const inputCreated = document.createElement('input');
    const completeBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    inputCreated.value = item.name
    listDiv.className = 'son'
    inputCreated.disabled = item.edit
    inputCreated.className = item.complete && 'newDiv'
    inputCreated.addEventListener('change', (e) => console.log(e))
    completeBtn.style.background = item.complete ? '#339966' : ' #e6f2ff'
    completeBtn.textContent = item.complete ? 'Completed' : 'complete'
    editBtn.textContent = item.edit ? 'Edit' : 'Save'
    deleteBtn.textContent = 'Delete'

    deleteBtn.addEventListener('click', () => deletTodo(item.id))
    completeBtn.addEventListener('click', () => complete(item.id))
    editBtn.addEventListener('click', () => {
        if (item.edit == true) {
            editTodo(item.id) 
        } else {
            saveTodo(inputCreated.value, item.id)
        }
    })

    listDiv.appendChild(inputCreated)
    listDiv.appendChild(completeBtn)
    listDiv.appendChild(editBtn)
    listDiv.appendChild(deleteBtn)
    boxDiv.appendChild(listDiv)
  }
}

function deletTodo(id) {
    let array = []
    for(let elem of data) {
        if(elem.id != id) {
           array.push(elem)
       }
   }
   data = array
   uiUpdate()
}
function complete(id) {
    let array = []
    for(let elem of data) {
        if (elem.id == id) {
            elem.complete = !elem.complete
        }
        array.push(elem)
    }
    uiUpdate()
}

function editTodo(id) {
    let array = []
    for(let item of data) {
        if(item.id == id) {
            item.edit = !item.edit
        }
        array.push(item)
    }
    data = array
    uiUpdate()
}
function saveTodo(inputValue, idValue) {
    let array = []
    for(let item of data) {
        if(item.id == idValue) {
            item.name = inputValue
            item.edit = !item.edit
        }
        array.push(item)
    }
    data = array
    uiUpdate()
}

function getLocalData() {
    const stringData = localStorage.getItem('myTodoData')
    if (stringData != null) {
        data = JSON.parse(stringData)
        uiUpdate()
    }
}

getLocalData()


  
