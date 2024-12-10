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

  console.log('Login attempt with:', { credential });

  if (!passwordRegex.test(passwordValue)) {
    console.log('Password validation failed');
    alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    return;
  }

  // Get users array from localStorage
  const adminUsers = JSON.parse(localStorage.getItem('adminUsers')) || [];
  console.log('Current admin users in storage:', adminUsers);
  
  // Find user by either username or email
  const adminUser = adminUsers.find(user => 
    user.username === credential || user.email === credential
  );

  console.log('Found admin user:', adminUser);

  if (adminUser) {
    if (adminUser.password === passwordValue) {
      console.log('Login successful');
      window.location.href = '../Admin/adminFacility.html';
    } else {
      console.log('Password mismatch');
      alert('Invalid password!');
    }
  } else {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Current users in storage:', users);
    
    // Find user by either username or email
    const user = users.find(user => 
      user.username === credential || user.email === credential
    );

    console.log('Found user:', user);

    if (user) {
      if (user.password === passwordValue) {
        console.log('Login successful');
        window.location.href = '../User/room.html';
      } else {
        console.log('Password mismatch');
        alert('Invalid password!');
      }
    } else {
      console.log('User not found');
      alert('User not found!');
    }
  }
});
