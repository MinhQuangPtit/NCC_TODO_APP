import axios from "axios";
import { Todo } from "../models/Todo.model";

const TODOLIST_API = "https://62ccd2f38042b16aa7d41531.mockapi.io/todoapp";

interface ITodoAdd {
  text : string;
  completed: boolean;
  time : number;
}

export class TodoListAPI{
    get(){
      return axios.get(TODOLIST_API + '/todo');
    };

    getById(id: string){
      return axios.get(TODOLIST_API + '/todo/'+id );
    }

    add(todo:ITodoAdd){
      return axios.post(TODOLIST_API + '/todo',todo);
    }

    remove(id: string){
      return axios.delete(TODOLIST_API + '/todo/'+ id);
    }

    update(id: string,todo : Todo){
      return axios.put(TODOLIST_API + '/todo/' + id, todo);
    }

    completed(id: string,todo : Todo){
      return axios.put(TODOLIST_API + '/todo/' + id, todo);
    }


}
