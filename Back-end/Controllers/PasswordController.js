const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../Models/userModel');

// forgetPassword
const forgetPassword = async function (req, res) {
  try {
    const email = req.body.email;
    if (!email)
      throw new Error('Email is required')

    const user = await User.findOne({ email });
    if (!user)
      throw new Error('User is not found')
    // Generate secret
    const secret = process.env.SECRET_KEY + user.password
    const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '60m' })
    const link = `http://localhost:3000/resetpassword/${user.id}/${token}`;
    user.sendEmail(user.email, 'Reset Password / Mentor Project', `<h1>Password reset request</h1><h3>You requested a password reset for your account.</h3><b>Click <a href="${link}">here</a> to reset your password.</b><br><br><p>please ignore if you didn't sent us this request</p>`)
    res.status(200).send("The password reset link has been sent to your email")
  } catch (e) {
    res.status(500).send(e.message);
  }
}

// resetPassword
async function resetPassword(req, res) {
  try {
    const { id, token } = req.params
    const password = req.body.password
    if (!password)
      throw new Error('New password required')

    if (!mongoose.Types.ObjectId.isValid(id))
      throw new Error('Invalid ID...')

    const user = await User.findById(id)
    if (!user)
      throw new Error('Invalid ID... user not found')

    const secret = process.env.SECRET_KEY + user.password
    jwt.verify(token, secret)
    // find user with email and id from the already signed at forgetPassword controller
    user.password = password
    await user.save()
    res.send('password updated successfully')
  } catch (e) {
    res.status(404).send(e.message);
  }
}

module.exports = { forgetPassword, resetPassword };
