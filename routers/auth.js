const e = require('express');
const express = require('express');
const router = express.Router();
const userReg = require('../models/userSchema')

router.post('/userRegistration',async(req,res)=>{
    const {username, userphone, useremail}=req.body;
    const newUser = await userReg.findOne({phone:userphone})
    if(!newUser){
        const regUser = await new userReg({name:username,email:useremail,phone:userphone})
        if(regUser){
            const regDone = await regUser.save();
            if(regDone){
                // res.status(200).json({message:'data reg successfull'})
                const findRec = await userReg.findOne({phone:userphone})
                if(findRec){
                    const token = await findRec.generateAuthToken()
                    console.log('token iss : '+token.message);
                        res.cookie('jwtoken', token, { 
                            expires:new Date(Date.now()+25892000000),
                            httpOnly:true
                        })
                    if(token.message === 'userSave'){
                        res.status(200).json({message:'userRegSucc'})
                    }
                }else{
    
                }
            }else{
                res.status(200).json({message:'data reg faild'})
                console.log('dat reg faild');
            }
        }else{
            res.status(200).json({message:'having truble to get data'})
            console.log('having truble to get data');
        }
    }else{
        const token = await newUser.generateAuthToken()
        console.log('token is : '+token.message);
        res.cookie('jwtoken', token, { 
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        })
        res.status(200).json({message:'userRegSucc'})
    }
})
module.exports = router;