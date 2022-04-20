import React from 'react'
import {message,Upload} from 'antd'

export function beforeUploadPic(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else {
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
  }
