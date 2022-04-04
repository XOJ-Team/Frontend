import React from 'react';
import { Modal } from 'antd';

/**
 * show the pop up box
 * @param props.setvisible control the close of pop up
 * @param props.visible the state of this box
 * @param props.title the title of pop up
 * @param props.content the content of pop up
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
      <Modal title={props.title} visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
        {props.content}
      </Modal>
    </>
  );
};