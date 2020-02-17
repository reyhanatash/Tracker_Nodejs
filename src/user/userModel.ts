export class register {
    public username: string;
    public password: string;
    public type;
    public email:string;
    public mobile:string;
    public location;
}

export class login {
    public username: string;
    public userId: number;
    public password: string;
}
export class changePass {
    public email: string;
    public password: string;
}
