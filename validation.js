const Joi =require('@hapi/joi');

const registerValidation = (data)=>{
    const schema={
        name: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
}
const loginValidation = (data)=>{
    const schema={
        password: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

