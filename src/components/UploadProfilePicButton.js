import React, { useState } from 'react'
//UI
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

//utils
import { uploadUserPhotourl } from '../services/userInfo';


function beforeUpload(file) {
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

/**
 * 图片上传，获得图片的url,样式修改要修改其下的.ant-upload-select-picture-card
 * @param props.photourl 图片的url
 * @param props.setphotourl 更改图片的url的回调
 */
export default function UploadProfilePic(props) {
  const [loading, setloading] = useState(false)

  console.log("now photo url is:", props.photourl)

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setloading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      if(info.file.response){
        setloading(false)
        props.setphotourl(info.file.response.obj)
        console.log("photo url has set to: ",info.file.response)
      }
    }
  };

  return (
    <Upload
      name="smfile"
      listType="picture-card"
      className={"avatar-uploader"}
      showUploadList={false}
      action={uploadUserPhotourl}
      method='post'
      withCredentials={true}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {loading ? <LoadingOutlined /> : (
        <div>
          {props.photourl ? <img 
          src={props.photourl} 
          alt="avatar"  
          style={{width:'100%'}} /> : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>)}
        </div>
      )}
    </Upload>
  );
}
