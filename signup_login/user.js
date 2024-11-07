const password = document.getElementById('loginPassword');
const eyesvg = document.getElementById('loginEyesvg');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

eyesvg.onclick = function(){
    if (password.type === 'password') {
        password.type = 'text';
        eyesvg.src ="../pic/eye-svgrepo-com.svg";
    } else {
        password.type = 'password';
        eyesvg.src ="../pic/eye-close-svgrepo-com.svg";
    }
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const credential = loginForm.credential.value;
  const passwordValue = password.value;

  if (!passwordRegex.test(passwordValue)) {
    alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    return;
  }

  // Check if the input is a username or email
  let storedUserData;
  if (credential.includes('@')) {
    // Check if the input is an email
    // Assuming email is unique for each user, find the username from the email
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const userData = JSON.parse(localStorage[key]);
        if (userData.email === credential) {
          storedUserData = localStorage[key];
          break;
        }
      }
    }
  } else {
    // Check if the input is a username
    storedUserData = localStorage.getItem(credential);
  }

  if (storedUserData) {
    const { password: storedPassword } = JSON.parse(storedUserData);
    if (storedPassword === passwordValue) {
      window.location.href = '../User/room.html';
    } else {
      alert('Invalid password!');
    }
  } else {
    alert('User not found!');
  }
});






