const firebaseConfig = {
  apiKey: "AIzaSyACvMRu2uILwjAa0AQzEFX2KHMqFxUUtV4",
  authDomain: "becodechat-9f80e.firebaseapp.com",
  databaseURL: "https://becodechat-9f80e.firebaseio.com",
  projectId: "becodechat-9f80e",
  storageBucket: "",
  messagingSenderId: "659795306092",
  appId: "1:659795306092:web:9c37d7d81ac87c9d"
};
let pseud = document.getElementById("pseudo");
let messContent = document.getElementById("m");

let user = ""
$(function () {
  var socket = io();
  $('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    console.log(pseud.value)
    socket.emit('chat message', {
      username: pseud.value,
      message: messContent.value,
      date: new Date().toLocaleString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    });
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function (msg) {
    $('#test').append($('<li>').text(msg.username + "\n"
      + msg.message + "\n" + msg.date));
    console.log(msg)
  });
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function login() {
  let provider = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    let token = result.credential.accessToken;
    // The signed-in user info.
    // ...
    console.log(result.additionalUserInfo.username)
    pseud.value = result.additionalUserInfo.username;

  }).catch(function (error) {
    let errorMessage = error.message;
    // The email of the user's account used.
    console.log(errorMessage);
  });


}
$('#log').on('click', login);