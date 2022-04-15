// 题目创建以及编辑页面
// 拥有管理员权限才能看到这页,后端也实现了对请求的鉴权
import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
// UI import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Input, Button, Select,Space,Radio,message,Modal, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
// utils
import { useLocation,useNavigate } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import qs from 'qs'
import { createQuestion,modifyQuestion,selectQuestionId,delQuestion} from '../../services/question';
import { getTestcase,newTestcase,delTestcase,changeTestcase } from '../../services/testcase';
import {findRoute} from '../../routers/config'
import { showConfirm } from '../../components/confirm';
import DocumentTitle from 'react-document-title'//动态Title


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
  // 编辑markdown内容的双向绑定
  let [mdword, setmdword] = useState()

  // 获取url传来的题目id
  let location = useLocation()
  let params = qs.parse(location.search.slice(1))
  let iscreate = 'id' in params?false:true
  // 是否显示test case
  const [isTestcaseVisible, setIsTestcaseVisible] = useState(false);
  // 模拟组件挂载周期函数
  useEffect(()=>{
    if (iscreate) {
      // 新创建题目
      message.success("you are creating new question")
    } else {
      // 编辑已有题目
      // 将现有信息显示
      selectQuestionId(params['id']).then((e)=>{
        if(e.data.status===1){
          setmdword(e.data.obj.content)
          form.setFieldsValue({
            "switch": e.data.obj.isHide,
            "title": e.data.obj.name,
            "hard": e.data.obj.questionLevel,
            "tags": e.data.obj.tags.split("#"),
            "timelimit":e.data.obj.timeLimit,
            "memorylimit":e.data.obj.memoryLimit
          })
        }else{
          message.error("failed")
        }
      })
    }
  },[])
  


  function handleEditorChange({ html, text }) {
    // markdown编辑区改动会触发此函数
    // console.log('handleEditorChange',html, text);
    setmdword(text)
  }

    // 表单提交事件
      const onFinish = (values) => {
        console.log(mdword)
        if(mdword===null || mdword==="" || mdword===undefined){
          message.error("Content can not be null!")
          return
        }
        if(iscreate){
          // 创建新问题
          createQuestion({
            "content": mdword,
            "isHide": values.switch,
            "name": values.title,
            "questionLevel": values.hard,
            "tags": values.tags.join("#"),
            "timeLimit":values.timelimit,
            "memoryLimit":values.memorylimit
          }).then((e)=>{
            if(e.data.status===1){
              message.success("success add")
              navigate(findRoute("questionList"))
            }else{
              message.error(e.data.comment)
            }
          })
        }else{
          // 修改已经有的问题
          modifyQuestion({
            "id":params['id'],
            "content": mdword,
            "isHide": values.switch,
            "name": values.title,
            "questionLevel": values.hard,
            "tags": values.tags.join("#"),
            "timeLimit":values.timelimit,
            "memoryLimit":values.memorylimit
          }).then((e)=>{
            if(e.data.status===1){
              message.success("complete edit")
              navigate(findRoute("questionList"))
            }else{
              message.error(e.data.comment)
            }
          })
        }
        
      };

      // 删除问题
      let deleteThisQ=()=>{
        delQuestion({
          'id':params['id']
        }).then(()=>{
          message.warn("a question has been delete")
          navigate(findRoute("questionList"))
        })
      }

  return (
    <DocumentTitle title="XOJ | Edit">
    <div>
    <MdEditor
      value={mdword}
      style={{ height: '500px',width:'1000px',margin:'auto' }}
      renderHTML={text => mdParser.render(text)}
      onChange={handleEditorChange} />
    <Form {...layout} 
    form={form} 
    name="control-hooks" 
    style={{paddingTop:'20px'}}
    onFinish={onFinish}
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
          <Radio.Button value={0}>easy</Radio.Button>
          <Radio.Button value={1}>medium</Radio.Button>
          <Radio.Button value={2}>hard</Radio.Button>
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
      rules={[{ required: true, message: 'Please input tag!' }]}
      >
        <Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
        </Select>
      </Form.Item>


      <Form.Item 
      name="timelimit" 
      label="time limit" 
      rules={[{ required: true,message: 'Please input timelimit!'  }]}>
        <InputNumber min={0}/>
      </Form.Item>

      <Form.Item 
      name="memorylimit" 
      label="memory limit" 
      rules={[{ required: true,message: 'Please input memorylimit!'  }]}>
        <InputNumber min={0}/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      {iscreate?null:(
      <Form.Item {...tailLayout}>
       <Button onClick={()=>{setIsTestcaseVisible(true)}}>
          View Test Case
        </Button>
      <Button 
      type='primary' 
      danger 
      style={{marginLeft:"50px"}}
      onClick={()=>{
        showConfirm(deleteThisQ)
      }}
      >
        Delete
      </Button>
      </Form.Item>
      )}
    </Form>
    <Testcase 
    visible={isTestcaseVisible} 
    setvisible={setIsTestcaseVisible} 
    questionId={params['id']} />
    </div>
    </DocumentTitle>
  );
};

function Testcase(props) {
  // testcase列表
  let [tclist,settclist]=useState([])
  // 现在正在操作的数据类型和正在操作的testcase id
  let [theState,settheState]=useState(["create",-1])//create edit remove
  let [CaseResult,setCaseResult]=useState({case:"",result:""})

  // 得到最新的usecase
  function getUpdateInfo(){
    // 只在显示弹窗时请求最新testcase
    if(props.visible===true){
      getTestcase({questionId:props.questionId}).then((res)=>{
        settclist(res.data.obj)
      })
    }
  }

  useEffect(()=>{
    settheState(["create",-1])
    setCaseResult({case:'',result:''})
    getUpdateInfo()
  },[props.visible])

  // 提交testcase
  const submitTestcase=()=>{
    switch(theState[0]){
      case "create":
        newTestcase({
          "questionId": props.questionId,
          "testcase": CaseResult.case,
          "result": CaseResult.result
        }).then((res)=>{
          if(res.data.status===1){
            message.success(`success ${theState[0]}`)
            // 强制重新打开case界面
            props.setvisible(false)
            props.setvisible(true)
          }
        })
        return
      case "edit":
        changeTestcase({
          "id": theState[1],
          "testcase": CaseResult.case,
          "result": CaseResult.result
        }).then((res)=>{
          if(res.data.status===1){
            message.success(`success ${theState[0]}`)
            props.setvisible(false)
            props.setvisible(true)
          }
        })
        return
      case "remove":
        delTestcase({
          "id": theState[1]
        }).then((res)=>{
          if(res.data.status===1){
            message.success(`success ${theState[0]}`)
            props.setvisible(false)
            props.setvisible(true)
          }
        })
        return 
      default:
        console.log('nothing')
    }
  }

  return (
    <Modal title="Test cases" visible={props.visible} onOk={()=>{settheState("");props.setvisible(false)}} onCancel={()=>{settheState("");props.setvisible(false)}}>

    {tclist.map((item)=>{return (
    <p key={item.id}>case:
    <br />
    {item.testcase}
    <br />
    result:
    <br />
    {item.result}
    <br />
    <a onClick={()=>{
      settheState(['remove',item.id])
      setCaseResult({case:item.testcase,result:item.result})
      message.warn("click sumbit to ensure!")
      }}> remove </a>
    <a onClick={()=>{
      settheState(['edit',item.id])
      setCaseResult({case:item.testcase,result:item.result})
    }}> edit </a></p>)})
    }

    <a onClick={()=>{
      setCaseResult({case:"",result:""})
      settheState(["create",-1])
    }}>create</a>

    <br />

    Test case:
    <Input
    placeholder='a test case'
    disabled={theState[0]==='remove'}
    value={CaseResult.case}
    onChange={(e)=>{setCaseResult({case:e.target.value,result:CaseResult.result})}}
    />
    Result:
    <Input
    placeholder='result for test case'
    disabled={theState[0]==='remove'}
    value={CaseResult.result}
    onChange={(e)=>{setCaseResult({case:CaseResult.case,result:e.target.value})}}
    />
    {function(){
      switch(theState[0]){
      case "create":
        return 'you are creating case in question '+props.questionId
      case "edit":
        return 'you are editing case '+theState[1]
      case "remove":
        return 'you will delete this case '+theState[1]
      default:
        return <div>nothing</div>
    }}()}
    <br />
    <Button type="primary" onClick={submitTestcase}>Sumbit</Button>
    </Modal>
  )
}
