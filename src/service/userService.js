import User from '../models/userModel';

export const signup = async (name, email, password, salt) => {
  try {
    const user = await User.register({
      name,
      email,
      password,
      salt,
    });
    return user;
  } catch (err) {
    throw err;
  }
}

export const checkEmail = async email => {
  try {
    const alreadyEmail = await User.findOne({
      email
    });
    return alreadyEmail;
  } catch (err) {
    throw err;
  }
}