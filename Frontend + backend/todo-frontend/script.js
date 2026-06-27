const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList")

addBtn.addEventListener("click", async()=>{
    const title = todoInput.value;

    if(!title)
    {
        return;
    }
    

    const response = await fetch(
        "http://localhost:3000/todo",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title
            })
        }
    );

    const data = await response.json();

    console.log(data);

    todoInput.value = "";
    
    getTodos()


    

})

async function getTodos() {

    const response = await fetch(
        "http://localhost:3000/todo"
    );

    const data = await response.json();

    renderTodos(data.todos)
}

getTodos()

function renderTodos (todos){
    
    todoList.innerHTML = "";

    todos.forEach((todo)=>{

        const li = document.createElement("li");

         li.innerHTML = `
            ${todo.title}

            <div>
                <button onclick = "editTodo(${todo.id}, '${todo.title}')" >
                     Edit
                </button>

                <button onclick = "deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;

        todoList.appendChild(li)
    })
}

const deleteTodo = async(id)=> {
    await fetch(
        `http://localhost:3000/todo/${id}`,
        {
            method:"DELETE"
        }

    );
    getTodos();
}

const editTodo = async(id, oldTitle)=> {
        const newTitle = prompt("Edit Todo", oldTitle);

        if(!newTitle)
        {
            return;
        }

        await fetch(
            `http://localhost:3000/todo/${id}`,{
                method : "PUT",
                headers : {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title:newTitle
                })
            }
        )

        getTodos();

}
