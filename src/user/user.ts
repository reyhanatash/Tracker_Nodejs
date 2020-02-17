import * as mysql from 'mysql';
import * as Config from '../../config';
import * as userModel from './userModel';

interface IDisposable {
    dispose();
}

export default class User {
    public connection;
    constructor() {
        this.connection = mysql.createPool(Config.dbConnection.dbConfig);
    }
    Login(loginModel: userModel.login) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpUserLogon(?,?)`;
            this.connection.query(
                qry,
                [
                    loginModel.username,
                    loginModel.password
                ],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }


    ChangePassword(loginModel: userModel.changePass) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SPUserChangePass(?,?)`;
            this.connection.query(
                qry,
                [
                    loginModel.email,
                    loginModel.password
                ],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }

    GetAllUser() {
        return new Promise((resolve, reject) => {
            let qry = `CALL loadAllUser()`;
            this.connection.query(qry, (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result[0]);
            });
        });
    }
    register(registerModel: userModel.register) {
        return new Promise((resolve, reject) => {
            let qry = 'SP_CREATE_USER(?,?,?,?,?,?,?)';
            this.connection.query(
                qry,
                [
                    0,
                    registerModel.username,
                    registerModel.password,
                    registerModel.type,
                    registerModel.email,
                    registerModel.mobile,
                    registerModel.location
                ],
                (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                }
            );
        });
    }
}
