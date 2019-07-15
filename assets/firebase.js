const firebaseConfig = {
    apiKey: "AIzaSyACvMRu2uILwjAa0AQzEFX2KHMqFxUUtV4",
    authDomain: "becodechat-9f80e.firebaseapp.com",
    databaseURL: "https://becodechat-9f80e.firebaseio.com",
    projectId: "becodechat-9f80e",
    storageBucket: "",
    messagingSenderId: "659795306092",
    appId: "1:659795306092:web:9c37d7d81ac87c9d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function login() {
    let provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        // ...
        console.log(user);

    }).catch(function (error) {
        let errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorMessage);
    });
    
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });

$('#log').on('click', login);