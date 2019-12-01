const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(1453);

io.on('connection', (socket) => {
    console.log('User Socket Connected');
    socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));

    socket.broadcast.on("sendUpdatePerson", person => {
        console.log("Update Person:" + person.name.first + ' ' + person.name.last);
        socket.broadcast.emit("Updatedperson", person);
    });
// Yeni EKLENDİ Insert Person
    socket.broadcast.on("sendSavePerson", person => {
        console.log("Saved Person:" + person.name.first + ' ' + person.name.last);
        socket.broadcast.emit("Savedperson", person);
    });
//-------------------------------

// Yeni EKLENDİ Delete Person
    socket.broadcast.on("sendDeletePerson", person => {  
        console.log("Deleted Person:" + person.name.first + ' ' + person.name.last);
        socket.broadcast.emit("Deletedperson", person);
    });
//-------------------------------
});
