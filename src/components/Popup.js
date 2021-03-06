import React from 'react';
import { Modal } from 'antd';

/**
 * show the pop up box, 展示弹窗，传入动态参数visible来控制显示与否
 * 使用时直接常显该组件，并向内容组件传入setvisible方法，即可让内容组件控制它本身的显示。
 * 内容组件会触发生命周期
 * @param props.setvisible control the visible of pop up
 * @param props.visible the visible of this box
 * @param props.title the title of pop up
 * @param props.content the content of pop up
 * @param props.width the width of pop up 
 */
export default function Popup(props){

  const handleOk = () => {
    props.setvisible(false)
  };

  const handleCancel = () => {
    props.setvisible(false)

  };

  return (
    <>
    {props.visible?(<Modal 
    width={props.width}
    title={props.title} 
    visible={props.visible} 
    onOk={handleOk} 
    onCancel={handleCancel}>
        {props.content}
      </Modal>):null}
      
    </>
  );
};