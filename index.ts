import { Room, Player } from "./definitions.ts"
import { Server } from "socket.io"
import express from "express"

let r = new Room(3)
r.players = [new Player("testname=|23231=|1/1", r.roomID)]
let rooms = [r] 

const app = express();
app.use(express.static("public"))

function isUserInRoom(username) {
  let value = false
  rooms.forEach((room, idx) => {
    if(room.markedForDeletion) {
      rooms.splice(idx, 1)
      return
    }
   if (room.IsUserInRoom(username)) value = true
  })
  return value
}

app.get("/rooms", (req,res) => {
  res.json(rooms)
})

app.get("/isinroom", (req,res) => {
 let username = req.query.username;
 res.json({response: isUserInRoom(username)})
})

const server = app.listen(3000, () => console.log("Listening on port 3000."));
const io = new Server(server)

io.on("connection", socket => {
  console.log("player socket game")
  socket.on("joinRoom", data => {
      console.log(data)
  })
  socket.on("disconnect", d => {
    console.log("disconnect!")
  })
})
