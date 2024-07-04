import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { BACKEND_URI } from '../config/constants';

const ListingPage = ()=>{

    const [videos_data , setVideosData] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URI}/api/media/video_listing/`);
                console.log(response.data)
                setVideosData(response.data.videos_data);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchUserData();
    }, []);
    return (
        <>
            <div className="container mt-5">
                <h2>Listing Page</h2>
                <div className="row">
                    {videos_data.map(obj => (
                        <div key={obj.user._id}>
                            <UserCard obj={obj} />
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
};

export default ListingPage;