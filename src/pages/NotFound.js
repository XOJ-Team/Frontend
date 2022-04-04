import React from 'react'
//UI

//utils
import { useNavigate } from 'react-router-dom';
import { findRoute } from '../routers/config';

export default function NotFound() {
  const navigate=useNavigate()
  return (
    <div>
      <div style={{textAlign:'center'}}
      ><img src='/404.jpg' width={'250em'}/></div>
      <div
      style={{
      fontSize:"2em",
      textAlign:"center"
      }}>
        Nothing is here
        <br />
        <a onClick={()=>{navigate(findRoute("mainpage"))}}>Back to home</a>
        </div>
    </div>
  )
}

