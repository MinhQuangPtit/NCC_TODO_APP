import React from "react";
import "./TodoList.css";
import { Todo } from "../models/Todo.model";
import TodoItem from "./TodoItem"

interface TodoListProps {
	items: { id: string; text: string ; completed: boolean; time: number;}[];
	onDeleteTodo: (id: string) => void;
	onComplete: (item: Todo) => void;
	handleEditItem: (item: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {

	return (
		<ul>
			{props.items.map((item: Todo) => {
				return (
					<li className={`item ${item.completed===true ? "item-completed" : "item-active" }`} key={item.id}>
						<TodoItem item={item} onComplete ={props.onComplete}  
									onDeleteTodo={props.onDeleteTodo} handleEditItem = {props.handleEditItem}/>
					</li>
				);
			})}
		</ul>
	);
};

export default TodoList;
