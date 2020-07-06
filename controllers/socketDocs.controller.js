let manageDocs = (http) => {
  let io = require("socket.io")(http),
    socketJwt = require("socketio-jwt");

  io.use(
    socketJwt.authorize({
      secret: process.env.KEY_JWT,
      handshake: true,
    })
  );

  const getData = {}; //lista de salas/documentos

  io.on("connection", (socket) => {
    let previousId, previousName;

    const safeJoin = (currentId) => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };

    const safeName = (currentName) => {
      socket.leave(previousName);
      socket.join(currentName);
      previousName = currentName;
    };

    socket.on("getDoc", (id) => {
      safeJoin(id);
      socket.emit("manageData", getData[id]);
      // if (doc.docPassword == "12345") {

      // } else {
      //   console.log("Invalid password");
      // }
    });

    socket.on("addDoc", (doc) => {
      let rooms = Object.keys(getData),
        roomsNumber = rooms.length + 1,
        roomName = `doc ${roomsNumber}`;

      doc.id = roomName;

      getData[doc.id] = doc;
      safeJoin(doc.id);
      io.emit("getData", Object.keys(getData));
      socket.emit("manageData", doc);
    });

    socket.on("editDoc", (doc) => {
      getData[doc.id] = doc;
      socket.to(doc.id).emit("manageData", doc);
    });

    socket.on("lastUserChange", (userName) => {
      safeName(userName);
      socket.emit("userName", userName);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    io.emit("getData", Object.keys(getData));
  });
};

module.exports = manageDocs;
