const express = require('express');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const app = express();
let mqttController = require('./controllers/mqttController');

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/test', function(req, res){
  console.log("Test Called !! (app communication server)");
  res.send('test')
});

// Import routes to be served

app.listen(3000, function(){
   console.log('Server is running on Port : 3000');
});

global.client = mqtt.connect('tcp://connect.smartnode.in:1883', {

 username:'nO1cANsTOPuS',
 password:"d$2N@8p&1V#1"
})


async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://admin:admin@clusternew-shard-00-00-dwd7u.mongodb.net:27017,clusternew-shard-00-01-dwd7u.mongodb.net:27017,clusternew-shard-00-02-dwd7u.mongodb.net:27017/testingnewDB?ssl=true&replicaSet=ClusterNew-shard-0&authSource=admin&retryWrites=false',{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    } catch (error) {
        console.log("db not connected");
    }
}
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

connectToDatabase();

client.on('connect', function () {

  client.subscribe('+/M_rx', function(err){
    if(!err){
      console.log("many subscribe called");
    }
  })
})

client.on('message', mqttController.msgControl);

