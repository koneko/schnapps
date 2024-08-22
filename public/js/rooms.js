let roomsDiv = document.querySelector(".rooms")

function refreshRooms() {
  fetch("/rooms").then(res => res.json()).then(rooms => {
    if(rooms.length == 0) roomsDiv.innerHTML = `<p>No rooms found, make one yourself and invite your friends.</p>` 
    else {
      roomsDiv.innerHTML = ""
      rooms.forEach(room => {
        let roomDiv = document.createElement("div")
        roomDiv.innerHTML = `
          <h3>${room.displayName}</h3>
          Players: ${room.players}/${room.maxSize}
          <button onclick="joinRoom(${room.roomID})">join room</button>
        `
        roomsDiv.appendChild(roomDiv)
      })
    }
  })
}

function joinRoom(roomID) {
  localStorage.setItem("schroomjoin", roomID);
  location.href = "/game"
}

function createRoom() {
  fetch("/createRoom?username=" + username).then(res => res.json()).then(roomID => {
    localStorage.setItem("schroomcreate", roomID)
    location.href = "/game"
  })
}

document.getElementById("create-room").addEventListener("click", () => {
  createRoom()
})

refreshRooms()
