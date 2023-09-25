const { Schema, model } = require("mongoose");
const studentRegistrationSchema = new Schema(
    {
        name : String,
        email : String,
        mobile : String,
        state : String,
        city : String,
        intrestCountry : String,
        preferredStudyLevel : String
    },
    { collection: "StudentsData" },
    {timestamps: true},
)

const getCallBackSchema = new Schema(
    {
        name : String,
        mobile : String,
        email : String,
        isContacted : Boolean,
        isIntrested : Boolean,
        isNotIntrested : Boolean,
        remarks : String
    },
    {timestamps: true},
    { collection: "getCallBackData" }
)

const studentRegistrationModal = model("studentRegistrationModal", studentRegistrationSchema, "StudentsData");
const getCallBackModel = model("DataModel", getCallBackSchema, "getCallBackData");

module.exports = { studentRegistrationModal , getCallBackModel };