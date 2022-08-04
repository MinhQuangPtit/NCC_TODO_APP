import React, { useRef,useEffect,useState, useCallback } from "react";
import "./NewTodo.css";
import { Todo } from "../models/Todo.model";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-clock/dist/Clock.css';

interface NewTodoProps {
	onAddTodo: (text: string, milliseconds: number) => void;
	editItem: null | Todo 
	setEditItem: (x: Todo | null) => void
	onUpdate: (item: Todo) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
	const {onAddTodo,editItem,setEditItem,onUpdate} = props
	const textInputRef = useRef<HTMLInputElement>(null);
	const [date, setDate] = useState<Date|null>();
	const [milliseconds,setMilliseconds] = useState<number|null>(new Date().getTime());

	useEffect(() =>{
		if(date != null){
			setMilliseconds(date.getTime())
			console.log(`Date: ${milliseconds}`)
		}
	}, )

	const todoSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const enteredText = textInputRef.current!.value;
		if(editItem && milliseconds)
			{onUpdate({...editItem, text: enteredText,time: milliseconds})
			setEditItem(null);}
		else
			if(milliseconds) onAddTodo(enteredText,milliseconds);
	};

	return (
		<form onSubmit={todoSubmitHandler}>
			<div className="todo-new" >
				<label htmlFor="todo-text" className="todo-app-name" >TODO APP</label>
				<div className="todo-app-input">
					<button type="submit" className={`button-25 ${editItem === null ? "addTodo" : "updateTodo" } `}>{editItem ? "UPDATE" :  "ADD TODO"}</button>
					<input type="text" defaultValue={editItem?.text} className="todo-input" id="todo-text" ref={textInputRef} /><br/>
					<DatePicker className="datepicker"
						placeholderText ='Chọn thời gian'
						selected={date} 
						dateFormat ='dd/MM/yyyy HH:mm'
						showTimeSelect
						onChange={date => setDate(date)} 
						timeIntervals={15}
					/>
				</div>
			</div>
		
		</form>
	);
};

export default NewTodo;
