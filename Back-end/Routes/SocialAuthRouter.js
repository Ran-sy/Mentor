const express = require("express");
const passport = require("passport");
const jwt=require("jsonwebtoken")
const router = express.Router();
const CLIENT_URL = "http://localhost:3000";
const User = require('../Models/userModel')
// const setCookie= async(req, res, next)=> {
//     console.log("object :>> ");
//     try{
    
//     const token = jwt.sign(
//       {
//         id: req.user._id,
//         role: req.user.role,
//       },
//       "secretKey"
//     );
//     res.cookie("accessToken", token, {
//       httpOnly: false,
//     });
//   next();}
//   catch(e){

//   }
// }
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/error",
//     session: false,
//   }),
//   setCookie,
//   (req, res) => {
//     res.redirect("/");
//   }
// );
router.get(
"/google/callback",
  passport.authenticate(
    "google",

    { failureRedirect: "/login",
   }
  ),
  (req, res) => {
    console.log(req.user._id, req.user.role);
    const token = jwt.sign(
      {
        id: req.user._id,
        role: req.user.role, 
      },
      "secretKey" 
    );
    res
      .cookie("accessToken", token, {
        httpOnly: false,
      })
     res.redirect(CLIENT_URL);
  }
);
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    console.log("object :>> ");
    const token = jwt.sign(
      {
        id: req.user._id,
        role: req.user.role,
      },
      "secretKey"
    );
    res.cookie("accessToken", token, {
      httpOnly: false,
    });
    res.redirect(CLIENT_URL);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    console.log("object :>> ");
    const token = jwt.sign(
      {
        id: req.user._id,
        role: req.user.role,
      },
      "secretKey"
    );
    res.cookie("accessToken", token, {
      httpOnly: false,
    });
    res.redirect(CLIENT_URL);
  }
);

module.exports = router;
