// 题目创建以及编辑页面
import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// utils
import { useLocation } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import qs from 'qs'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

export default function EditQ(props) {
  // 获取url传来的题目id
  let remindword = ''
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))
  let iscreate = true
  if ('id' in params) {
    // 编辑已有题目
    remindword = 'You are eding question:' + params.id

  } else {
    // 创建新题目
    remindword = 'You are creating question'
  }

  // 编辑内容的双向绑定
  let [mdword, setmdword] = useState(remindword)
  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange',html, text);
    setmdword(text)
  }



  return (
    <MdEditor
      value={mdword}
      style={{ height: '500px' }}
      renderHTML={text => mdParser.render(text)}
      onChange={handleEditorChange} />
  );
};