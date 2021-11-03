const express = require('express');
const app = express();
const {port} = require('./app/config')
const apiRouter = require('./app/routes/api')

// routes
app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// server
app.listen(port, function () {
    console.log('server' + port)
});