const socket = io()

socket.on("connect", () => {
  if(localStorage.getItem("schroomjoin") != null) {
    socket.emit("joinRoom", {roomID: localStorage.getItem("schroomjoin"), username: localStorage.getItem("schusername")})
    localStorage.setItem("schroomjoin", null)
  } else {

  }

})
