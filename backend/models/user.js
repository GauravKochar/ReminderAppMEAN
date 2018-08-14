var mongoose=require('mongoose');
const  uniqueValidator= require('mongoose-unique-validator');
const userSchema= mongoose.Schema(
  {
    email:{ type:String ,required: true, unique:true},
    password:{ type:String },
    username : { type:String },
    googleId:{ type:String },
    followers:{ type: Array},
    following: {type: Array}
  }
);
userSchema.plugin(uniqueValidator);

 module.exports= mongoose.model('User',userSchema);
