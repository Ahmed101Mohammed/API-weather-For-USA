// requier mudels:
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// use method:
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());
//static file:
app.use(express.static('weather'));

 //local server:
 app.listen(3000,'127.0.0.1',()=>{console.log('Server active.....')});

// Post request:
let projectData = {};

app.post('/saveData',(req,res)=>{
  projectData = req.body;
})

// GET request:

app.get('/getData', (req,res)=>{
  res.send(projectData);
})
