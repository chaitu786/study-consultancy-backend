const { client } = require("../config/db");
const db = client.db("study-consultancy");
const enquiryCollection =  db.collection("enqiry");
const callbackCollection =  db.collection("callback");

const getStudentsDataData = async()=>{
    try {
        const data = await enquiryCollection.find().toArray();
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
        let newStudentData = { name,email,mobile,state,city,intrestCountry,preferredStudyLevel,date : new Date() };
        await enquiryCollection.insertOne(newStudentData);
        return { message : "Your enquiry submitted successfully, we will contact you shortly.", status : true };
    } catch (error) {
        return { message: "something went wrong, please try after sometime", status: false,error};
    }
}

const getCallBackData = async () => {
    try {
        const data = await callbackCollection.find().toArray();
        return {
          message: "callback data obtained successfully",
          status: true,
          data: data,
        };
    }
    catch (err) {
        return { message: "something went wrong", status: "error", data: null };
    }
}

const getCallBackSubmission = async (name,mobile,email) =>{
    try {
        let detailObj = {
            name,
            mobile,
            email,
            isContacted : false,
            isIntrested : false,
            isNotIntrested : false, 
            remarks : "",
        }
        await callbackCollection.insertOne(detailObj);
        return { message : "submitted successfully, we will contact you shortly.", status : true };
    } catch (error) {
        return { message: "something went wrong, please try after sometime", status: false,error};
    }
}

module.exports = { getStudentsDataData, createStudentEnquiry, getCallBackSubmission, getCallBackData };