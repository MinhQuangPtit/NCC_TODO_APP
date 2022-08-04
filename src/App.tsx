import React, { useCallback, useEffect, useMemo, useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./models/Todo.model";
import {TodoListAPI} from "./api/Axios";
import Filter, { EStatus } from "./components/Filter";

function App(): React.ReactElement {
	const todoAPI = new TodoListAPI();
	const [todos, setTodos] = useState<Todo[]>([]);
	const [activeStatus, setActiveStatus] = useState<EStatus>(EStatus.ACTIVE)
	const [editItem, setEditItem] = useState<Todo | null>(null)
	const [timeDate,setTimeDate] = useState<Todo | null>(null)
	const init = useCallback(async() => {
		try {
			let data = await todoAPI.get();
			setTodos(data.data);
		} catch (error) {
			
		}
	}, [])

	useEffect(() =>{
		init();
	}, [])

	const todoAddHandler = useCallback(async(text, time, completed=false) => {
		try {
			setTimeDate(time);
			await todoAPI.add({ text,completed,time });
			init()
		} catch (error) {
			
		}
		
	}, [])
	
	const getFilteredTodos = (todos: Todo[], status: EStatus)=> {
		switch (status) {
			case EStatus.ACTIVE:
				return todos.filter(item => !item.completed)
			case EStatus.COMPLETED:
				return todos.filter(item => item.completed)
			case EStatus.ALL:
				return todos;
			default:
				return todos;	
		}
	}
	const filterTodo = useMemo(() => getFilteredTodos(todos, activeStatus),[todos,activeStatus])	
	const removeTodoHandler = useCallback(async (id) => {
		try {
			await todoAPI.remove(id); 
			init()
		} catch (error) {
			
		}
	}, []);

	const updateTodoHandler =async (item: Todo) => {
		
		try {
			item.completed = false;
			await todoAPI.update(item.id,item); 
			init();
			
		} catch (error) {
			
		}
	}
	const handleEditItem = (item: Todo) => {
			setEditItem(item)
	}

	const completeHandler = async (item: Todo) => {
		try {
			item.completed = true;
			await todoAPI.completed(item.id,item); 
			init();
		} catch (error) {
		}
	}

	return (
		<div className="App">
			<NewTodo onAddTodo={todoAddHandler} editItem={editItem} setEditItem={setEditItem} onUpdate={updateTodoHandler} />
			<Filter activeValue={activeStatus} setActiveValue={setActiveStatus}/>
			<TodoList items={filterTodo} onDeleteTodo={removeTodoHandler} onComplete={completeHandler} handleEditItem={handleEditItem} />
		</div>
	);
}

export default App;
