import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { set } from '../redux/notificationSlice'

const Notification = ({ message }) => {
  const dispatch = useDispatch()
  
  dispatch(set(message))
  const msg = useSelector((state) => state.notification.message)
  console.log(`message = ${msg}`)
  return (
    <div>
      <p>{msg}</p>
    </div>
  );
}

export default Notification;
