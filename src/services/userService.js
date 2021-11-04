import User from '../models/userModel.js';

export const signup = async (name, email, password, salt) => {
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      salt: salt,
    });
    return user;
  } catch (err) {
    throw err;
  }
}

export const checkEmail = async email => {
  try {
    const alreadyEmail = await User.findOne({
      email: email
    });
    return alreadyEmail;
  } catch (err) {
    throw err;
  }
}

export const signin = async (email, password) => {
  try {
    const user = await User.findOne({
      email: email,
      password: password
    });
    return user;
  } catch (err) {
    throw err;
  }
}

export const updateRefreshToken = async (id, refreshToken) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id
      },
      {
        refreshToken: refreshToken
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
}