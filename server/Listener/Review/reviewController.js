const express = require("express");
const ListenerreviewSchema = require("./reviewSchema");
const mongoose = require("mongoose");

const listenerReview = (req, res) => {
    console.log(req.body);
    //  console.log(req.file);
      let Reviews = new ListenerreviewSchema({
        feedback: req.body.feedback,
        listenername: req.body.listenername,
        listenerid: req.body.listenerid,
        podcastid: req.body.podcastid,
        creatorid: req.body.creatorid,
        podcastname: req.body.podcastname,
      });
      Reviews
        .save()
        .then((response) => {
          res.json({
            status: 200,
            msg: "Thank you",
            data:response
          });
        })
        .catch((err) => {
          console.log(err)
          if (err.code == 11000) {
            res.json({
              status: 409,
              msg: "Already Given",
            });
          } else {
            res.json({
              status: 500,
              msg: "submit faild",
            });
          }
        });
    };
    
    const getreviewodpodcast = async (req, res) => {
      // console.log(req.body);
      //  console.log(req.file);
      var data = await  ListenerreviewSchema.find({
        podcastid: req.body.id,
      })
      res.json({
        status: 200,
        data:data
      });
      };

      const getCreatorReview = async (req, res) => {
        console.log(req.body.id);
        //  console.log(req.file);
        var data = await  ListenerreviewSchema.find({
          creatorid: req.body.id,
        })
        res.json({
          status: 200,
          data:data
        });
        };
module.exports={listenerReview, getreviewodpodcast,getCreatorReview}