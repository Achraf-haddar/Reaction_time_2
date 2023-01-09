const fs = require('fs');
const bodyParser = require('body-parser');
const { Router } = require('express');
const router = Router();
// add router in express app


const mongoose = require('mongoose');
const URI = "mongodb+srv://Achraf_Haddar:Achraf123@cluster0.cun4h.mongodb.net/Reaction_time?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    console.log("connected...!")
}
connectDB();



const express = require('express')
const User = require('./model');
const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",router);
router.get('/', (req, res) => {
    res.sendFile(__dirname + "/" + 'index.html');
})
router.post('/', async (req, res) => {
  try{
    var data = JSON.stringify({
      "gender": req.body.gender,
      "age": req.body.age,
      "score1": req.body.scores[0],
      "score2": req.body.scores[1],
      "score3": req.body.scores[2],
      "average_score": req.body.averageScore,
      "app": "App2"
    })
    console.log(data)
    const saved = await User.create(JSON.parse(data));
    res.status(201).send({id: saved._id});
  } catch(err){
    console.log(err)
      res.status(400).json({ error: err });       
  }
  
})

// app.post('/', (req, res) => {
//     var fields = ['Age', 'Gender', 'Scores', 'Average'];
//     var header = "Age,Gender,Score1,Score2,Score,Average\n"
//     var newLine = req.body.age + "," + req.body.gender + "," + req.body.scores + "," + req.body.averageScore + "\n"
//     fs.stat('file.csv', function (err, stat) {
//       if (err == null) {
//         console.log('File exists');
//         //write the actual data and end with newline
//         // var csv = json2csv(req.body, {header: false}) // + newLine;
    
//         fs.appendFileSync('file.csv', newLine, function (err) {
//           if (err) throw err;
//           console.log('The "data to append" was appended to file!');
//         });
//       } else {
//         //write the headers and newline
//         console.log('New file, just writing headers');
//         // fields = fields + newLine;
//         // var csv = json2csv(fields, {header: true}) // + newLine;

//         fs.writeFileSync('file.csv', header + newLine, function (err) {
//           if (err) throw err;
//           console.log('file saved');
//         });
//       }
//     });
    
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})