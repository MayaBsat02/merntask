const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//define item schema
const itemSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    imageUrl:{
        type:String,
    }
});


module.exports=mongoose.model('Item',itemSchema);