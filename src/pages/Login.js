import React,{useState} from 'react'
import {get} from '../utils/request'

export default function Login(){
  const [name,setName]=useState("noname")
  return (
    <div onClick={()=>{
      get("/api/article/see")
      setName("havename")
    }}>Login</div>
  )
}
