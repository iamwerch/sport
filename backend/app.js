//import express module
const express = require('express');
//import body parser module
const bodyParsser = require('body-parser');
//import bcrypt
const bcrypt = require('bcrypt')
//import eq
const multer = require("multer")
//import path
const path = require('path')
//import jsonwebtoken
const jwt = require('jsonwebtoken')
//import axios
const axios = require("axios");
//import path
const session = require('express-session')
//import mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');





//create the application
const app = express();
//config body parser to structure the BE response to JSON
app.use(bodyParsser.json());
//config body parser to parse the request received from the FE(enter the object content)
app.use(bodyParsser.urlencoded({ extended: true }));
const secretKey = 'my-secret-key';

app.use(session({
    secret: secretKey,
    }));
app.use('/images', express.static(path.join('backend/images')))

//security config
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    next();
});
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}




const storageConfig = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        // IMPORTANT: don't forget to use path.join(....)
        const filePath = `backend/images`
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        const dateField = (new Date().getTime() / 1000 | 0);
        const randomField = Math.random().toString(36).substring(2);
        const fileName = `${dateField}-${randomField}.${extension}`;
         cb(null,fileName)
    },
})





const upload = multer({ storage: storageConfig, limits: {
    fileSize: 1024 * 1024 * 10 // MB
},
fileFilter: (req, file, cb) => {
    let isValid = (file.mimetype === 'image/jpeg' ||
                   file.mimetype === 'image/jpg' ||
                   file.mimetype === 'image/png');
    cb(null, isValid);
} }).single("img")



const Match = require("./models/match");
const User = require("./models/user");
const Player = require("./models/player")
const Team = require("./models/team");
const { log } = require('console');
const { read } = require('fs');
//matches
app.get('/allMatches', (req, res) => {
    Match.find().then(
        (docs) => {
            res.json({ t: docs })
        }
    );

})

app.get('/allMatches/:id', (req, res) => {
    Match.findById(req.params.id).then(
        (doc) => {
            res.json({ m: doc })
        }
    )
});
app.delete('/allMatches/:id', (req, res) => {
    Match.deleteOne({ _id: req.params.id }).then(
        (deleteResponse) => {
            console.log("here is delete response", deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({ msg: "success" })
            } else {
                res.json({ msg: "echec" })

            }
        }
    )
});

app.post('/allMatches', (req, res) => {
    let match = new Match(req.body);
    match.save();
    res.json({ msg: 'match added successfuly' })
});

app.put('/allMatches/:id', (req, res) => {
    Match.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log("here updated match", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "match updated with sucess" })
            } else {
                res.json({ msg: "match update failed" })
            }
        }
    )
}
)



//players
app.post("/players", (req, res) => {
    console.log("Here into BL: Add Player", req.body);
    Team.findById(req.body.tId).then((team) => {
        if (!team) {
            return res.json({ msg: "Team Not Found" });
        }
        let player = new Player({
            name: req.body.name,
            age: req.body.age,
            position: req.body.position,
            nbr: req.body.nbr,
            tId: team._id
        });
        player.save((err, doc) => {
            if (err) {
                res.json({ msg: "Error" })
            } else {
                team.players.push(doc);
                team.save();
                res.json({ msg: "Player Added with Success" });
            }
        });
    });
});


app.get('/players', (req, res) => {
    Player.find().then(
        (docs) => {
            res.json({ p: docs })
        }
    )
});

app.get('/players/:id', (req, res) => {
    Player.findById(req.params.id).then(
        (doc) => {
            res.json({ p: doc })
        }
    )
});

app.delete('/players/:id', (req, res) => {
    Player.deleteOne({ _id: req.params.id }).then(
        (deleteResponse) => {
            console.log("here is delete response", deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({ msg: "success" })
            } else {
                res.json({ msg: "echec" })

            }
        }
    )
});
app.put('/players/:id', (req, res) => {
    Player.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log("here updated player", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({ msg: "player updated with sucess" })
            } else {
                res.json({ msg: "player update failed" })
            }
        }
    )
}
)

//users : signup
app.post('/users/xyz',(req, res) => {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          //  Multer error uploading.
          res.status(503).json({ msg: 'upload failed', error: err });

        } else if (err) {
          // An unknown error when uploading.
          res.status(503).json({ msg: 'upload failed', error: err });

        }

          })

      bcrypt.hash(req.body.password || '', 10).then(
        (cryptedPwd) => {
            if(!(req && req.file && req.file.filename)) {
                 res.status(503).json({ msg: 'upload failed'});

            }

            req.body.password = cryptedPwd;
            req.body.avatar = `http://localhost:3000/images/${req.file.filename}`;
            let user = new User(req.body);
            user.save((err, doc) => {
                console.log("here err", err);
                console.log("here doc", doc);
                res.json({ msg: 'user added successfully' });

            });
        }
    );





});



//login
// app.post('/users/login', (req, res) => {
//     const { email, pwd } = req.body;
//     User.findOne({ email })
//         .then((user) => {
//             if (user) {
//                 bcrypt.compare(pwd, user.password)
//                     .then((result) => {
//                         if (result) {
//                             res.json({ msg: true, fName: user.firstName, lName: user.lastName });
//                         } else {
//                             res.json({ msg: false });
//                         }
//                     });
//             } 
//         });
// });
//second methode
app.post('/users/login', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.json({ msg: "Check your email" });
        }

        bcrypt.compare(req.body.pwd, user.password, (err, result) => {
            if (err) {
                console.log("her is error", err);
                return res.json({ msg: "Error comparing passwords" });
            }

            if (!result) {
                return res.json({ msg: "Check your password" });
            }
            console.log("here is result", user);
            let founduser = {
                fName: user.firstName, lName: user.lastName, id: user._id, prP: user.avatar
            }
            const token = jwt.sign(founduser , secretKey,{expiresIn:'1h'});

            res.json({ msg: "Welcome", token: token });
        });
    });
});
//teams
app.get('/teams', (req, res) => {
    Team.find().then(
        (docs) => {
            res.json({ t: docs })
        }
    );

});
app.post("/teams", (req, res) => {
    console.log("Here into BL: Add Team", req.body);
    let team = new Team(req.body);
    team.save();
    res.json({ msg: "Added" });
});
app.get("/teams/:id", (req,res)=>{
    console.log("here is team id",req.params.id)
    Team.findById(req.params.id).populate('players').then(
        (doc) =>{
            res.json({team:doc})
        }
    )
})
//weather
app.post('/weather', (req, res) => {    
    let {city}=req.body
    const apiKey = '796d80fb243986740a205dc893f6b9b5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios.get(apiUrl)
        .then(response => {
            console.log("here is response",response.data);
            const weatherData = {
                pressure: response.data.main.pressure,
                temperature: response.data.main.temp,
                windSpeed: response.data.wind.speed,
                icon: response.data.weather[0].icon,
            };

            res.json({
                weather: weatherData,
            });
            })
        })



//export the application
module.exports = app;




