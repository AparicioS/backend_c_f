const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 3000;

app.use(express.json());

// Configuração do multer para armazenar os arquivos na pasta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rota para receber uploads de imagens
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file); // Informações sobre o arquivo enviado
  res.send('Upload recebido com sucesso!');
});

// Iniciar o servidor
app.listen(process.env.PORT || PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
