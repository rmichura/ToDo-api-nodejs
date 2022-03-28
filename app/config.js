require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    database: process.env.DATABASE || 'mongodb+srv://user:user@todo.cl3yc.mongodb.net/ToDo?retryWrites=true&w=majority'
}