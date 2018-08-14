var mongoose=require('mongoose');
const  uniqueValidator= require('mongoose-unique-validator');
const reminderSchema= mongoose.Schema(
  {
    title:{ type:String ,required: true},
    description:{ type:String ,required: true},
    startDate:{ type:Date ,required: true},
    remainderType:{ type:String ,required: true},
    endDate:{ type:Date ,required: true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
  }

);
reminderSchema.plugin(uniqueValidator);


 module.exports= mongoose.model('Reminder',reminderSchema);
