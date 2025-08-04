import Joi from '@hapi/joi'

export const newUserValidator=(req,res,next)=>{

    const schema=Joi.object({
        firstName:Joi.string().min(3).required().pattern(/^[A-Za-z]+$/),
        lastName:Joi.string().optional().pattern(/^[A-Za-z]+$/).allow('',null),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password:Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required()
    })


 const {error,value}=schema.validate(req.body)
    if(error){
    next(error)
    }else{
        req.validateBody=value
        next()
    }
}