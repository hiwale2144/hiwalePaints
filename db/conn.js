const mongoose = require('mongoose');

const DB = 'mongodb+srv://pathanpaint:Ppaints8600@cluster0.eetfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(DB,{
    
}).then(()=>{
    console.log('database connected successfully');
}).catch((err)=>{
    console.log(`database connection failed: ${err}`);
})