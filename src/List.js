import React from 'react'

const List = ({list, editItem, deleteItem}) => {
  return (
    <article>
        {

//  looping through list
list.map((item) => {
  //  destructuring item
  const { id, title } = item;
  return (
    // renders todo item 
    <div key ={id}>{title}
      <button type='button' onClick={() => editItem(id)}>Edit</button>
      <button type='button' onClick={() => deleteItem(id)}>Delete</button>
    </div>
  );
})
}
    </article>
  )
}

export default List