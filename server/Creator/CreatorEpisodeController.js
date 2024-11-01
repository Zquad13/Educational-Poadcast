const CreatorEpisodeSchema = require("./CreatorEpisodeSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const multipleUpload = multer({ storage: storage }).single("files");
const singleupload = multer({ storage: storage }).single('file')
const CreatorEpisode = async (req, res) => {

  let CreatorEpisode = new CreatorEpisodeSchema({
    episodetitle: req.body.episodeTitle,
    episodecount: req.body.episodeCount,
    podcastId: req.body.podcastId,
    audio: req.file
  });
  CreatorEpisode
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "Podcast uploaded Succesfully",
        data: response
      });
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json({
          status: 409,
          msg: "already uploaded",
        });
      }
      else {
        console.log(err);
        res.json({
          status: 500,
          msg: " upload failed",
        });
      }
    });
}

const viewEpisode = (req, res) => {

  CreatorEpisodeSchema.find({}).exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained "
        })
      }
    }).catch(err => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err
      })
    })

}

const viewEpisodeById = (req, res) => {
  const id = req.params.id;

  CreatorEpisodeSchema.findById(id)
    .exec()
    .then((data) => {
      if (data) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        });
      } else {
        res.json({
          status: 400,
          msg: "No data obtained"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Error fetching data",
        Error: err
      });
    });
};




const editEpisode = (req, res) => {
  var id = req.params.id
  var updateObj = {}
  if (req.body.episodeTitle) {
    updateObj.episodetitle = req.body.episodeTitle;
  }
  if (req.body.episodeCount) {
    updateObj.episodecount = req.body.episodeCount;
  }
  if (req.file) {
    updateObj.audio = req.file;
  }

  // console.log(req.file)

  if (updateObj) {
    CreatorEpisodeSchema.findByIdAndUpdate(id, updateObj)
      .exec()
      .then((data) => {
        res.json({
          status: 200,
          msg: "Updated successfully",
          data: data
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Data not Updated",
          Error: err,
        });
      });
  }
}

const DeleteEpisode = (req, res) => {
  id = req.params.id
  CreatorEpisodeSchema.findByIdAndDelete(id
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "deleted successfully",
        data: data
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not deleted",
        Error: err,
      });
    });
}

module.exports = { CreatorEpisode, viewEpisode, singleupload, editEpisode, viewEpisodeById, DeleteEpisode }