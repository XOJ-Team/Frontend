import React, { useState } from 'react';
import { Modal } from 'antd';

export default function About(props){

  const handleOk = () => {
    props.setvisible(false)
  };

  const handleCancel = () => {
    props.setvisible(false)

  };

  return (
    <>
      <Modal title="Basic Modal" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
