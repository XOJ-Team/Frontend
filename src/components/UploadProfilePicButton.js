import React,{useState} from 'react'
//UI
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

//utils
import { uploadUserPhoto } from '../services/userInfo';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }else{
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    }
  return (isJpgOrPng && isLt2M)||Upload.LIST_IGNORE;
}

/**
 * 图片上传，获得图片的url
 * @param props.photourl 图片的url
 * @param props.setphotourl 更改图片的url的回调
 * @param props.className
 * @param props.size
 */
export default function UploadProfilePic(props){
  console.log("now url : "+props.photourl)
  const [loading,setloading]=useState(false)
  function handleChange(info){
    if (info.file.status === 'uploading') {
      setloading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) =>
        {
        setloading(false)
        props.setphotourl(url)
        }
      );
    }
  };

    return (
      <Upload
        name="smfile"
        listType="picture-card"
        className={"avatar-uploader"+" "+props.className}
        showUploadList={false}
        action='http://localhost:8081/user/image'
        method='post'
        withCredentials={true}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        style={{...props.style,width:props.size+"px", height:props.size+"px"}}
      >
        {props.photourl ? <img src={props.photourl} alt="avatar" style={{ width: '100%' }} /> : <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8}}>Upload</div>
      </div>}
      </Upload>
    );
  }
