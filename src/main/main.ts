import * as mysql from 'mysql';
import * as config from '../../config';
import * as mainModel from './mainModel';

interface IDisposable {
    dispose();
}

export default class Main{
    public connection;
    constructor() {
        this.connection = new mysql.createPool(config.dbConnection.dbConfig);
    }

    CreateJob(jobModel: mainModel.job) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpjobSave(?,?,?,?,?,?,?)`;
            this.connection.query(
                qry,
                [
                    jobModel.jobCo,
                    jobModel.jobNumber,
                    jobModel.jobTypeCo,
                    jobModel.companyCo,
                    jobModel.clientName,
                    jobModel.address,
                    jobModel.startDate
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

    DeleteJob(jobModel: mainModel.job) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpjobDelete(?)`;
            this.connection.query(
                qry,
                [
                    jobModel.jobCo
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
    
    LoadJob(jobModel: mainModel.job) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpJobLoadUser(?)`;
            this.connection.query(
                qry,
                [
                    jobModel.userId
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
    
    AddJobType(jobModel: mainModel.jobType) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpjobtypeSave(?,?,?)`;
            this.connection.query(
                qry,
                [
                    jobModel.jobTypeCo,
                    jobModel.companyCo,
                    jobModel.typeDesc
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
    
    DeleteJobType(jobModel: mainModel.jobType) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpjobtypeDelete(?)`;
            this.connection.query(
                qry,
                [
                    jobModel.jobTypeCo
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
    
    LoadJobType(jobModel: mainModel.job) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpJobTypeLoadUser(?)`;
            this.connection.query(
                qry,
                [
                    jobModel.userId
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
    

    AddActivity(activityModel: mainModel.activity) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpactivitySave(?,?,?)`;
            this.connection.query(
                qry,
                [
                    activityModel.activityCo,
                    activityModel.companyCo,
                    activityModel.activityDesc
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

    LoadActivity(activityModel: mainModel.job) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpactivityLoadUser(?)`;
            this.connection.query(
                qry,
                [
                    activityModel.userId
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

    DeleteActivity(activityModel: mainModel.activity) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpactivityDelete(?)`;
            this.connection.query(
                qry,
                [
                    activityModel.activityCo
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
    
    addStaff(activityModel: mainModel.staff) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpstaffSave(?,?,?,?,?,?,?)`;
            this.connection.query(
                qry,
                [
                    activityModel.staffCo,
                    activityModel.companyCo,
                    activityModel.firstName,
                    activityModel.lastName,
                    activityModel.email,
                    activityModel.phone,
                    activityModel.password
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
    
    loadStaff(activityModel: mainModel.job) {
        return new Promise((resolve, reject) => {
            let qry =`CALL SpStaffLoadUser(?)`;
            this.connection.query(
                qry,
                [
                    activityModel.userId
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
    
    
    deleteStaff(activityModel: mainModel.staff) {
        return new Promise((resolve, reject) => {
            let qry =`CALL SpstaffDelete(?)`;
            this.connection.query(
                qry,
                [
                    activityModel.staffCo
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

    AddTime(timeModel: mainModel.time) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SptimesheetSave(?,?,?,?,?,?,?,?)`;
            this.connection.query(
                qry,
                [
                    timeModel.timeSheetCo,
                    timeModel.jobCo,
                    timeModel.staffCo,
                    timeModel.activityCo,
                    timeModel.note,
                    timeModel.date,
                    timeModel.startTime,
                    timeModel.endTime
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


    CompanySave(companySaveModel: mainModel.account) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpcompanySave(?,?,?,?,?,?)`;
            this.connection.query(
                qry,
                [
                    companySaveModel.companyCo,
                    companySaveModel.adminName,
                    companySaveModel.adminEmail,
                    companySaveModel.adminPhone,
                    companySaveModel.password,
                    companySaveModel.companyName

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
    
    SettingSave(companySaveModel: mainModel.account) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpAccountSave(?,?,?,?)`;
            this.connection.query(
                qry,
                [
                    companySaveModel.companyCo,
                    companySaveModel.accountantName,
                    companySaveModel.accountantEmail,
                    companySaveModel.startingDate
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
    
    LoadStaffOfTimeSheet(time: mainModel.StaffTime) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpMonthSummery(?,?)`;
            this.connection.query(
                qry,
                [
                    time.companyCo,
                    time.monthCo
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

    LoadDaysOfStaff(time: mainModel.StaffTime) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpMonthStaff(?,?)`;
            this.connection.query(
                qry,
                [
                    time.staffCo,
                    time.monthCo
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
    
    LoadStaffHoursOfDay(time: mainModel.StaffTime) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpStaffLoadDate(?,?)`;
            this.connection.query(
                qry,
                [
                    time.staffCo,
                    time.date
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
    
    LoadMonthId(time: mainModel.time) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpCompanyActiveMonth(?)`;
            this.connection.query(
                qry,
                [
                    time.companyCo
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


    LoadCompany(companyLoadModel: mainModel.Mail) {
        return new Promise((resolve, reject) => {
            let qry = `CALL SpcompanyLoad(?)`;
            this.connection.query(
                qry,
                [
                    companyLoadModel.companyCo
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

    deleteTimesheet(activityModel: mainModel.time) {
        return new Promise((resolve, reject) => {
            let qry =`CALL SptimesheetDelete(?)`;
            this.connection.query(
                qry,
                [
                    activityModel.timeSheetCo
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
    
    addLaunchTime(activityModel: mainModel.time) {
        return new Promise((resolve, reject) => {
            let qry =`CALL SpStaffLunchAdd(?,?)`;
            this.connection.query(
                qry,
                [
                    activityModel.staffCo,
                    activityModel.date
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
    
    
    ApproveStaff(activityModel: mainModel.approve) {
        return new Promise((resolve, reject) => {
            let qry =`CALL SpMonthStaffApprove(?,?,?)`;
            this.connection.query(
                qry,
                [
                    activityModel.staffCo,
                    activityModel.monthCo,
                    activityModel.isApproved
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
    
    ApproveCompany(activityModel: mainModel.approve) {
        return new Promise((resolve, reject) => {
            let qry =`CALL SpMonthApprove(?,?,?)`;
            this.connection.query(
                qry,
                [
                    activityModel.companyCo,
                    activityModel.monthCo,
                    activityModel.isApproved
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