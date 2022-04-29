import React,{useState,useEffect} from 'react'

// antd
import { Row, Col, Divider,Modal,message,Button,Input } from 'antd'

// utils
import { getTestcase,newTestcase,changeTestcase,delTestcase } from '../../services/testcase'



const { TextArea } = Input

/**
 * @param props.visible
 * @param props.setvisible
 * @param questionId
 */
export default function Testcase(props) {
  // testcase列表
  let [tclist, settclist] = useState([])
  // 现在正在操作的数据类型和正在操作的testcase id
  let [theState, settheState] = useState(["create", -1])//create edit remove
  let [CaseResult, setCaseResult] = useState({ case: "", result: "" })

  // 得到最新的usecase
  function getUpdateInfo() {
    // 只在显示弹窗时请求最新testcase
    if (props.visible === true) {
      getTestcase({ questionId: props.questionId }).then((res) => {
        settclist(res.data.obj)
      })
    }
  }

  useEffect(() => {
    settheState(["create", -1])
    setCaseResult({ case: '', result: '' })
    getUpdateInfo()
  }, [props.visible])

  // 清除输入框,回到创建题目状态
  const resetInput=()=>{
    settheState(["create", -1])
    setCaseResult({ case:"", result: ""})
  }

  // 提交testcase
  const submitTestcase = () => {
    switch (theState[0]) {
      case "create":
        newTestcase({
          "questionId": props.questionId,
          "testcase": CaseResult.case,
          "result": CaseResult.result
        }).then((res) => {
          if (res.data.status === 1) {
            message.success(`success ${theState[0]}`)
            // 重新获取case
            getUpdateInfo()
            resetInput()
          }
        })
        return
      case "edit":
        changeTestcase({
          "id": theState[1],
          "testcase": CaseResult.case,
          "result": CaseResult.result
        }).then((res) => {
          if (res.data.status === 1) {
            message.success(`success ${theState[0]}`)
            getUpdateInfo()
            resetInput()
          }
        })
        return
      case "remove":
        delTestcase({
          "id": theState[1]
        }).then((res) => {
          if (res.data.status === 1) {
            message.success(`success ${theState[0]}`)
            getUpdateInfo()
            resetInput()
          }
        })
        return
      default:
        console.log('nothing')
    }
  }

  return (
    <Modal
      title="Test cases"
      visible={props.visible}
      onOk={() => { settheState(""); props.setvisible(false) }}
      onCancel={() => { settheState(""); props.setvisible(false) }}
      width={960}
    >

      {/* 展示区域 */}
      <div style={{ overflow: 'auto', maxHeight: '300px' }}>

        {tclist.map((item) => {
          return (
            <div key={item.id} style={{ borderBottom: '1px dashed gray', position: 'relative' }}>
              <Row>
                <Col span={2}>Testcase:</Col>
                <Col span={9} style={{ whiteSpace: 'pre-wrap' }}>{item.testcase}</Col>
                <Col span={1} />
                <Col span={2}>Result:</Col>
                <Col span={9} style={{ whiteSpace: 'pre-wrap' }}>{item.result}</Col>
                <Col span={1} />
              </Row>
              <Row>
                <Col span={2}>
                  <a
                    onClick={() => {
                      settheState(['remove', item.id])
                      setCaseResult({ case: item.testcase, result: item.result })
                      message.warn("click sumbit to ensure!")
                    }}> remove </a>
                </Col>
                <Col span={2}>
                  <a
                    onClick={() => {
                      settheState(['edit', item.id])
                      setCaseResult({ case: item.testcase, result: item.result })
                    }}> edit </a>
                </Col>
              </Row>
            </div>
          )
        })}
      </div>

      <Divider />
      {/* 修改区域 */}
      <Button onClick={() => {
        setCaseResult({ case: "", result: "" })
        settheState(["create", -1])
      }}>create</Button>

      <br />

      <Row>
        <Col span={2}>Testcase:</Col>
        <Col span={9}>
          <TextArea
            rows={5}
            placeholder='a test case'
            disabled={theState[0] === 'remove'}
            value={CaseResult.case}
            onChange={(e) => { setCaseResult({ ...CaseResult, case: e.target.value }) }}
          /></Col>
        <Col span={1} />
        <Col span={2}>Result:</Col>
        <Col span={9}>
          <TextArea
            rows={5}
            placeholder='result for test case'
            disabled={theState[0] === 'remove'}
            value={CaseResult.result}
            onChange={(e) => { setCaseResult({ ...CaseResult, result: e.target.value }) }}
          /></Col>
        <Col span={1} />
      </Row>

      {function () {
        switch (theState[0]) {
          case "create":
            return 'you are creating case in question ' + props.questionId
          case "edit":
            return 'you are editing case ' + theState[1]
          case "remove":
            return 'you will delete this case ' + theState[1]
          default:
            return <div>nothing</div>
        }
      }()}
      <br />
      <Button type="primary" onClick={submitTestcase}>Sumbit</Button>
    </Modal>
  )
}
