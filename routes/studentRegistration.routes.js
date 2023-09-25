const { Router } = require("express");
const { createStudentEnquiry, getStudentsDataData, getCallBackSubmission, getCallBackData } = require("../controller/studentRegistration.controller");
const studentsEnquiryRouter = Router();

studentsEnquiryRouter.get("/studentsData", async(req,res)=>{
    const { message, status, data } = await getStudentsDataData();
    if (status === "error") {
        return res.status(404).send({ message, status });
    }
    return res.status(200).send({ message, status, data });
})

studentsEnquiryRouter.post("/studentEnquiry", async (req,res) => {
    const { mobile,email,name,state,city,intrestCountry,preferredStudyLevel } = req.body
    const { message, status } = await createStudentEnquiry(name,mobile,email,state,city,intrestCountry,preferredStudyLevel);
    if(status) {
        res.status(201).send({ message , status })
    }else{
        res.status(500).send({ message , status })
    }
})

studentsEnquiryRouter.get("/callBackData", async(req,res)=>{
    const { message, status, data } = await getCallBackData();
    if (status === "error") {
        return res.status(404).send({ message, status });
    }
    return res.status(200).send({ message, status, data });
})


studentsEnquiryRouter.post("/getCallBack", async (req,res) => {
    const { mobile,email,name } = req.body
    const { message, status } = await getCallBackSubmission(name,mobile,email);
    if(status) {
        res.status(201).send({ message , status })
    }else{
        res.status(500).send({ message , status })
    }
})

module.exports = { studentsEnquiryRouter }