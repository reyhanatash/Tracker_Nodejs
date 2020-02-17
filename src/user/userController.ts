import * as bodyParser from 'body-parser';
import * as express from 'express';
import { jsontoken } from '../autorize';
import User from './user';
import * as userModel from './userModel';
import { sha256, sha224 } from 'js-sha256';
import sendMail from "../sendMail";

class UserController {
    public router: express.router;
    public user: User;
    constructor() {
        this.router = express.Router();
        this.user = new User();
        this.config();
        this.call();
    }
    private config(): void {
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(bodyParser.json());
    }
    private call(): void {
        this.router.post('/api/user/login', (req, res) => {
            var loginModel = new userModel.login();
            loginModel.username = req.body.username;
            loginModel.password = req.body.password;

            this.user
                .Login(loginModel)
                .then(data => {
                    if ((parseInt(data[0].MESSAGE)) !== 3) {
                        let token = jsontoken.createToken(
                            data[0]['FldPkUserCo'],
                            data[0]['FldUserType'],
                            data[0]['FldFkCompanyCo']
                        );
                        let k = {
                            token: token,
                            type: data[0]['FldUserType'],
                            userId: data[0]['FldPkUserCo'],
                            staffId: data[0]['FldFkStaffCo'],
                            staffFName: data[0]['FldName'],
                            staffLName: data[0]['FldFamily']
                        };
                        res.status(200).send({
                            msg: 'success',
                            data: k,
                            status: 200
                        });
                    } else {
                        res.status(200).send({
                            msg: 'fail',
                            data: '',
                            status: 400
                        });
                    }
                })
                .catch(reason => {
                    res.status(400).send({
                        reason
                    });
                });
        });

        this.router.post('/api/user/changePassword', (req, res) => {
            // var token = req.headers['x-access-token'];
            // let status = jsontoken.checkToken(token);
            // if (status !== 200) {
            //     return res.status(status).send({
            //         msg: 'fail'
            //     });
            // }

            var aModel = new userModel.changePass();
            aModel.email = req.body.email;

            var unHashed = Math.floor(1000 + Math.random() * 9000).toString();

            aModel.password = sha256(unHashed);

            this.user
                .ChangePassword(aModel)
                .then(data => {
                    if (data) {
                    if (data[0]['MESSAGE'] == 1){
                    sendMail.send(0, aModel.email , '', unHashed);
                    }
                    }
                    res.status(200).send({
                        msg: 'success',
                        data: data,
                        status: 200
                    });
                })
                .catch(reason => {
                    res.status(400).send({
                        reason
                    });
                });
        });

    }
}

export default new UserController().router;
