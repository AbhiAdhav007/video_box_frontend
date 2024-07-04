
import { Card, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URI } from '../config/constants';
const UserCard = ({ obj }) => {
    const navigate = useNavigate();

    return (
        <Card>
            <Card.Body>
            {obj.user.image_url &&
                <img style={{width: "45px" , height: "42px" ,borderRadius : "50%"}} src={`${BACKEND_URI +  obj.user.image_url}`} alt={obj.user.first_name} className="rounded-circle" />
            }
                <span>{obj.user.first_name}</span>
                <button className="btn btn-link mt-3" onClick={() => navigate(`/user_videos/${obj.user.first_name + '-' + obj.user.last_name}/${obj.user._id}`)}>
                View All
            </button>
            {obj.videos && 
            <div style={{ display: 'flex', overflowY : 'scroll'}}>
                {obj.videos.map((media)=>{
                    return (
                        <div  key={media.title}>
                            <span >
                            <p>Video Title : {media.title}</p>
                            {<video  key={media._id}
                                preload="auto"
                                width="220"
                                height="140"
                                controls
                                >
                                <source src={`${BACKEND_URI + media.video_url}`} type="video/mp4" />
                                ;Your browser does not support the video tag.
                                </video>}
                            </span>
                        </div>
                    )
                })}
            </div>
            }
            </Card.Body>
        </Card>
    );
};

export default UserCard;
