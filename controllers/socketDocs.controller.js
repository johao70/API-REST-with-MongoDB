let manageDocs = (http) => {
  let io = require("socket.io")(http),
    socketJwt = require("socketio-jwt");

  // io.use(
  //   socketJwt.authorize({
  //     secret: process.env.KEY_JWT,
  //     handshake: true,
  //   })
  // );

  io.use(
    socketJwt.authorize({
      secret: (req, decodedToken, callback) => {
        console.log(req._query.sessionID);
        callback(null, req._query.sessionID);
        //.then() hacer algo cuando funcione .catch() en caso de error
      },
      handshake: true,
    })
  );

  const getData = {}; //lista de salas/documentos

  io.on("connection", (socket) => {
    let previousId;

    const safeJoin = (currentId) => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };

    console.log(socket.handshake);
    socket.on("getDoc", (id) => {
      // if (doc.docPassword == "12345") {
      safeJoin(id);
      socket.emit("manageData", getData[id]);
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

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    io.emit("getData", Object.keys(getData));
  });
};

module.exports = manageDocs;
