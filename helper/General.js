const Validator = require('validatorjs');
var md5 = require('md5');
var moment = require('moment');
const nodemailer = require('nodemailer');

const checkEmailExist = async (value, attribute, req, passes) => {
        const models = require('../models/index')
    
        if(!attribute)
        {
            throw new Error('Specify Requirements i.e fieldName: exist:table,column');
        }
        
        let attArr = attribute.split(",");
        if(attArr.length < 1 || attArr.length > 4)
        {
            throw new Error(` Invalid format for validation rule on ${attribute}`);
        }
    
        let [
            table, 
            column,
            ignoreId,
            ignoreField
         ] = attArr;

        column = column ? column : req
        let ignoredData;
        if(ignoreId)
        {
            ignoreField  = ignoreField ? ignoreField : '_id'
            ignoredData = {
                [ignoreField]:{
                    $ne:ignoreId
                }
            }
        }
        let data;
        
        try{
            
            data = await models[table].findOne(
                {
                    [column]:value,
                    ignoredData 
                },
                {
                    attributes:['_id']
                })
        }
        catch(error)
        {
            console.error('Error executing raw update query:', error);
        }
        
        if(data)
        {
            if(passes)
            {
                passes(false);
            }
            else
            {
                return false;
            }   
        }
        else
        {
            if(passes)
            {
                passes();
            }
            else
            {
                return true;
            }
        }
}

const validatorMake = async (data, rules, message) => {    
    let validation = new Validator(data, rules, message);

    Validator.registerAsync('exist',checkEmailExist);

    return validation;    
}

const encrypt = (string) => {
    return md5(string);
}

const getHash = (length = 32) => {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for(var i = 0; i < length; i++)
    {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

const _moment = (timestamp = null) => {
    if (timestamp) return moment(timestamp).utcOffset("+05:30");
    else return moment().utcOffset("+05:30");
}

const foreach = (obj, callback) => {
    for (let [key, value] of Object.entries(obj))
    {
        callback(key, value);
    }
    return true;
}

const getBearerToken = (req) => {
    if (
        req &&
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    )
    {
        let token = req.headers.authorization.split(" ");
        
        if(token && token.length > 1)
        {
            return token && token[1] ? token[1].trim() : '';
        }
        else
        {
            return null;
        }
    }
    else
    {           
        return null;
    } 
}

const _date = (timestamp = null) => {
    if(timestamp)
    {
        return moment(timestamp).utcOffset("+05:30").format("YYYY-MM-DD");
    }
    else
    {
        return moment().utcOffset("+05:30").format("YYYY-MM-DD");
    }
}

const _datetime = (timestamp = null) => {
    if(timestamp)
    {
        return moment(timestamp)
            .utcOffset("+05:30")
            .format("YYYY-MM-DD HH:mm:ss");
    }        
    else
    {
        return moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss");
    }
}

const sendMail = (to, subject, body) => {
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });
    
    transporter.sendMail({
        from: process.env.SMTP_USERNAME,
        to: to,
        subject: subject,
        html: body
    }).then(result => {
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });
}

const getRandomNumber = (length = 6) => {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for(var i = 0; i < length; i++)
    {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    
    return result;
}

const isJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

const makeSlug = (title) => {
    if(title)
    {
        return title.toLowerCase().replaceAll(/\s/g,'-');
    }
    else
    {
        return true;
    }
}

module.exports = {
    foreach,
    validatorMake,
    encrypt,
    getHash,
    _moment,
    getBearerToken,
    _datetime,
    _date,
    sendMail,
    getRandomNumber,
    isJSON,
    makeSlug
}