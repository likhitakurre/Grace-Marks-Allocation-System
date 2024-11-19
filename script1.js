document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";
  const validUsername = "advisor";
  const validPassword = "password123";

  if (username === "" || password === "") {
      errorMessage.textContent = "Both fields are required.";
  } else if (username !== validUsername || password !== validPassword) {
      errorMessage.textContent = "Invalid username or password.";
  } else {
      
      alert("Login successful!");
      window.location.href = "test.html";  
  }
});
