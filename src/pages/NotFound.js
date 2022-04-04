import React from 'react'
//UI
import DocumentTitle from 'react-document-title'//动态Title
//utils
import { useNavigate } from 'react-router-dom';
import { findRoute } from '../routers/config';

export default function NotFound() {
  const navigate=useNavigate()
  return (
    <DocumentTitle title='XOJ | Not Found'>
    <div>
      <div style={{textAlign:'center',fontSize:'200px'}}
      >404</div>
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
    </DocumentTitle>
  )
}

