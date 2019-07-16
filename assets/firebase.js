const firebaseConfig = {
  apiKey: "AIzaSyACvMRu2uILwjAa0AQzEFX2KHMqFxUUtV4",
  authDomain: "becodechat-9f80e.firebaseapp.com",
  databaseURL: "https://becodechat-9f80e.firebaseio.com",
  projectId: "becodechat-9f80e",
  storageBucket: "",
  messagingSenderId: "659795306092",
  appId: "1:659795306092:web:9c37d7d81ac87c9d"
};
let user = ""
$(function () {
  var socket = io();
  $('form').submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', {
      username: user,
      message: $('#m').val(),
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
    $('#messages').append($('<li>').text(msg.username + "\n"
      + msg.message + "\n" + msg.date));
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
    user = result.additionalUserInfo.username;

  }).catch(function (error) {
    let errorMessage = error.message;
    // The email of the user's account used.
    console.log(errorMessage);
  });

}
$('#log').on('click', login);