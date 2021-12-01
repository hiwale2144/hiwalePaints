const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]    
})

userSchema.methods.generateAuthToken = async function(){
    console.log('am called');
    try{
        let token = jwt.sign({_id:this._id}, process.env.HIDDENKEY);
        this.tokens = this.tokens.concat({token:token});
        const ck = await this.save();
        if(ck){
            console.log('save result');
        }else{
            console.log('save failed');
        }
        return ({message:'userSave', token:token}); 
    }catch(e){
        console.log(e);
    }
}


const userReg = mongoose.model('userdata',userSchema);


module.exports = userReg;
