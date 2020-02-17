export default class secret {
    public static key = 'ryansecret';
}
export class dbConnection {
    public static dbConfig = {
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
        
        host: '178.33.255.83',
        port: '63366',
        user: 'root',
        password: '123',
        database: 'TimeSheet'
        
        // host: '192.168.1.37',
        // port: '3307',
        // user: 'root',
        // password: '123',
        // database: 'TimeSheet'
    };

}

