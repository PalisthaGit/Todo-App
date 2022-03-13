import React, {useEffect} from 'react'

const Alert = ({msg, showAlert, list}) => {
    // remove alert every 3000 seconds
  useEffect(()=>{
    setTimeout(()=>{
      showAlert();
    }, 3000)
  }, [list])

  return (
    <div>{msg}</div>
  )
}

export default Alert