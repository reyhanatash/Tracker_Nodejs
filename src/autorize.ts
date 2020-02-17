import * as jwt from 'jsonwebtoken';
import config from '../config';

export class jsontoken {
    public static createToken(id: number, type: number, company : number) {
        let token = jwt.sign(
            {
                id: id,
                type: type,
                company : company
            },
            config.key,
            {
                expiresIn: 604800
            }
        );
        return token;
    }
    public static checkToken(token: string) {
        if (!token) return 401;

        try {
            jwt.verify(token, config.key);
            return 200;
        } catch {
            return 401;
        }
    }
    public static getId(token: string) {
        var decoded = jwt.verify(token, config.key);
        return decoded.id;
    }
    public static getType(token: string) {
        var decoded = jwt.verify(token, config.key);
        return decoded.type;
    }

    public static getCompany(token: string) {
        var decoded = jwt.verify(token, config.key);
        return decoded.company;
    }
    
    public static checkTokenforAdmin(token: string) {
        if (!token) return 401;

        try {
            var decoded = jwt.verify(token, config.key);
            if (decoded.type === 1) {
                return 200;
            } else {
                return 401;
            }
        } catch {
            return 401;
        }
    }
}
