import React, { useState, useEffect } from "react";
import "./creatoruploadpodcast.css";
import axiosInstance from "../../Baseurl";
import { useNavigate } from "react-router-dom";
import Footer from "../../Pages/Listener/Footer";

function CreatorUploadPage() {
  const [creator, setCreator] = useState();
  const [loading, setLoading] = useState(false);  // Step 1: Add a loading state
  const [CreatorPodcast, setCreatorPodcast] = useState({
    podcastname: "",
    description: "",
    price: "0",
    coverimage: "",
    audio: "",
  });
  const navigate = useNavigate();

  const creatorPodcastChange = (e) => {
    const { name, files, value } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setCreatorPodcast({
          ...CreatorPodcast,
          coverimage: file,
        });
      } else {
        alert("Please select a valid image file (jpg, jpeg, png, svg).");
      }
    } else if (name === "audio" && files.length > 0) {
      const file = files[0];
      if (file.type === "audio/mpeg") {
        setCreatorPodcast({
          ...CreatorPodcast,
          audio: file,
        });
      } else {
        alert("Please select a valid audio file (mp3).");
      }
    } else if (name !== "image" && name !== "audio") {
      setCreatorPodcast({
        ...CreatorPodcast,
        [name]: value,
      });
    }
  };

  const UploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);  // Step 2: Set loading to true before the API call

    let data = new FormData();
    for (let key in CreatorPodcast) {
      if (key !== "coverimage" && key !== "audio") {
        data.append(key, CreatorPodcast[key]);
      }
    }
    data.append("creatorname", localStorage.getItem("creatorname"));
    data.append("files", CreatorPodcast.coverimage);
    data.append("files", CreatorPodcast.audio);
    data.append("creatorId", localStorage.getItem("creatorid"));

    axiosInstance
      .post("/creator_upload_podcast", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.msg);
        setLoading(false);  // Step 2: Set loading to false after the response is received
        navigate("/creatorprofile");
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
        setLoading(false);  // Step 2: Set loading to false if there's an error
      });
  };

  const handleback = () => {
    navigate("/creatorprofile");
  };

  useEffect(() => {
    if (localStorage.getItem("creatorid") !== null) {
      navigate("/creatorupload");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axiosInstance
      .post("/viewCreatorById", { id: localStorage.getItem("creatorid") })
      .then((response) => {
        setCreator(response.data.data);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  }, []);

  return (
    <div className="podcast_upload">
      <div className="container" style={{ minHeight: "500vh" }}>
        <h4 className="text-center  p-5">Upload Podcast</h4>
        <form onSubmit={UploadImage}>
          <div className="row">
            <div className="col">
              <label className="Creator_Name_label">Creator Name</label>
              <input
                name="creatorname"
                type="text"
                className="form-control text-light p-3"
                id="Creator_Name"
                value={creator?.firstname}
                onChange={creatorPodcastChange}
                disabled
              ></input>
              <label className="Creator_Name_label">Podcast Name</label>
              <input
                type="text"
                className="form-control text-light  p-3"
                id="podcast_Name"
                placeholder="Title"
                onChange={creatorPodcastChange}
                name="podcastname"
                required
              ></input>
              <label className="Creator_Name_label">Description</label>
              <textarea
                maxLength="120"
                name="description"
                className="form-control"
                id="description"
                rows={3}
                cols={40}
                onChange={creatorPodcastChange}
                required
              />
            </div>
            <div className="col">
              <label className="Creator_Name_label mb-2">Price</label>
              <input
                type="number"
                className="form-control  p-3 mb-3"
                id="price"
                placeholder="Price"
                onChange={creatorPodcastChange}
                name="price"
                required
              ></input>

              <label className="Creator_Name_label">Cover Image</label>
              <input
                type="file"
                className="form-control"
                id="coverimg"
                accept=".jpg,.jpeg,.png,.svg"
                placeholder=""
                name="image"
                onChange={creatorPodcastChange}
                required
              ></input>

              <label className="Creator_Name_label">Demo Audio</label>
              <input
                accept=".mp3"
                type="file"
                className="form-control  p-3"
                id="audio"
                placeholder=""
                name="audio"
                onChange={creatorPodcastChange}
                required
              ></input>
            </div>
          </div>
          {/* Step 3: Conditional rendering of the Upload button and Loading indicator */}
          {loading ? (
            <div className="loading-indicator ms-5 px-5 py-3">Loading...</div>
          ) : (
            <button type="submit" className="btn btn-light ms-5 px-5 py-3">
              Upload
            </button>
          )}
          <button
            type="reset"
            onClick={handleback}
            className="btn btn-secondary ms-4 px-5 py-3"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatorUploadPage;
