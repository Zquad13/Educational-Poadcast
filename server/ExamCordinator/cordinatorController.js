const cordinator = require("./cordinatorScema");


const addCordinator = (req, res) => {
  
      let listener = new cordinator({
     
        email: req.body.email,
        password: req.body.password,
       
      });
      listener
        .save()
        .then((response) => {
          res.json({
            status: 200,
            msg: "Successfully added",
            data:response
          });
        })
        .catch((err) => {
        
            console.log(err);
            res.json({
              status: 500,
              msg: "error",
            });
          
        });
    };



    const cordinatorLogin = async (req, res) => {
        try {
          const { email, password } = req.body;
          const cordin = await cordinator.findOne({ email: email });
          if (cordin) {
            if (cordin.password === password) {
              
              return res
                .status(200)
                .json({ message: "Login successful", id: cordin._id,data:cordin});
            } else {
              return res.status(401).json({ message: "Password is incorrect" });
            }
          } else {
            return res.status(404).json({ message: "Cordinator does not exist" });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };

      

const editCordinator=(req,res)=>{

  console.log(req.body);
    cordinator.findOneAndUpdate({userRole:'cordinator'},{
      email: req.body.email,
     password:req.body.password
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


  const viewCordinator=(req,res)=>{

    cordinator.findOne()
  .exec().then(data=>{
    res.json({
        status:200,
        data:data
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }


  const deleteCordinator=(req,res)=>{

    cordinator.findOneAndDelete({userRole:'cordinator'})
  .exec().then(data=>{
    res.json({
        status:200,
        data:data
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }


  module.exports={addCordinator,
    cordinatorLogin,
    editCordinator,viewCordinator,deleteCordinator
  }
