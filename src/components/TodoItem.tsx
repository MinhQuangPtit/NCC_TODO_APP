import React from "react";
import { Todo } from "../models/Todo.model";
import "./TodoItem.css";

interface ITodoItem{
    item: { id: string; text: string ; completed: boolean; time: number;};
    onComplete: (item: Todo) => void;
    onDeleteTodo: (id: string) => void;
	handleEditItem: (item: Todo) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
    return (
        <div className="TodoItem">
            <div className="output" >
                <span className="output-text" >{props.item.text}</span>
                <span className="output-time">{new Date(props.item.time).toLocaleString()}</span>
            </div>
            <div className="btn">
                <button onClick={props.onComplete.bind(null ,props.item)} 
                        className="button-26 btn btn-primary" role="button">Completed</button>
                <button className="button-25" onClick={() => props.handleEditItem({...props.item, completed: !props.item.completed})}>
                    EDIT
                </button>
                
                <button onClick={props.onDeleteTodo.bind(null, props.item.id)} className="button-24" role="button">
                    DELETE						
                </button>
            </div>
        </div>
    )
}

export default TodoItem