// 题目创建以及编辑页面
// 拥有管理员权限才能看到这页,后端也实现了对请求的鉴权
import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
// UI import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Input, Button, Select,Space,Radio,message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// utils
import { useLocation,useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import qs from 'qs'
import { createQuestion,modifyQuestion} from '../../services/question';
import {findRoute} from '../../routers/config'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Form
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function EditQ(props) {
  // 跳转
  let navigate=useNavigate()
  // Form
  const [form] = Form.useForm();

  // 获取url传来的题目id
  let remindword = ''
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))
  let iscreate = 'id' in params?false:true
  if (iscreate) {
    // 创建新题目
    remindword = 'You are creating new question'
  } else {
    // 编辑已有题目
    remindword = 'You are editng question:' + params.id
  }

  // 编辑内容的双向绑定
  let [mdword, setmdword] = useState(remindword)
  function handleEditorChange({ html, text }) {
    // markdown编辑区改动会触发此函数
    // console.log('handleEditorChange',html, text);
    setmdword(text)
  }

    // 表单提交事件
      const onFinish = (values) => {
        if(iscreate){
          createQuestion({
            "content": mdword,
            "isHide": values.switch,
            "name": values.title,
            "questionLevel": values.hard,
            "tags": values.tags
          }).then((e)=>{
            if(e.data.status===1){
              message.success("success")
            }
          })
        }else{
          modifyQuestion({
            "id":params['id'],
            "content": mdword,
            "isHide": values.switch,
            "name": values.title,
            "questionLevel": values.hard,
            "tags": values.tags
          })
        }
        
      };


  return (
    <div>
    <MdEditor
      value={mdword}
      style={{ height: '500px' }}
      renderHTML={text => mdParser.render(text)}
      onChange={handleEditorChange} />
    <Form {...layout} 
    form={form} 
    name="control-hooks" 
    style={{paddingTop:'20px'}}
    onFinish={onFinish}
    initialValues={{'tags':'default1#default2'}}
    >
      <Form.Item 
      name="title" 
      label="Title" 
      rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="hard"
        label="Hard"
        rules={[{ required: true, message: 'Please pick an item!' }]}
      >
        <Radio.Group>
          <Radio.Button value={1}>easy</Radio.Button>
          <Radio.Button value={2}>medium</Radio.Button>
          <Radio.Button value={3}>hard</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item 
      name="switch"
      label="isHide" 
      rules={[{ required: true, message: 'Please pick an item!' }]}
      >
        <Radio.Group>
          <Radio.Button value={true}>hide</Radio.Button>
          <Radio.Button value={false}>visible</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item 
      name='tags'
      label="Tags"
      >
        <Input.TextArea 
        placeholder='dfs#bfs'
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};