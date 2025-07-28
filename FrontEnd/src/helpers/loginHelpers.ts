import Cookies from 'js-cookie';
import { size } from 'lodash';

export enum JWT_TOKEN_STATUS {
    EXPIRED = 'EXPIRED',
    INVALID = 'INVALID',
    VALID = 'VALID',
}

export const validateMSALToken = (): JWT_TOKEN_STATUS => {
    const token: string | undefined = Cookies.get('token');

    if (token === undefined) {
        return JWT_TOKEN_STATUS.INVALID;
    }

    let decodedToken = null;

    try {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (size(decodedToken) === 0) {
            return JWT_TOKEN_STATUS.INVALID;
        }
    } catch (e) {
        return JWT_TOKEN_STATUS.INVALID;
    }

    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    const isExpired = currentTime > expirationTime;

    if (isExpired) {
        return JWT_TOKEN_STATUS.EXPIRED;
    }

    return JWT_TOKEN_STATUS.VALID;
};

export const clearAllDataOnUserLogout = () => {
    sessionStorage.clear();
    console.log('Cleared all data on user logout');
};
