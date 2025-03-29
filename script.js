// HTML 요소들 가져오기
const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// 할 일 목록을 저장할 배열
let todos = [];

// 할 일 추가하는 함수
function addTodo() {
    const todoText = input.value.trim();
    if (todoText !== "") {
        const todo = {
            text: todoText,
            completed: false,
        };
        todos.push(todo);
        input.value = "";
        renderTodos();
        Swal.fire('성공!', '할 일이 추가되었습니다!', 'success');  // SweetAlert 추가
    }
}

// 할 일 삭제하는 함수
function deleteTodo(index) {
    Swal.fire({
        title: '정말 삭제하시겠어요?',
        text: "이 작업은 되돌릴 수 없습니다.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            todos.splice(index, 1);
            renderTodos();
            Swal.fire('삭제됨!', '할 일이 삭제되었습니다.', 'success');
        }
    });
}

// 할 일 완료 처리 함수
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// 할 일 목록을 화면에 렌더링하는 함수
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", todo.completed);
        li.classList.add("list-group-item");

        const textNode = document.createTextNode(todo.text);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.onclick = () => deleteTodo(index);

        li.appendChild(textNode);
        li.appendChild(deleteButton);

        li.addEventListener("click", () => toggleComplete(index));

        todoList.appendChild(li);
    });
}

// '추가' 버튼 클릭 시 할 일 추가
addButton.addEventListener("click", addTodo);

// 엔터 키로도 할 일 추가 가능
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

// 처음 로드 시 빈 목록 표시
renderTodos();
