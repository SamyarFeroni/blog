const client = require('../db')//call the server postgres
const queryies = require('./queries')//call the queryies code for postgres function
const bcrypt = require('bcrypt')//for password Hash
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
//function CRUD for express and exports all of them to router.js and main.js

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thismmdkabol@gmail.com',
        pass: 'mmdkabol1234'
    }
});
const secretkey = 'samyar1234'


//function for read all users from database
const getUsers = (req, res) => {
    client.query(queryies.getAllUsers, (error, resulte) => {
        if (error) throw error
        res.status(200).json(resulte.rows)
    })
};
//function for finde user by ID
const getusersById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(queryies.getusersById, [id], (error, resulte) => {
        if (error) throw error
        res.status(200).json(resulte.rows)

    })
};
//function for remove all user data from database only admin can do that!
const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    client.query(queryies.getusersById, [id], (error, resulte) => {
        const noUserFound = !resulte.rows.length;
        if (noUserFound) {
            res.send(`User by id:${id} is not exist in the Database`)
        };

        client.query(queryies.removeUser, [id], (error, resulte) => {
            if (error) throw error
            res.status(200).send(`The User by id:${id} is removed Succsesfully`)
        })

    })
};
//function for update username age email password only user can do that (very soon i add code for update age email and password)
const updateUser = (req, res) => {
    const usernameRest = parseInt(req.params.username);

    client.query(queryies.getusersByusername, [usernameRest], (error, resulte) => {
        const noUserFound = !resulte.rows.length;
        if (noUserFound) {
            res.status().json({ success: false })
            // res.send(`User by id:${usernameRest} is not exist in the Database`)
        };

        client.query(queryies.getusersByusername, [username, usernameRest], (error, resulte) => {
            if (error) throw error
            res.status(200).json({ success: true })
            // res.status(200).send(`The User:${usernameRest} is Updated Succsesfully`)
        })

    })

};
//funtion fpr add user to database and checks the  usernaeme and email are already on the server or not
const addUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password, gender, phonenumber } = req.body;

        client.query(queryies.checkUsernameExists, [username], (error, resulte) => {
            // if (resulte.rows.length) {
            //     res.status(401).json({ success: false })
            // };

            const hashpassword = bcrypt.hashSync(password, 10)
            client.query(queryies.addusers,
                [firstName, lastName, username, hashpassword, gender, phonenumber],
                (error, resulte) => {
                    if (error) throw error
                    res.status(201).json({ success: true })
                    console.log("user created");
                });
        })
    } catch (error) {
        if (error.code === '23505') {
            res.status(409).json({ success: false, alert: 'This email is already exists' });
        } else {
            res.status(500).json({ success: false, alert: 'A server error has occurred' });

        }
    }
};
//fountion for login users and check the username and password are they match
const loginUser = async (req, res) => {
    try {
        let user = await client.query(queryies.loginUser, [req.body.username])
        if (user && user.rows.length > 0) user = user.rows[0]
        else return res.status(400).send('username or password is wrong')
        const compare = await bcrypt.compare('' + req.body.password, user.password)
        if (!compare) return res.status(404).send('username or password is wrong')
        delete user.password
        const payload = { id: user.id, username: user.username }
        const token = await jwt.sign(payload, 'secret')
        return res.json({ user, token })

    }
    catch (error) {
        console.log("hereeeeeeeee contoroller");
        console.error(error)
    }
}

// const RestPassword = async (req, res) => {
//     try {
//         const usernaeme = await client.query(queryies.loginUser, [req.body.username]);

//         if (usernaeme.rowCount === 0) {
//             res.status(401).json({ success: false })
//         } else {
//             res.status(200).json({ success: true })
//             const email = await client.query(queryies.RestPasswordByemail, req.body.username)
//             const mailOption = {
//                 from: "thismmdkabol@gmail.com",
//                 to: email,
//                 subject: "Hello this one is check test for code",
//                 text: "This is the secret code 12092"
//             }
//             transporter.sendMail(mailOption, (error, info) => {
//                 if (error) throw error
//                 console.log(`Email sent: ` + info.response);
//             })

//         }
//     }
//     catch {

//     }
// }

//export all of them
module.exports = {
    getUsers,
    getusersById,
    addUser,
    removeUser,
    updateUser,
    loginUser,
    // RestPassword
}