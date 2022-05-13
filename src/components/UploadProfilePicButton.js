import React, { useState } from 'react'
//UI
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

//utils
import { uploadUserPhotourl } from '../services/userInfo';
import {beforeUploadPic} from '../utils/checkPic'

/**
 * 图片上传，获得图片的url,样式修改要修改其下的.ant-upload-select-picture-card
 * @param props.photourl 图片的url
 * @param props.setphotourl 更改图片的url的回调
 * @param props.enabled 是否可更改
 */
export default function UploadProfilePic(props) {
  const [loading, setloading] = useState(false)
  const enabled=props.enabled||false

  console.log("now photo url is:", props.photourl)

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      message.success("upploading...")
      setloading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      if(info.file.response){
        message.success("success update avator")
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
      beforeUpload={beforeUploadPic}
      onChange={handleChange}
      disabled={!enabled}
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
