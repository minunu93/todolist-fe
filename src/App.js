//useEffect는 처음 들어갔을때 뭐할 수 있음 use로 시작된 hook 사용가능
import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Input from "./components/input";
import Todo from "./components/todo";

function App() {
  const baseUrl = "http://localhost:8080"

  //useState안에는 초기에 무슨값으로 넣을지 배열을 넣거나 null을 넣어도 됨
  //입력되는값을 상태로 받기위해서 useState 사용
  //input을 setInput이라는 펑션이 상태를 관리해서 자동으로 바꿀수있게 해줌
  const [input, setInput] = useState("");

  const [todos, setTodos] = useState([]);

  //document ready와 비슷한듯 열렸을때 한번하는듯
  useEffect(() => {
    getTodos();
  }, []);

  //비동기 호출(응답을 받을 때까지 기다림) then은 받아오고 나서 뭘할거냐 catch는 exception발생했을때
  async function getTodos() {
    await axios
      .get(baseUrl + "/todo")
      .then((response) => {
        setTodos(response.data);
        console.log("todos",response.data);
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function insertTodo(e) {
    //form이 onsubmit을 통해 제출하고 새로고침되어야하는데 e.preventDefault로 막는다. 껌뻑이는것을 막는것 같음.
    e.preventDefault();
    const insertTodo = async () => {
      await axios
        .post(baseUrl + "/todo", {
          //입력한값이 use state로 input에 들어가니까
          todoName: input
        })
        .then((response) => {
          //입력 다되면 초기화 시킬려고
          setInput("");

          //다시한번 조회 태우는것인듯
          console.log("data",response);
          // getTodos();
          setTodos(todos => [...todos, response.data])
        })
        .catch((error) => {
          console.error(error);
        })
    }

    //안에다 함수를 만들어준꼴이라서 한번 호출을 해줘야함.
    insertTodo();
  
  }
  
  function updateTodo(id) {
    //put에서 {}은 아무것도 안들어간다 이런뜻인듯.
    const updateTodo = async () => {
      await axios
        .put(baseUrl + "/todo/" + id, {})
        .then((response) => {
          // getTodos();
          
          //todo.id === id 내가 찾고 있는 id랑 같냐
          //...todo 스프레드 오퍼레이터라고해서 기존에 있는것들은 놔두고 뒤에것만 바꿔라
          //DB 자원 아끼기 위해서 위해서 화면에서만 바꿔주려고
          setTodos(
            todos.map((todo) => 
              todo.id === id ? { ...todo, completed: !todo.completed} : todo
            )
          )
        })
        .catch((error) => {
          console.error(error);
        })
    }
    updateTodo(id);
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
        .delete(baseUrl + "/todo/" + id, {})
        .then((response) => {
          //todo.id와 id가 같지 않다면 놔두는것 filter는 같은애를 걸러내는것인듯.
          setTodos(
            todos.filter((todo) => todo.id !== id)
          )
        })
        .catch((error) => {
          console.error(error);
        })
    }
    deleteTodo(id);
  }

  function changeText(e){
    //이 이벤트가 다른짓을 못하도록 막아주는것.
    e.preventDefault();
    //useState에 ""으로되어있으니까 Text를 바꿔도 안바뀌는거임
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <Input handleSubmit={insertTodo} input={input} handleChange={changeText} />

      {
        //todos가 null 아니면 실행해준다
        //key를 지정안해주면 에러남 data-id같은 attribute인듯
        //onclick에서 () => 이표현은 빈함수로 updatetodo를 호출하겠다라는 느낌인듯
        todos 
        ? todos.map((todo) => {
          return (
            <Todo key={todo.id} todo={todo} handleClick={() => updateTodo(todo.id)} handleDelete={() => deleteTodo(todo.id)} />
          )
        }) 
          : null
      }
    </div>
  );
}

export default App;
