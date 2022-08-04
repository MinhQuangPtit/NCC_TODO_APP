import React, { useEffect } from "react";
import { Todo } from "../models/Todo.model";
import "./TodoItem.css";
import {
  differenceInSeconds,
  formatDistanceToNowStrict,
  isAfter,
  isBefore,
} from "date-fns";
import toast from "react-hot-toast";
interface ITodoItem {
  item: { id: string; text: string; completed: boolean; time: number };
  onComplete: (item: Todo) => void;
  onDeleteTodo: (id: string) => void;
  handleEditItem: (item: Todo) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const [remainingTime, setRemainingTime] = React.useState(
    formatDistanceToNowStrict(props.item.time)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRemainingTime(formatDistanceToNowStrict(props.item.time));
      if (differenceInSeconds(props.item.time, new Date()) === 30 * 60)
        toast.custom(
          `You have a todo named: ${props.item.text} after 30 minutes`
        );
      if (differenceInSeconds(props.item.time, new Date()) === 5 * 60)
        toast.custom(
          `You have a todo named: ${props.item.text} after 5 minutes`
        );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="TodoItem">
      <div className="output">
        <span className="output-text">{props.item.text}</span>
        <span className="output-time">
          {new Date(props.item.time).toLocaleString()}
        </span>
        {isAfter(props.item.time, new Date()) && <span>{remainingTime}</span>}
        {isBefore(props.item.time, new Date()) && !props.item.completed && (
          <span>incompleted</span>
        )}
      </div>
      <div className="btn">
        <button
          onClick={props.onComplete.bind(null, props.item)}
          className="button-26 btn btn-primary"
        >
          Completed
        </button>
        <button
          className="button-25"
          onClick={() =>
            props.handleEditItem({
              ...props.item,
              completed: !props.item.completed,
            })
          }
        >
          EDIT
        </button>

        <button
          onClick={props.onDeleteTodo.bind(null, props.item.id)}
          className="button-24"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
