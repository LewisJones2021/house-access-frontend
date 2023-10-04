/** @format */

document.addEventListener('DOMContentLoaded', () => {
 const signUpButton = document.querySelector('.sign-up-btn');
 if (signUpButton) {
  signUpButton.addEventListener('click', async () => {
   const userEmail = document.querySelector('.user-email').value;
   const userPassword = document.querySelector('.user-password').value;
   try {
    // Save data to the server using a POST request
    const response = await fetch('http://localhost:8080/users/signup', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
     },
     // Convert data to JSON format
     body: JSON.stringify({ email: userEmail, password: userPassword }),
    });
    console.log(response);

    if (response.ok) {
     console.log('User successfully created.');
     window.location.href = '/';
    } else {
     console.error('Error creating user');
    }
   } catch (error) {
    console.error('Error saving user:', error);
   }
  });
 }

 const loginButton = document.querySelector('.login-btn');
 if (loginButton) {
  loginButton.addEventListener('click', async () => {
   const userEmail = document.querySelector('.user-email').value;
   const userPassword = document.querySelector('.user-password').value;
   try {
    // Save data to the server using a POST request
    const response = await fetch('http://localhost:8080/users/login', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
     },
     // Convert data to JSON format
     body: JSON.stringify({ email: userEmail, password: userPassword }),
    });
    console.log(response);

    if (response.ok) {
     console.log('User successfully logged in.');
     const userResponse = await response.json();
     const jsonResponse = JSON.stringify(userResponse);
     localStorage.setItem('user', jsonResponse);
     window.location.href = '/';
    } else {
     console.error('Error logging user in', response.status, response.statusText);
    }
   } catch (error) {
    console.error('Error logging user in:', error);
   }
  });
 }
});
