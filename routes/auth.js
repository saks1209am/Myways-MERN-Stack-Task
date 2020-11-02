const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const { JWT_SECRET } = require('../config/keys')
const requirelogin = require("../middleware/requirelogin")
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

// 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
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))

router.get('/protected', requirelogin, (req, res) => {
    res.send('Hello')
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists with that email" })
            }
            bcrypt.hash(password, 14)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name
                    })

                    user.save()
                        .then(user => {
                            transporter.sendMail({
                                to: user.email,
                                from: "no-reply@myways.com",
                                subject: "signup success",
                                html: "<h1>Welcome to Myways </h1>"
                            })
                            res.json({ message: "saved successfully" })
                        })

                        .catch(err => {
                            console.log(err)
                        })
                })
        })
})


router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invaild Email or password " })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({ message: "Successfully signed in" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "user don't exists with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-reply@myways.com",
                        subject: "password reset",
                        html: `
                            <p>You requested for a password reset</p>
                        <h5>Click on this <a href="http://localhost:3000/reset/${token}">link</a>to reset password</h5>`
                    })
                    res.json({ message: "check your email" })
                })
            })
    })

})

module.exports = router