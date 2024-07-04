import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [videos, setVideos] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    // for (let key in videos) {
    //   formData.append("videos", videos[key]);
    // }
    formData.append("videos", videos);
    formData.append('description', description);
    formData.append("title", title);
    formData.append('token' , localStorage.getItem('token')); 

    try {
      const resp = await axios.post(`${BACKEND_URI}/api/media/upload_video` , formData);
      console.log(resp);
      // getAllMedias();
      alert(resp.data.message);
    } catch (error) {
      alert("Error happened!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4"
            onChange={(e) => {
              setVideos(e.target.files[0]);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;