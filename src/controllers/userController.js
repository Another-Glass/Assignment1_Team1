import util from '../utils/util';
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';
import encrypt from '../lib/encryption';
import jwt from '../lib/jwt';

import { signup, checkEmail, signin } from '../service/userService';

export const postSignup = async(req, res) => {
  try {
    const { name, email, password, password2 } = req.body;

    if(name === undefined || email === undefined || password === undefined || password2 === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const isEmail = await checkEmail(email);
    
    if(isEmail) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL))
    }

    if(password !== password2) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
    }
  
    const salt = encrypt.makeSalt();
    const encryptPassword = encrypt.encryption(password, salt);
    
    await signup(name, email, encryptPassword, salt);
    
    return res.status(statusCode.CREATED)
      .send(util.success(statusCode.CREATED, responseMessage.CREATED_USER));
  } catch {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FAIL_SINGUP))
  }
}

export const postSignin = async(req, res) => {
  try {
    const { email, password } = req.body;

    if(email === undefined || password === undefined) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    } 

    const isEmail = await checkEmail(email);
    
    if(!isEmail) {
      return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER))
    }
    
    const { salt, password: realPassword } = isEmail;
    
    const inputPassword = encrypt.encryption(password, salt);
    
    if(inputPassword !== realPassword) {
      return res.status(statusCode.UNAUTHORIZED)
        .send(util.fail(statusCode.UNAUTHORIZED, responseMessage.MISS_MATCH_PW));
    }
    
    const user = await signin(email, inputPassword);

    const { accessToken, refreshToken } = await jwt.sign(user);
    return res.status(statusCode.OK)
      .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
        accessToken,
        refreshToken
      })) 
  } catch(err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.LOGIN_FAIL))
  }
}