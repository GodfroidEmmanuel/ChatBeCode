//https://socket.io/get-started/chat/
const mongoose = require('mongoose');
let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let bodyParser = require("body-parser");
let moment = require('moment');
var firebase = require('firebase');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Message = require("./models/message")

mongoose.connect("mongodb+srv://godfroidEmmanuel:Manu160519899050@cluster0-xd1e5.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});
const db = mongoose.connection
db.on("err", console.error.bind(console, "you're not connected to db"));
db.once("open", () => {
    console.log("you're connected to db ")
})


app.set("view engine", "ejs");

app.get('/', function (req, res) {
    Message.find((err, messages) => {
        res.render("index", {
            message: messages
        });
        console.log(messages);
    })
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnecte');
    });
    socket.broadcast.emit('hi');

    app.use("/assets", express.static("assets"));
    io.emit('some event', {
        for: 'everyone'
    });

    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        const testV1mess = new Message({ date: msg.date, message: msg.message, username: msg.username });
        testV1mess.save().then(data => {
            console.log("success", "Bravo, votre message a été envoyé")
            io.emit('chat message', data);
        }).catch(err => {
            console.log(err)
            console.log("error", "Votre message n'a pas été envoyé")
        })
    });
});

/*const firebaseConfig = {
    apiKey: "AIzaSyACvMRu2uILwjAa0AQzEFX2KHMqFxUUtV4",
    authDomain: "becodechat-9f80e.firebaseapp.com",
    databaseURL: "https://becodechat-9f80e.firebaseio.com",
    projectId: "becodechat-9f80e",
    storageBucket: "",
    messagingSenderId: "659795306092",
    appId: "1:659795306092:web:9c37d7d81ac87c9d"
};
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GithubAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });*/
http.listen(5080, function () {
    console.log('listening on *:3000');
});