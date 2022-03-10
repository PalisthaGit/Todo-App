import React, {useState} from 'react'

const App = () => {

  // hold input from input box
  const [todo, setTodo] = useState("");

  // hold list of todo
  const [list, setList] = useState([]);

  // to know if we are in editing state
  const [isEditing, setIsEditing] = useState(false);

  // to know which item we are editing
  const [editId, setEditId] = useState();

  const handleSubmit = (e) => {
    // prevents from default actions
    e.preventDefault();
    console.log("handle submit");

    if(todo && isEditing) {

      setList(
        list.map((item)=>{
          if(item.id === editId) {
            return {...item, title: todo};
          }
          return item;
          
        })
      );
      setTodo("");
    }
    else{
       // set id and title to new Item
    const newItem = {id: new Date().getTime().toString(), title: todo};
    // update list
    setList([...list, newItem]);
    }

   
  }
  const editItem = (id) => {
    console.log("edit item");

    // returns the item whose id matches with the id passed
    const specificItem = list.find((item)=>item.id === id);
    setIsEditing(true);
    setTodo(specificItem.title);
    setEditId(id);
  }

  const deleteItem = (id) => {

    // do not include in list if the item id doesnot match the passed id.
    const di = list.filter((item)=>item.id !== id);
     setList(di);

  }
  return (
    // react tag
    <>
      {/* section for form */}
      <section>
        {/* our heading */}
        <h1>Todo List</h1>
        {/* form to take user input */}
        <form onSubmit={handleSubmit}>

          {/* input box */}

          {/* lets you type in the box
          sets the value of todo with the value in box */}
          <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
          <button type="submit">{isEditing ? 'edit' : 'submit'}</button>

        </form>

      </section>
      {
        (list.length > 0) && 
        (<section>
        {
         //  looping through list
          list.map((item)=>{
           //  destructuring item
           const{id, title} = item;
            return (
              <div>{title}
              <button type='button' onClick={()=>editItem(id)}>Edit</button>
              <button type='button' onClick={()=>deleteItem(id)}>Delete</button>
              </div>
            );
          })
        }
        <button className='button' onClick={()=>setList([])}>clear</button>
       </section>)
      }
    
    </>
  )
}

export default App