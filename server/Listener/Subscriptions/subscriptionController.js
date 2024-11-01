

// Done By Soumya on 20/02

let SubSchema=require('./subscriptionSchema')

// const subscribeCreator=(req,res)=>{
//     console.log(req.body);
//    // console.log(req.files);
//    // res.send("tha")
 
//    // let image = req.file;

//    let subscription = new subscription({
//     listenerid:req.params.listenerid,
//      creatorid: req.body.creatorid,
//      date: req.body.date
     
//    });
//    subscription
   
//      .save()
//      .then((response) => {
//        res.json({
//          status: 200,
//          msg: "Podcast uploaded Succesfully",
//          data:response
//        });
//      })
//      .catch((err) => {
//        if (err.code == 11000) {
//          res.json({
//            status: 409,
//            msg: "already uploaded",
//          });
//        }
//         else {
//          console.log(err);
//          res.json({
//            status: 500,
//            msg: "error",
//          });
//        }
//      });
//  }


 

 const viewSubscriptionById=(req,res)=>{
   
   subscription.findById({_id:req.params.id}).populate('listenerid').populate('creatorid').exec()
   .then(data=>{
 
    //  console.log(data);
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
 
 const viewSubscriptionByListenerId=(req,res)=>{
   
    subscription.find({listenerid:req.params.id}).populate('creatorid')
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
 const viewSubscriptionByCreatorId=(req,res)=>{
   subscription.find({creatorId:req.params.id}).populate('listenerid').exec()
   .then(data=>{
 
    //  console.log(data);
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

 const updatePayment=(req,res)=>{
   
    subscription.findByIdAndUpdate({_id:req.params.id},{paymentstatus:true})
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

// done by ajeena


 const subscribePodcast=async(req,res)=>{
  let subscription;

  let data = await SubSchema.find({
    listenerid:req.body.listenerid,
     podcastid: req.body.podcastid,
     paymentstatus: req.body.paymentstatus,
   });

  //  console.log(data, 'ppp',req.body.podcastid, req.body.listenerid)
   if (!data.length > 0) {
    subscription = await new SubSchema({
      listenerid:req.body.listenerid,
       podcastid: req.body.podcastid,
       date: new Date(),
       paymentstatus: req.body.paymentstatus,
       isactive:true
     });
     subscription
   .save()
   .then((response) => {
     res.json({
       status: 200,
       msg: "Podcast subscribed Succesfully",
       data:response
     });
   })
   .catch((err) => {
     if (err.code == 11000) {
       res.json({
         status: 409,
         msg: "already subscribed",
       });
     }
      else {
       console.log(err);
       res.json({
         status: 500,
         msg: "error",
       });
     }
   });
   } else {
    res.json({
      status: 400,
      msg: "Already subscribed",
      data:[]
    });
   }
}

const getSubscriptionByListenerId=(req,res)=>{
   
  SubSchema.find({listenerid:req.body.id}).populate('podcastid')
.exec().then(data=>{
 res.json({
     status:200,
     msg:"success",
     data: data
 })
}).catch(err=>{
 res.json({
     status:500,
     msg:"error",
     Error:err
 })
})
}

const Subcsriptions=(req,res)=>{
  SubSchema.find().populate("podcastid listenerid")
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


 module.exports={
    viewSubscriptionByCreatorId,
    viewSubscriptionById,
    viewSubscriptionByListenerId,
    updatePayment,
    subscribePodcast,
    getSubscriptionByListenerId,
    Subcsriptions
 }