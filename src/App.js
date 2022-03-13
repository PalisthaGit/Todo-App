import React, { useState, useEffect } from 'react'
import Alert from './Alert';
import List from './List';
const App = () => {

  // hold input from input box
  const [todo, setTodo] = useState("");

  // hold list of todo
  const [list, setList] = useState([]);

  // to know if we are in editing state
  const [isEditing, setIsEditing] = useState(false);

  // to know which item we are editing
  const [editId, setEditId] = useState();

  // to display some alert 
  const [alert, setAlert] = useState({ show: false, msg: "" });

  const showAlert = (show=false, msg="") => {
    setAlert(show, msg)
  }
  
  const handleSubmit = (e) => {
    // prevents from default actions
    e.preventDefault();
    console.log("handle submit");

    if (todo && isEditing) {

      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: todo };
            
          }
          return item;
         

        })
      );
      setAlert({ show:true, msg: "item edited" });
      
      
      
    }
    else {
      // set id and title to new Item
      const newItem = { id: new Date().getTime().toString(), title: todo };
      // update list
      setList([...list, newItem]);
      setAlert({ show:true, msg: "item added" });
    }


  }
  const editItem = (id) => {
    console.log("edit item");

    // returns the item whose id matches with the id passed
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setTodo(specificItem.title);
    setEditId(id);
    
  }

  const deleteItem = (id) => {

    // do not include in list if the item id doesnot match the passed id.
    const di = list.filter((item) => item.id !== id);
    setList(di);
    setAlert({ show:true, msg: "item deleted" });

  }
  return (
    // react tag
    <>
      {/* section for form */}
      <section>
        {/* our heading */}
        <h1>Todo List</h1>
        {/* form to take user input */}
        {alert.show &&  <Alert {...alert} list={list} showAlert={showAlert}/>}
        <form onSubmit={handleSubmit}>

          {/* input box */}

          {/* lets you type in the box
          sets the value of todo with the value in box */}
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <button type="submit">{isEditing ? 'edit' : 'submit'}</button>

        </form>

      </section>
      {
        (list.length > 0) &&
        (<section>
          <List list={list}  deleteItem = {deleteItem} editItem={editItem} />
          {/* reset todo list */}
          <button className='button' onClick={() => setList([])}>clear</button>
        </section>)
      }

    </>
  )
}

export default App