import jwt from 'jsonwebtoken';
import secretKey from '../config/secretKey';
import { updateRefreshToken, checkUserId } from '../service/userService';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default {
    sign: async user => {
        const payload = {
            id: user.id,
            name: user.name
        };

        const result = {
            accessToken: jwt.sign(payload, secretKey.secretKey, secretKey.options),
            refreshToken: jwt.sign(payload, secretKey.secretKey, secretKey.refreshOptions)
        };

        await updateRefreshToken(user.id, result.refreshToken);
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey.secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') return TOKEN_EXPIRED;
            if (err.message === 'invalid token') return TOKEN_INVALID;
            return TOKEN_INVALID;
        }
        return decoded;
    },
    refresh: async refreshToken => {
        try {
            const result = jwt.verify(refreshToken, secretKey.secretKey);
            if (result.id === undefined) return TOKEN_INVALID;

            const user = await checkUserId(result.id);
            if (refreshToken !== user.refreshToken) return TOKEN_INVALID;

            const payload = {
                id: user.id,
                name: user.name,
            };
            const dto = {
                accessToken: jwt.sign(payload, secretKey.secretKey, secretKey.options),
                refreshToken: jwt.sign(payload, secretKey.secretKey, secretKey.refreshOptions),
            };
            await userService.updateRefreshToken(user.id, dto.refreshToken);
            return dto;
        } catch (err) {
            if (err.message === 'jwt expired') return TOKEN_EXPIRED;
            if (err.message === 'invalid token') return TOKEN_INVALID;
            return TOKEN_INVALID;
        }
    }
}