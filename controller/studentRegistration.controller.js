// const { studentRegistrationModal, getCallBackModel } = require("../models/studentRegistration.models");
const { dataBaseConnection } = require("../config/mongoServer");

const getStudentsDataData = async()=>{
    try {
        let enquiryCollection = await dataBaseConnection.db("enqiry")
        const data = await enquiryCollection.find();
        return {
          message: "students data obtained successfully",
          status: true,
          data: data,
        };
    }
    catch (err) {
        return { message: "something went wrong", status: "error", data: null };
    }
}

const createStudentEnquiry = async (name,email,mobile,state,city,intrestCountry,preferredStudyLevel) =>{
    try {
        let enquiryCollection = await dataBaseConnection.db("enqiry")
        let newStudentData = {
            name,email,mobile,state,city,intrestCountry,preferredStudyLevel
        }
       await enquiryCollection.inse
        return { message : "Your enquiry submitted successfully, we will contact you shortly.", status : true }
    } catch (error) {
        return { message: "something went wrong, please try after sometime", status: false,error};
    }
}

const getCallBackData = async () => {
    // try {
    //     const data = await studentRegistrationModal.find();
    //     return {
    //       message: "callback data obtained successfully",
    //       status: true,
    //       data: data,
    //     };
    // }
    // catch (err) {
    //     return { message: "something went wrong", status: "error", data: null };
    // }
}

const getCallBackSubmission = async (name,mobile,email) =>{
    // try {
    //     let detailObj = {
    //         name,
    //         mobile,
    //         email,
    //         isContacted : false,
    //         isIntrested : false,
    //         isNotIntrested : false, 
    //         remarks : ""
    //     }
    //     const getCallBackData = new getCallBackModel(detailObj)
    //     getCallBackData.save()
    //     return { message : "submitted successfully, we will contact you shortly.", status : true }
    // } catch (error) {
    //     return { message: "something went wrong, please try after sometime", status: false,error};
    // }
}

module.exports = { getStudentsDataData, createStudentEnquiry, getCallBackSubmission, getCallBackData };