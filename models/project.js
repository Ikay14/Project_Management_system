const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters']
  
},

description:String,
tasks:[{
    type:
    mongoose.Schema.Types.ObjectId, ref: 
    'Task'
}]
})

module.exports = mongoose.model('project', ProjectSchema)
