let username = localStorage.getItem("schusername")
if (username) {
  fetch("/isinroom?username" + username).then((res) => res.json()).then((data) => {
    data = data.response
    if(data.response == true) {
      console.log("user is already in a room, leave now!")
    } else {
      console.log("not in room!")
      document.getElementById("fillusername").textContent = "user: " + username.split("=|")[0] + " | Wins: " + username.split("=|")[2]
    }
  })
} else {
  console.log("NO USERNAME!")
  document.querySelector("main").innerHTML = `
    <h2>choose a username</h2>
    <input id="username-submit" placeholder="username" />
    <button id="submit-username" onclick="submitusername()">submit</button>
  `
}
function submitusername() {
  let value = document.getElementById("username-submit").value
  if(value == "" || value.length == 0) return alert("too short")
  if(!value.match(/([A-z0-9À-ž]){2,}/)) return alert("does not match regex")
  value = value + "=|" + Date.now() + "=|0/0"
  console.log(value)
  localStorage.setItem("schusername", value);
  location.reload()
}
