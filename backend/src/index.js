const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

mongoose.connect('mongodb://alexalannunes:a0l11e4x23@ds253713.mlab.com:53713/alexalannunes', {
    useNewUrlParser: true
});


app.use((req, res, next) => {
  req.io = io;

  return next();
});


app.use(cors());
app.use(express.json())
app.use(require('./routes'));


server.listen(3000, function() {
    console.log('server running...');
})