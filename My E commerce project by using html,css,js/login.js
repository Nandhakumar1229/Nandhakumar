const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }

  // Save login user (demo)
  localStorage.setItem("user", JSON.stringify({ email }));

  alert("Login successful ✅");
  window.location.href = "index.html";
});
