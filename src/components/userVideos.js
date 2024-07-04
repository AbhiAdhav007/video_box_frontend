import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URI } from '../config/constants';

const UserVideos = () => {
    
    const {user_id} = useParams()
    const [medias , setMedias] = useState([])
    useEffect(()=>{
        const getAllMedias = async () => {

            try {
            const {data} =  await axios.get(`${BACKEND_URI}/api/media/all/${user_id}`,);
            setMedias(data)
            console.log(data);
            } catch (error) {
                console.error('Error in getting videos:', error);
            }
        };
        getAllMedias();
    } , [])
   
    return(
        <>
            <h1>User Videos</h1>
            <table>
                <tbody>
                    {medias &&
                    medias.map((media) => {
                        return (
                        <tr key = { media.title}>
                            <td className="container mt-5">
                            <p>Video Title : <b>{media.title}</b></p>
                            {<video key={media._id}
                                    preload="auto"
                                    width="320"
                                    height="240"
                                    controls
                                >
                                    <source src={`${BACKEND_URI + media.video_url}`} type="video/mp4" />
                                    ;Your browser does not support the video tag.
                                </video>}
                                <p><h5>Description :</h5> {media.description}</p>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
};

export default UserVideos;
