const { client } = require("../config/db");
const db = client.db("study-consultancy");
const enquiryCollection = db.collection("enqiry");
const callbackCollection = db.collection("callback");

const getStudentsDataData = async () => {
  try {
    const data = await enquiryCollection.find().toArray();
    return {
      message: "students data obtained successfully",
      status: true,
      data: data,
      statusCode : 200
    };
  } catch (err) {
    return { message: "something went wrong", status: "error", data: null };
  }
};

const createStudentEnquiry = async (
  name,
  email,
  mobile,
  state,
  city,
  intrestCountry,
  preferredStudyLevel
) => {
  try {
    let newStudentData = {
      name,
      email,
      mobile,
      state,
      city,
      intrestCountry,
      preferredStudyLevel,
      date: new Date(),
    };
    let validation = validateRequestData(newStudentData, [
      "name",
      "email",
      "city",
      "mobile",
    ]);
    if (!validation.isValid) {
      return { message: validation.error, status: false , statusCode : "400" };
    }
    await enquiryCollection.insertOne(newStudentData);
    return {
      message:
        "Congratulations! Your form has been successfully submitted , we will contact you shortly.",
      status: true,
      statusCode : 201
    };
  } catch (error) {
    return {
      message: "something went wrong, please try after sometime",
      status: false,
      error,
      statusCode : 500
    };
  }
};

const getCallBackData = async () => {
  try {
    const data = await callbackCollection.find().toArray();
    return {
      message: "callback data obtained successfully",
      status: true,
      data: data,
      statusCode : 200
    };
  } catch (err) {
    return { message: "something went wrong", status: "error", data: null };
  }
};

const getCallBackSubmission = async (name, mobile, email) => {
  try {
    let detailObj = {
      name,
      mobile,
      email,
      isContacted: false,
      isIntrested: false,
      isNotIntrested: false,
      remarks: "",
    };
    let validation = validateRequestData(newStudentData, [
      "name",
      "email",
      "mobile",
    ]);
    if (!validation.isValid) {
      return { message: validation.error, status: false,  statusCode : 400 };
    }
    await callbackCollection.insertOne(detailObj);
    return {
      message: "submitted successfully, we will contact you shortly.",
      status: true,
      statusCode : 201
    };
  } catch (error) {
    return {
      message: "something went wrong, please try after sometime",
      status: false,
      error,
      statusCode : 500
    };
  }
};

//validation function
function validateRequestData(requestData, requiredFields) {
  const errors = [];
  let isValid = true,
    error = "";

  for (const field of requiredFields) {
    console.log(field);
    if (
      !(field in requestData) ||
      requestData[field] == null ||
      requestData[field] == ""
    ) {
      error = `'${field}' is required.`;
      isValid = false;
      break;
    }
  }
  console.log("chaithanya", isValid, error);
  return {
    isValid,
    error,
  };
}

module.exports = {
  getStudentsDataData,
  createStudentEnquiry,
  getCallBackSubmission,
  getCallBackData,
};
