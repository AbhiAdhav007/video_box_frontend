import React from "react";
import { BACKEND_URI } from "../config/constants";

const VideoList = ({ medias }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Videos</th>
              <th width="200">Description</th>
            </tr>
          </thead>
          <tbody>
            {medias &&
              medias.map((media) => {
                return (
                  <tr key = { media.title}>
                    <td>
                      <p>Video Title : {media.title}</p>
                      {<video key={media._id}
                            preload="auto"
                            width="320"
                            height="240"
                            controls
                          >
                            <source src={`${BACKEND_URI + media.video_url}`} type="video/mp4" />
                            ;Your browser does not support the video tag.
                          </video>}
                    </td>
                    <td>{media.description}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoList;