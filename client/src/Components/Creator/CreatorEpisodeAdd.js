import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import "./creator.css";

function CreatorEpisodeAdd() {
  const navigate = useNavigate();
  const { id } = useParams();
  var podcastInfo = id.split(",");

  const [episode, setEpisode] = useState({
    episodeTitle: "",
    episodeCount: "",
    podcastId: podcastInfo[0],
    file: "",
  });

  const handleInputChnage = (a) => {
    const { name, files, value } = a.target;

    if (name === "file" && files.length > 0) {
      const file = files[0];
      if (file.type === "audio/mpeg") {
        setEpisode({ ...episode, file });
      } else {
        alert("Please select a valid audio file (MP3).");
      }
    } else {
      setEpisode({ ...episode, [name]: value });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("creatorid") == null) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that episodeCount is a positive number
    if (episode.episodeCount <= 0) {
      alert("Episode count must be a valid number.");
      return;
    }

    const data = new FormData();
    for (let key in episode) {
      data.append(key, episode[key]);
    }

    axiosInstance
      .post("/uploadepisode", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.msg);
        navigate(`/creatorepisodes/${id}`);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        alert("Couldn't create the episode");
      });
  };

  const handleCancel = () => {
    navigate(`/creatorepisodes/${id}`);
  };

  return (
    <div className="podcast_upload">
      <div className="container">
        <h5 className="text-center mb-5 p-5">Add Episodes</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label className="Creator_Name_label text-light">
                Podcast Name
              </label>
              <input
                type="text"
                className="form-control text-light p-3"
                id="Creator_Name"
                placeholder={podcastInfo[1]}
                value={podcastInfo[1]}
                disabled
                required
              ></input>
              <label className="Creator_Name_label">Episode Title</label>
              <input
                required
                type="text"
                className="form-control text-light p-3"
                id="Creator_Name"
                placeholder="Title"
                name="episodeTitle"
                onChange={handleInputChnage}
              ></input>
              <label className="Creator_Name_label">Episode Count</label>
              <input
                id="Creator_Name"
                type="number"
                className="form-control text-light p-3"
                placeholder="Episode Count"
                name="episodeCount"
                onChange={handleInputChnage}
                required
              ></input>
            </div>
            <div className="col" >

              <label className="Creator_Name_label">Episode Audio MP3</label>
              <div id="audiofile">
                 <input
                type="file"
                className="form-control text-light"
                id=""
                name="file"
                accept=".mp3"
                onChange={handleInputChnage}
                required
              ></input>
              </div>
             
            </div>
          </div>
          <button type="submit" className="btn btn-light ms-3 px-5 mt-5 p-3">
            Upload
          </button>
          <button
            type="reset"
            className="btn btn-secondary ms-3 px-5 mt-5 p-3"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatorEpisodeAdd;
