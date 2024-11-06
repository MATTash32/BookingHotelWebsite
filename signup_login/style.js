const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');
let active = 1;

nextButton.addEventListener('click', () => {
    active++;
    if (active > steps.length) {
        active = steps.length;
    }
    updateProgress();
});

prevButton.addEventListener('click', () => {
    active--;
    if (active < 1) {
        active = 1;
    }
    updateProgress();
});

const updateProgress = () => {
    steps.forEach((step, i) => {
        if (i === active - 1) {
            step.classList.add('active');
            formSteps[i].classList.add('active');
        } else {
            step.classList.remove('active');
            formSteps[i].classList.remove('active');
        }
    });

    prevButton.disabled = active === 1;
    nextButton.disabled = active === steps.length;
};

updateProgress(); 

const backButton = document.querySelector('.back');
backButton.addEventListener('click', () => {
    window.location.href = 'userlogin.html';
});

const password = document.getElementById('password');
const eyesvg = document.getElementById('eyesvg');
eyesvg.onclick = function(){
    password.type = password.type === 'password' ? 'text' : 'password';
    eyesvg.src = password.type === 'password' ? "../pic/eye-close-svgrepo-com.svg" : "../pic/eye-svgrepo-com.svg";
}

const password1 = document.getElementById('password1');
const eyesvg1 = document.getElementById('eyesvg1');
eyesvg1.onclick = function(){
    password1.type = password1.type === 'password' ? 'text' : 'password';
    eyesvg1.src = password1.type === 'password' ? "../pic/eye-close-svgrepo-com.svg" : "../pic/eye-svgrepo-com.svg";
}



const subButton = document.querySelector('.btn-submit');
subButton.addEventListener('click', (e) => {
  if(password.value !== password1.value){
    e.preventDefault();
    alert('Passwords do not match. Please try again.');
    return;
  }
});



const otpInput = document.getElementById('otpInput');
const sendCodeButton = document.getElementById('sendCodeButton');
const verifyButton = document.getElementById('verifyButton');
const submitButton = document.getElementById('submitButton');

let timerInterval;
let timeRemaining = 30; 
let generatedOtp; 

sendCodeButton.addEventListener('click', () => {
  generatedOtp = generateRandomOtp(); 
  alert(`Your OTP is: ${generatedOtp}`);

  startTimer();


  sendCodeButton.disabled = true;
  verifyButton.disabled = false;
  submitButton.disabled = true; 
});


function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    sendCodeButton.textContent = `${timeRemaining}s`;

    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      sendCodeButton.textContent = 'Resend Code';
      sendCodeButton.disabled = false;
      verifyButton.disabled = true;
      timeRemaining = 30; 
      
    }
  }, 1000);
}


verifyButton.addEventListener('click', (e) => {
  e.preventDefault(); 
  const enteredOtp = otpInput.value;

  
  if (enteredOtp === generatedOtp) {
    alert('Verification successful!'); 
    submitButton.disabled = false; 
  } else {
    alert('Invalid OTP. Please try again.');
    submitButton.disabled = true; 
  }
});


function generateRandomOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}



const signupForm = document.getElementById('signupForm');
  

    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = signupForm.username.value;
      const email = signupForm.email.value;
      const password = signupForm.password.value;

      // Store user data with username as the key
      localStorage.setItem(username, JSON.stringify({ email, password }));

      alert('Sign up successful!');
    });

    

    
 




    

