import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import Card from "react-bootstrap/Card";

function CreatorEditEpisode({ url }) {
  const [episodeData, seEpisodedData] = useState({});
  const { id } = useParams();
  var episodid = {
    id: id.split(',')[0],
    name: id.split(',')[1]
  }
  console.log(episodid.id, "episoid");

  var podcastInfo = id.split(",");

  const [episode, setEpisode] = useState({
    episodeTitle: "",
    episodeCount: "",
    podcastId: podcastInfo[0],
    file: "",
  });


  useEffect(() => {
    axiosInstance
      .post(`/viewepisodebyid/${episodid.id}`)
      .then((response) => {
        // alert(response.data.msg);
        console.log(response.data.data, "y");
        seEpisodedData(response.data.data); // Correct the function name to setEpisodeData
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  }, [episodid.id]); // Add episodid.id to the dependency array to trigger the effect when it changes

  const navigate = useNavigate();
  // const { id } = useParams();


  const handleInputChnage = (e) => {
    console.log(e.target.value);
    if (e.target.name == "file") {
      setEpisode({ ...episode, file: e.target.files[0] });
    } else {
      setEpisode({ ...episode, [e.target.name]: e.target.value });
    }
  };


  const handleDelete = (e) => {
    e.preventDefault();
    axiosInstance.post(`/deleteepisode/${episodid.id}`)
      .then((response) => {
        console.log(response.data.data, "delete");
        alert(response.data.msg);
        navigate(`/creatorepisodes/${episodeData.podcastId}`)

      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        alert("Can't delete episode");
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // let data = new FormData();
    // for (let key in episode) {
    //   if (key = "file") {
    //     data.append("file", episode[key]);
    //   }
    //   data.append(key, episode[key]);

    // }
    // console.log(episode);
    // data.append("creatorname", localStorage.getItem("creatorname"));
    // data.append("creatorId", localStorage.getItem("creatorid"));

    axiosInstance
      .post(`/editepisode/${episodid.id}`, episode, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }) // Corrected the endpoint URL and added data
      .then((response) => {
        console.log(response.data.data, "y");

        alert(response.data.msg);
        navigate("/creatorprofile");
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        alert("Can't update episode");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("creatorid") == null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="podcast_upload">
        <div className="container">
          <h5 className="text-center mb-5">Edit Episodes</h5>
          <div className="row">
            <div className="col">
              <label className="Creator_Name_label" for="">
                Podcast Name
              </label>
              <input
                type="text"
                class="form-control text-light"
                id="Creator_Name"
                value={episodid.name}
                placeholder={podcastInfo[1]}
                disabled
                onChange={handleInputChnage}
                required
              ></input>
              <label className="Creator_Name_label" for="">
                Episode Title
              </label>
              <input
                required
                type="text"
                class="form-control text-light"
                id="Creator_Name"
                placeholder={episodeData.episodetitle}
                name="episodeTitle"
                onChange={handleInputChnage}
              ></input>
              <label className="Creator_Name_label" for="">
                Episode Count
              </label>
              <input
                id="Creator_Name"
                type="number"
                class="form-control text-light"
                placeholder={episodeData.episodecount}
                name="episodeCount"
                onChange={handleInputChnage}
                required
              ></input>
            </div>
            <div className="col">
              {/*<div style={{ width: "100%" }}>
                <audio controls >
                  <source src={episodeData.audio ? url + episodeData.audio.filename : ''} type="audio/mpeg" />
                  Your browser does not support the audio element.
  </audio></div>*/}
              <label className="Creator_Name_label" for="">
                Episode Audio MP3
              </label>
              <input
                type="file"
                class="form-control"
                id="audiofile"
                placeholder=""
                name="file"
                onChange={handleInputChnage}
                required
              ></input>
            </div>
          </div>
          <button
            className="btn btn-light ms-3 px-5 mt-5"
            onClick={handleSubmit}
          >
            Upload
          </button>
          <button
            className="btn btn-secondary ms-3 px-5 mt-5"
            onClick={handleDelete}
          >
            Delete Episode
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatorEditEpisode;
