import util from '../utils/util';
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';
import encrypt from '../lib/encryption';

import { signup, checkEmail } from '../service/userService';

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