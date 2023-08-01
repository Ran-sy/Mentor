
require("dotenv").config();

const isMentor = async (req, res, next) => {
  try {
    const user = req.user;
   
    if (!user) throw new Error("Not a user");
    const role = req.user.role;
    console.log("what is the role? ", role);
    if (role === "mentor") next(); // if mentor next()
    else throw new Error("You need to be a mentor ");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
 
const isMentee = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Not a user");
    const role = req.user.role;
    console.log("what is the role? ", role);
    // if mentor throw error
    if (role === "mentee") next()
    else throw new Error("You need to be a mentee");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  isMentor,
  isMentee,
};
