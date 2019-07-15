//https://socket.io/get-started/chat/
const mongoose = require('mongoose');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let bodyParser = require("body-parser");


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
});

http.listen(5080, function () {
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        const testV1mess = new Message({ message: msg });
        console.log(msg)
        testV1mess.save().then(data => {
            console.log("success", "Bravo, votre message a été envoyé")

        }).catch(err => {
            console.log("error", "Votre message n'a pas été envoyé")

        })
    });
});

io.emit('some event', {
    for: 'everyone'
});
io.on('connection', function (socket) {
    socket.broadcast.emit('hi');


});
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});