const express = require("express");
const {UserModel} = require("../model/user.model");
const csvParser = require("json2csv").Parser;


const userRouter = express.Router();

userRouter.get("/",async(req,res)=>{
    try {
        const details = await UserModel.find();
        res.send({status: "success", details});
    } catch (error) {
        console.log(error);
        res.send({msg : "somthing went wrong", status : "error"})
    }
});

userRouter.post("/search",async(req,res)=>{
    const {name} = req.body;
    try {
        const detail = await UserModel.find({firstName : name })
            res.send(detail);
    } catch (error) {
        console.log(error);
        res.send({msg : "somthing went wrong", status : "error"});
    }
});

userRouter.post("/add",async(req,res)=>{
    const {firstName, lastName, email, gender, mobile, status, profile, location} = req.body;

    try {
        const detail = await UserModel.findOne({email});
        if (detail) {
          res.send({ msg: "user email already exists", status: "info" });
        } else {
          const detail = new UserModel({
            firstName,
            lastName,
            email,
            gender,
            mobile,
            status,
            profile,
            location,
          });
          await detail.save();
          res.send({ msg: "user detail added successfully", status: "success" });
        }
    } catch (error) {
        console.log(error);
        res.send({ msg: "somthing went wrong", status: "error" });
    }
});

userRouter.delete("/remove/:id", async(req,res)=>{
    const id = req.params.id;

    try {
        await UserModel.findByIdAndDelete(id);
        res.send({msg:"user removed", status : "success"})
    } catch (error) {
        console.log(error);
        res.send({msg:"somthing went wrong", status:"error"});
    }
});

userRouter.get("/:id",async(req,res)=>{
    const id = req.params.id;

    try {
        const detail = await UserModel.find({"_id":id});
        res.send(detail);
    } catch (error) {
        console.log(error);
        res.send({ msg: "somthing went wrong", status: "error" });
    }
});

userRouter.patch("/update/status/:id",async(req,res)=>{
    const id = req.params.id;
    const {status} = req.body;
    try {
        await UserModel.findByIdAndUpdate(id,{status});
        res.send({ msg: "status updated", status: "success" });
    } catch (error) {
        console.log(error);
        res.send({ msg: "somthing went wrong", status: "error" });
    }
});

userRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
   const {
     firstName,
     lastName,
     email,
     gender,
     mobile,
     status,
     profile,
     location
   } = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      gender,
      mobile,
      status,
      profile,
      location
    });
    res.send({ msg: "detail updated", status: "success" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "somthing went wrong", status: "error" });
  }
});

userRouter.get("/export/csv", async(req,res)=>{

    try {
        let data = [];
        const details = await UserModel.find();
        details.forEach(ele => {
            let {id,firstName,lastName,email,mobile,gender} = ele;
            data.push({ id, firstName, lastName, email, mobile, gender });
        });
        const csvFields = ['id', 'firstName', 'lastName', 'email', 'mobile', 'gender'];
        const csv_Parser = new csvParser({csvFields});
        const csvData = csv_Parser.parse(data);

        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attatchment : filename = upforce.csv");

        res.end(csvData);
    } catch (error) {
        console.log(error)
        res.send({msg:'somthing went wrong',status:'error'})
    }
})

module.exports = {
    userRouter
}