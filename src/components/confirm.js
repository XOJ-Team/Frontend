// 确认弹窗，需要传入用户确认后的回调函数
import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


// 确认弹窗
const {confirm}=Modal;
// 弹出确认框-危险操作,传入onOkfunc
export function showConfirm(onOkfunc) {
    confirm({
      title: 'Do you Want to delete?',
      icon: <ExclamationCircleOutlined />,
      okType:'danger',
      onOk() {
        onOkfunc()
      },
      onCancel() {
        return
      },
    });
  }