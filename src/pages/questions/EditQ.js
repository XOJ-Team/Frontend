// 题目创建以及编辑页面
import React from 'react';
import * as ReactDOM from 'react-dom';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// utils
import { useLocation } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', text);
}
export default function EditQ(props){
    let location=useLocation()
    console.log(location)
    console.log(props)
  return (
    <MdEditor text={'You are editing question: '} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
  );
};