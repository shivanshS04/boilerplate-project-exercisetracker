const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(
  process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology : true
  }
)

const userSchema = new mongoose.Schema({
  username:{
    type : String,
    required: true,
  }
})

const userModel = new mongoose.model('fcc_user',userSchema)

app.use(cors())
app.use(express.static('public'))
app.use('/',bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post('/api/users',(req,res)=>{
  const username = req.body.username;
  const newUser =  userModel({
    username
  })
  newUser.save();
  res.json(newUser)
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
