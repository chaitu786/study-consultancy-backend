const { Router } = require("express");
const {
  createStudentEnquiry,
  getStudentsDataData,
  getCallBackSubmission,
  getCallBackData,
} = require("../controller/studentRegistration.controller");
const studentsEnquiryRouter = Router();

studentsEnquiryRouter.get("/studentsData", async (req, res) => {
  const { message, status, data, statusCode } = await getStudentsDataData();
  if (status === "error") {
    return res.status(statusCode).send({ message, status });
  }
  return res.status(statusCode).send({ message, status, data });
});

studentsEnquiryRouter.post("/studentEnquiry", async (req, res) => {
  const {
    mobile,
    email,
    name,
    state,
    city,
    intrestCountry,
    preferredStudyLevel,
  } = req.body;
  const { message, status, error,  statusCode  } = await createStudentEnquiry(
    name,
    mobile,
    email,
    state,
    city,
    intrestCountry,
    preferredStudyLevel
  );
  if (status) {
    res.status(statusCode).send({ message, status });
  } else {
    res.status(statusCode).send({ message, status, error });
  }
});

studentsEnquiryRouter.get("/callBackData", async (req, res) => {
  const { message, status, data , statusCode} = await getCallBackData();
  if (status === "error") {
    return res.status(statusCode).send({ message, status });
  }
  return res.status(statusCode).send({ message, status, data });
});

studentsEnquiryRouter.post("/requestCallBack", async (req, res) => {
  const { mobile, email, name, statusCode } = req.body;
  const { message, status } = await getCallBackSubmission(name, mobile, email);
  if (status) {
    res.status(statusCode).send({ message, status });
  } else {
    res.status(statusCode).send({ message, status });
  }
});

module.exports = { studentsEnquiryRouter };
