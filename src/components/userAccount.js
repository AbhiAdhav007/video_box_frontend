import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert , Modal } from 'react-bootstrap';
import UploadForm from './UploadForm';
import VideoList from "./VideoList";
import ImageUpload from './uploadImage';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URI } from '../config/constants';
const UserDetail = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [bio, setBio] = useState('');
    const [user_bio , setUserBio] = useState('');
    const [bioError, setBioError] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [image_upload, setImageUpload] = useState(false);
    const [medias, setMedias] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URI}/api/user/get_user/${token}`,{
                    headers: {
                    'Authorization': token
                  }});
                if(response.data.user){
                    localStorage.setItem('user_id' , response.data.user._id);
                    setUserBio(response.data.user.bio);
                }
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    
    useEffect(()=>{
        const getAllMedias = async () => {

            try {
                const user_id = localStorage.getItem('user_id');
            const {data} =  await axios.get(`${BACKEND_URI}/api/media/all/${user_id}`);
            setMedias(data)
            console.log(data);
            } catch (error) {
                console.error('Error in getting media:', error);
                setAlertMessage('Error in getting media:');
            }
        };
        getAllMedias();
    } , [])
    const handleBioChange = (e) => {
        if (e.target.value.length > 500) {
            setBioError('Bio cannot exceed 500 words.');
        } else {
            setBioError('');
            setBio(e.target.value);
        }
    };

    const handleBioSubmit = async () => {
        if (bio.length > 500) {
            setAlertMessage('Bio cannot exceed 500 words.');
            return;
        }

        try {
            await axios.put(`${BACKEND_URI}/api/user/add_bio`, { bio , token });
            setAlertMessage('Bio updated successfully.');
            setUserBio(bio);
        } catch (error) {
            console.error('Error updating bio:', error);
            setAlertMessage('Error updating bio.');
        }
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const uploadImage = (flag)=>{
        setImageUpload(flag)
        setShowModal(true);
        console.log(image_upload)
    }
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Upload Data</h2>
            <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/video_listing`)}}>
                Go to Listing
            </button></h4>
            <br/>
            {alertMessage && (
                <Alert variant="info" onClose={() => setAlertMessage(null)} dismissible>
                    {alertMessage}
                </Alert>
            )}
             {user.image_url && <div className="user-image">
                <h5>Profile Picture</h5>
                <img style={{width: "80px" , height: "70px" ,borderRadius : "50%"}} src={`${BACKEND_URI + user.image_url}`} alt={user.first_name} className="rounded-circle" />
            </div>}
            <div className="mb-3">
                <strong>First Name:</strong> {user.first_name}
            </div>
            <div className="mb-3">
                <strong>Last Name:</strong> {user.last_name}
            </div>
            <div className="mb-3">
                <strong>Email:</strong> {user.email}
            </div>
            <div className="mb-3">
                <strong>Mobile Number:</strong> {user.mobile_number}
            </div>
            <div className="mb-3">
                <strong>Bio:</strong> {(user.bio) ? <span>{user_bio} </span>:  "Bio not available pls add..!" }
            </div>
            <div className="form-group">
                <label htmlFor="bio">Bio (max 500 words):</label>
                <textarea
                    className="form-control"
                    id="bio"
                    rows="5"
                    value={bio}
                    onChange={handleBioChange}
                />
                {bioError && <div className="text-danger mt-2">{bioError}</div>}
            </div>
            <button className="btn btn-primary mt-3" onClick={handleBioSubmit} disabled={bioError}>
                Add Bio
            </button>
            <br/>

            <button className="btn btn-link mt-3" onClick={()=>{ uploadImage(true)}}>
                Upload Image
            </button>

            <button className="btn btn-link mt-3" onClick={()=>{ uploadImage(false)}}>
                Upload Video
            </button>

            <div className="col-md-6">
            <div
                className="card"
                style={{
                height: "auto",
                width: "800px",
                margin: "40px",
                border: "1px solid black",
                }}
            >
                <div className="card-body">
                    <VideoList medias={medias} />
                </div>
            </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{image_upload ? 'Upload Image' : 'Upload Video'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {image_upload ? <ImageUpload/> : <UploadForm />}
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-danger mt-3" onClick={handleClose}>
                    Close
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserDetail;
