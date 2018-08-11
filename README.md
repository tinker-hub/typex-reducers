# Typex-Reducers 

<h3> A lightweight decorator & utility for your React Redux reducers 🔥🔥🔥 </h3> 

# Installation 

Typex-Reducers is available on npm:
```
$ npm install typex-reducers
```



# Motivation 

As I'm scratching the surface of Redux.. Going through that switch cases in your reducers.. Sigh. I told myself, we can get better from this right? 
Also, I love creating decorators (it may sound biased) 🤣

Non Typex-Reducers way: 
```
https://redux.js.org/basics/exampletodolist

// ...
const todos = (state = RootState.TodoState = initialState, action: any) => {
  switch (action.type) {
    case TodoActions.Type.ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case TodoActions.Type.TOGGLE_TODO:
      return state.map((todo: any) =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}
​
export default todos
// ...
```
> Just imagine maintaining a lot of those switch cases... Painful 😭 

Typex-Reducers way:

reducer/todo.reducer.ts
```
export class Todos {

  @ActionReducer(TodoActions.Type.ADD_TODO)
  public addTodo (state: RootState.TodoState = initialState, action: any) {
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false
      }
    ]
  }

  @ActionReducer(TodoActions.Type.TOGGLE_TODO)
  public deleteTodo (state: RootState.TodoState = initialState, action: any) {
    return state.map((todo: any) =>
      (todo.id === action.id)
        ? {...todo, completed: !todo.completed}
        : todo
    )
  }
}
```
reducer/index.ts
```
import { TypexReducers } from 'typex-reducers';

import './todo-reducer.ts'; - Note: It is important to load your reducers so Typex will know where your reducers are.


export const initialState: RootState.TodoState = [
  {
    id: 1,
    text: 'Use Redux',
    completed: false
  }
];

export const rootReducer = combineReducers<RootState>({
  todos: TypexReducers(initialState) as any,
  router: routerReducer as any
});

```


> And that's it! A much more maintainable and cleaner ✨✨✨

# Contributing 
Any suggestions on how to improve this is VERY OPEN. Open up a issue. This is just another way of doing something. If you liked it, let's collaborate and make the world a better place 😍


# License 
MIT