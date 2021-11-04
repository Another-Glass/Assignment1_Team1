import jsonwebtoken from 'jsonwebtoken';
import secretKey from '../configs/secretKey.js';
import * as userService from '../services/userService.js';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default {
    sign: async user => {
        const payload = {
            id: user.id,
            name: user.name
        };

        const result = {
            accessToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.options),
            refreshToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.refreshOptions)
        };

        await userService.updateRefreshToken(user.id, result.refreshToken);
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, secretKey.secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') return TOKEN_EXPIRED;
            if (err.message === 'invalid token') return TOKEN_INVALID;
            return TOKEN_INVALID;
        }
        return decoded;
    },
    refresh: async refreshToken => {
        try {
            const result = jsonwebtoken.verify(refreshToken, secretKey.secretKey);
            if (result.id === undefined) return TOKEN_INVALID;

            const user = await userService.checkUserId(result.id);
            if (refreshToken !== user.refreshToken) return TOKEN_INVALID;

            const payload = {
                id: user.id,
                name: user.name,
            };
            const dto = {
                accessToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.options),
                refreshToken: jsonwebtoken.sign(payload, secretKey.secretKey, secretKey.refreshOptions),
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