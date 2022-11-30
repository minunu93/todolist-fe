//input이라는 컴포넌트를 만들때 function 식으로 하는거임
function Input(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
            Todo : &nbsp;
            {/* 입력을 하기 위해서는 onchange를 넣고 함수를 넣어야함 */}
            {/* required를 true로 하면 알아서 react에서 입력하라는 warning을 줌 */}
            <input type="text" required={true} value={props.input} onChange={props.handleChange} />
            </label>
            <input type="submit" value="Create" />
        </form>
        // <form onSubmit={insertTodo}>
        //     <label>
        //     Todo : &nbsp;
        //     {/* 입력을 하기 위해서는 onchange를 넣고 함수를 넣어야함 */}
        //     {/* required를 true로 하면 알아서 react에서 입력하라는 warning을 줌 */}
        //     <input type="text" required={true} value={input} onChange={changeText} />
        //     </label>
        //     <input type="submit" value="Create" />
        // </form>
    )
}

export default Input;