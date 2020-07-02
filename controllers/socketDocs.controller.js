let manageDocs = (http) => {
  let io = require("socket.io")(http);

  const getData = {}; //lista de salas/documentos

  io.on("connection", (socket) => {
    let previousId;

    //permite registrarme en una sala
    const safeJoin = (currentId) => {
      //salir de una sala
      socket.leave(previousId);

      //unirme a una sala
      socket.join(currentId);
      previousId = currentId;
    };

    socket.on("getDoc", (id) => {
      safeJoin(id);
      socket.emit("manageData", getData[id]);
    });

    socket.on("addDoc", (doc) => {
      safeJoin(doc.id);
      getData[doc.id] = doc;
      io.emit("getData", Object.keys(getData));
      socket.emit("manageData", doc);
    });

    socket.on("editDoc", (doc) => {
      getData[doc.id] = doc;
      socket.to(doc.id).emit("manageData", doc);
    });

    io.emit("getData", Object.keys(getData));
  });
};

module.exports = manageDocs;
