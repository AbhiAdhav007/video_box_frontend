import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        console.log(img.width , img.height)
        if (img.width <= 500 && img.height <= 500) {
          setFile(selectedFile);
          setMessage('');
        } else {
          setMessage('Image dimensions must be 500x500 pixels');
        }
      };
      img.onerror = () => {
        setMessage('Invalid image file');
      };
      img.src = URL.createObjectURL(selectedFile);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please upload a file');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('token' , token);

    try {
      const res = await axios.put(`${BACKEND_URI}/api/user/upload_image`, formData);
      setMessage(res.data.message);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Error uploading file');
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" className="form-control" onChange={onFileChange} />
        <button className="btn btn-primary mt-2" type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
