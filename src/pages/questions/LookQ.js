import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
 

export default function LookQ() {
  const [mdword,setmdword] = useState('# This is a header\n\nAnd this is a paragraph')
  return (
  <ReactMarkdown children={mdword} />
  )
}



