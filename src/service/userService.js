import User from '../models/userModel';

export const signup = async (name, email, password, salt) => {
  try {
    const user = await User.create({
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

export const signin = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email,
        password
      },
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
        refreshToken
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
}