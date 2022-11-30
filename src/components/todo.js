function Todo(props) {
    return (
        <div className="todo" key={props.todo.id}>
            <h3>
            <label
                className = {props.todo.completed ? "completed" : null}
                //상위에서 해주기 때문에 handleclick에 넣어줄 필요가 없음 그냥 function 사용할거 정의만하면 되는듯
                onClick={props.handleClick}
            >
            {props.todo.todoName}
            </label>
            <label onClick={props.handleDelete}>&nbsp;&nbsp;&nbsp; ❌</label>
            </h3>
        </div>
        // <div className="todo" key={todo.id}>
        //     <h3>
        //     <label
        //         className = {todo.completed ? "completed" : null}
        //         onClick={() => updateTodo(todo.id)}
        //     >
        //     {todo.todoName}
        //     </label>
        //     <label onClick={() => deleteTodo(todo.id)}>&nbsp;&nbsp;&nbsp; ❌</label>
        //     </h3>
        // </div>
    )
}

export default Todo;