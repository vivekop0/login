const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cros = require('cors')
app.use(cros())
mongoose.connect("mongodb+srv://sarkarjii534:%40sarkarop09@cluster0.kazdxwe.mongodb.net/Form");


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const User = mongoose.model("form", userSchema);

app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        
        await User.create({
            username: username,
            password: password,
            email: email
        });

        res.json({
            msg: "User created successfully"
        });
    } catch (error) {
      
        console.error(error);
        res.status(500).json({
            msg: "Error creating user"
        });
    }
});
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Use User.find() to find users matching the provided username and password
        const users = await User.find({
            username: username,
            password: password
        });

        // Check if the length of the array is greater than 0 (i.e., if at least one user was found)
        if (users.length > 0) {
            // If there's a matching user, respond with 'ok'
            res.json({
                msg: 'ok'
            });
        } else {
            // If no matching user was found, respond with 'not exist'
            res.json({
                msg: 'not exist'
            });
        }
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error(error);
        res.status(500).json({
            msg: 'Error during login'
        });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
