var express = require('express');
var cors = require('cors');
const formidable = require('formidable')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  const form = formidable({multiples: true})

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const name = files.upfile.originalFilename
    const type = files.upfile.mimetype
    const size = files.upfile.size
    
    res.json({ name: name, type: type, size: size });
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
