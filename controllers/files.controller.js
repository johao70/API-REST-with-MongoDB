const fs = require("fs"),
  path = require("path");

let uploadFile = (req, res) => {
  let file = req.files.file;

  if (!file.originalFileName) {
    fs.unlinkSync(file.path);
    return res.status(400).json({
      ok: false,
      data: null,
      msg: "Upload a file, pls",
    });
  } else {
    let url = file.path;

    url = url.split("/");
    let urlFile = [url[url.length - 1]];
    //SAVE NAME FILE IN THE DB

    return res.status(200).json({
      ok: true,
      data: urlFile,
      msg: urlFile.length,
    });
  }
};

let showFiles = (req, res) => {
  let urlFile = req.params.urlFile,
    directory = req.params.directory,
    pathFile = `./files/${directory}/${urlFile}`;

  fs.exists(pathFile, (exist) => {
    exist
      ? res.status(200).sendFile(path.resolve(pathFile))
      : res.status(400).send("The file doesn't exist");
  });
};

let deleteFiles = (req, res) => {
  let urlFile = req.params.urlFile,
    directory = req.params.directory,
    pathFile = `./files/${directory}/${urlFile}`;

  fs.unlink(pathFile, (deleted) => {
    !deleted
      ? res.status(200).send("Deleted file")
      : res.status(400).send("The file doesn't exist");
  });
};

let modifyFiles = (req, res) => {
  let urlFile = req.params.urlFile,
    directory = req.params.directory,
    file = req.files.file,
    pathFile = `./files/${directory}/${urlFile}`;

  fs.exists(pathFile, (exist) => {
    if (exist) {
      if (file.originalFileName == "") {
        fs.unlinkSync(file.path);
        return res.status(400).json({
          ok: false,
          data: null,
          msg: "Upload a file, pls",
        });
      } else {
        fs.unlink(pathFile, (deleted) => {
          if (!deleted) {
            let url = file.path;

            url = url.split("/");
            let urlFile = [url[url.length - 1]];

            res.status(200).json({
              ok: true,
              data: `Imagen modificada: ${urlFile}`,
              msg: urlFile.length,
            });
          } else {
            res.status(400).send("algo salio mal");
          }
        });
      }
    } else {
      fs.unlinkSync(file.path);
      res.status(400).send("The file doesn't exist");
    }
  });
};

module.exports = {
  uploadFile,
  showFiles,
  deleteFiles,
  modifyFiles,
};
