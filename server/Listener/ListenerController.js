const express = require("express");
const ListenerSchema = require("./ListenerSchema");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const  CreatorPodcastSchema = require("../Creator/CreatorPodcastSchema");
const  WishlistSchema = require("./WishlistSchema");
let SubSchema=require('../Listener/Subscriptions/subscriptionSchema')

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
const upload2 = multer({ storage: storage }).single("file");


const ListenerRegister = (req, res) => {
// console.log(req.body);
 console.log(req.file);
  let image = req.file;
  let listener = new ListenerSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    country: req.body.country,
    image: req.file,
  });
  listener
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "Successfully registered",
        data:response
      });
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json({
          status: 409,
          msg: "Email Id Already Registered",
        });
      } else {
        console.log(err);
        res.json({
          status: 500,
          msg: "error",
        });
      }
    });
};

const ListenerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const listener = await ListenerSchema.findOne({ email: email });
    if (listener) {
      if (listener.password === password) {
        const token = jwt.sign(
          { email: listener.email, password: listener.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res
          .status(200)
          .json({ message: "Login successful", token, id: listener._id, listenername:listener.firstname});
      } else {
        return res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "listener does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//View all Customers
  
const viewListeners=(req,res)=>{
  ListenerSchema.find().exec()
  .then(data=>{
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}

// view Customers finished


const editListenerById=(req,res)=>{

  ListenerSchema.findByIdAndUpdate({_id:req.body.id},{
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    dob: req.body.dob,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    country: req.body.country,
    image: req.file,
    })
.exec().then(data=>{
  res.json({
      status:200,
      msg:"Updated successfully"
  })
}).catch(err=>{
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
// view cust by id
const viewListenerById=(req,res)=>{
  
  ListenerSchema.findById({_id:req.body.id}).exec()
  .then(data=>{

    // console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

const deleteListenerById=(req,res)=>{
  ListenerSchema.findByIdAndDelete({_id:req.params.id}).exec()
  .then(data=>{
    // console.log(data);
    res.json({
        status:200,
        msg:"Data removed successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}
//forgotvPawd Customer by id
const forgotPwd=(req,res)=>{
// console.log(req.body,'uuu');
     
  ListenerSchema.findOneAndUpdate({email:req.body.email},{
       password:req.body.password},{conformpassword:req.body.conformpassword
    })
.exec().then(data=>{
  if(data!=null)
  res.json({
      status:200,
      msg:"password Updated successfully"
  })
  else
  res.json({
    status:500,
    msg:"User Not Found"
   
})
}).catch(err=>{
  console.log(err);
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
const getAllPodcast= async (req, res)=>{

    var response =[];
    var data = await CreatorPodcastSchema.find({});

    if (data) {
      
      for(var i in data) {
        var subscription = await  SubSchema.find({
          listenerid:req.body.lisnterId,
           podcastid: data[i]._id,
           paymentstatus: true,
        })
        if (subscription.length <= 0) {
          response.push(data[i])
        }
      }

      res.json({
        status:200,
        msg:"Data obtained successfully",
        data:response
      })
    } else {
      res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
      })
    }


  CreatorPodcastSchema.find({})
    .then(data=>{
      // console.log(data);
        var count = 0;
        
  }).catch(err=>{
    console.log(err);
      
  })
}
const addToWishlist = async (req, res)=>{
  var data = await WishlistSchema.find({
    listnerId: req.body.listnerId,
    podcastId: req.body.podcastId,
  })
  // console.log(data)
  if (!data.length > 0) {
    let wishlist = await new WishlistSchema({
      listnerId: req.body.listnerId,
      podcastId: req.body.podcastId,
    });
    wishlist
      .save()
      .then((response) => {
        res.json({
          status: 200,
          msg: "saved to wishlist",
          data:response
        });
      })
      .catch((err) => {
          res.json({
            status: 500,
            msg: "error",
          });
      });
  } else {
    res.json({
      status: 400,
      msg: "Already in wishlist",
    });
  }
  
}

const getWishlist=(req, res)=>{
  
  WishlistSchema.find({
    listnerId: req.body.id
  })
  .populate('podcastId')
  .exec()
  .then(data=>{
  if(data!=null) {
    res.json({
      status:200,
      data:data})
  }
  else {
    res.json({
      status:500,
      msg:"No products Found"
    })
  }    
})}


const listenerCollection = async (req, res) => {
  try {
    const listenerCollection = await ListenerSchema.find({});
    const count = listenerCollection.length;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 


module.exports = {
  upload,
  ListenerRegister,
  ListenerLogin,
  deleteListenerById,
  editListenerById,
  viewListenerById,
  forgotPwd,
  viewListeners,
  getAllPodcast,
  addToWishlist,
  getWishlist,
  listenerCollection,
  upload2
};
