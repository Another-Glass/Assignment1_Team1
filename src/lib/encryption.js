import crypto from 'crypto';

const makeSalt = () => {
    return crypto.randomBytes(32).toString('hex');
};

function encryption(password, salt) {
    const key = crypto.pbkdf2Sync(password, salt.toString(), 100000, 32, 'sha512');
    return key.toString('hex');
}

export default {
    makeSalt: makeSalt,
    encryption: encryption,
};
