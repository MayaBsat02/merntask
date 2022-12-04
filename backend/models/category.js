const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//define catgeory schema
const categorySchema=new Schema({
    title:{
        type:String,
        // required:true
    },
    icon:{
        type:String,
    },
    items:[{
        type:Schema.Types.ObjectId,
        ref:'Item',
    }]
});


module.exports=mongoose.model('Category',categorySchema);
