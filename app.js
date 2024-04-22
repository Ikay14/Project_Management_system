const express = require('express');
const connectDB = require('./db/connect');
const app = express();
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handling');
const userRouter = require('./routes/users') 
const taskRouter = require('./routes/task') 
const projectRouter = require('./routes/project') 

// middleware
app.use(express.json())

// routes
app.use('/api/v1/user', userRouter)  
app.use('/api/v1/tasks', taskRouter) 
app.use('/api/v1/projects', projectRouter) 

// error handling middleware
app.use(notFound)
app.use(errorHandlerMiddleware) 

const port = 5000

const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> {
            console.log(`Server is listening on ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start() 
