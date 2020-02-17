import * as bodyParser from "body-parser";
import * as express from "express";
import { jsontoken } from "../autorize";
import Main from "./main";
import * as mainModel from "./mainModel";
import sendMail from "../sendMail";
import * as path from "path";
import * as base64topdf from "base64topdf";
import { writeFileSync } from "fs";

class MainController {
  public router: express.router;
  public main: Main;

  constructor() {
    this.router = express.Router();
    this.main = new Main();
    this.config();
    this.call();
  }
  private config(): void {
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(bodyParser.json());
  }
  private call(): void {
    this.router.post("/api/main/addJob", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.job();
      aModel.jobCo = req.body.jobCo;
      aModel.jobNumber = req.body.jobNumber;
      aModel.jobTypeCo = req.body.jobTypeCo;
      aModel.clientName = req.body.clientName;
      aModel.address = req.body.address;
      aModel.startDate = req.body.startDate;

      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .CreateJob(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
            data: data,
            status: 200
          });
        })
        .catch(reason => {
          res.status(400).send({
            reason
          });
          console.log(reason);
        });
    });

    this.router.post("/api/main/deleteJob", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.job();
      aModel.jobCo = req.body.jobCo;

      this.main
        .DeleteJob(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.get("/api/main/loadJobs", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }
      let userId = req.body.userId || jsontoken.getId(token);

      var aModel = new mainModel.job();
      aModel.userId = userId;

      this.main
        .LoadJob(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/addJobType", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.jobType();
      aModel.jobTypeCo = req.body.jobTypeCo;
      aModel.typeDesc = req.body.typeDesc;
      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .AddJobType(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.get("/api/main/loadJobType", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.job();
      aModel.userId = req.body.userId || jsontoken.getId(token);

      this.main
        .LoadJobType(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/deleteJobType", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.jobType();
      aModel.jobTypeCo = req.body.jobTypeCo;

      this.main
        .DeleteJobType(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/addActivity", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.activity();
      aModel.activityDesc = req.body.activityDesc;
      aModel.activityCo = req.body.activityCo;

      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .AddActivity(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.get("/api/main/loadActivity", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.job();
      aModel.userId = req.body.userId || jsontoken.getId(token);

      this.main
        .LoadActivity(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/deleteActivity", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.activity();
      aModel.activityCo = req.body.activityCo;

      this.main
        .DeleteActivity(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/addStaff", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.staff();
      aModel.staffCo = req.body.staffCo;
      aModel.firstName = req.body.firstName;
      aModel.lastName = req.body.lastName;
      aModel.email = req.body.email;
      aModel.phone = req.body.phone;
      aModel.password = req.body.password;
      aModel.cellPhone = "";

      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .addStaff(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.get("/api/main/loadStaff", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.job();

      let user = req.body.userId || jsontoken.getId(token);
      aModel.userId = user;

      this.main
        .loadStaff(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/deleteStaff", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.staff();
      aModel.staffCo = req.body.staffCo;

      this.main
        .deleteStaff(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/addTimeSheet", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.time();
      aModel.activityCo = req.body.activityCo;
      aModel.date = req.body.date;
      aModel.endTime = req.body.endTime;
      aModel.startTime = req.body.startTime;
      aModel.staffCo = req.body.staffCo;
      aModel.timeSheetCo = req.body.timeSheetCo;
      aModel.jobCo = req.body.jobCo;
      aModel.note = req.body.note;

      this.main
        .AddTime(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/saveAccount", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.account();

      aModel.adminName = req.body.adminName;
      aModel.adminEmail = req.body.adminEmail;
      aModel.adminPhone = req.body.adminPhone;
      aModel.companyName = req.body.companyName;
      aModel.password = req.body.password;
      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .CompanySave(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/saveSetting", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.account();

      aModel.accountantEmail = req.body.accountantEmail;
      aModel.accountantName = req.body.accountantName;
      aModel.startingDate = req.body.startingDate;

      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .SettingSave(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.get("/api/main/loadAccSetting", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.Mail();

      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .LoadCompany(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/loadTimeSheetStaffs", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.StaffTime();

      aModel.monthCo = req.body.monthCo;

      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      this.main
        .LoadStaffOfTimeSheet(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/loadDaysOfStaff", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.StaffTime();

      aModel.monthCo = parseInt(req.body.monthCo);
      aModel.staffCo = parseInt(req.body.staffCo);

      this.main
        .LoadDaysOfStaff(aModel)
        .then(data => {
          // data[24]['FldIN'].toLocalString();

          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/loadHoursOfDay", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.StaffTime();

      aModel.date = req.body.date;
      aModel.staffCo = req.body.staffCo;

      this.main
        .LoadStaffHoursOfDay(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/loadMonthId", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.time();
      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      aModel.date = req.body.date;
      this.main
        .LoadMonthId(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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
    
    this.router.get("/api/main/getServerDate", (req, res) => {
      // var token = req.headers["x-access-token"];
      // let status = jsontoken.checkToken(token);
      // if (status !== 200) {
      //   return res.status(status).send({
      //     msg: "fail"
      //   });
      // }

     
          var date = new Date();

          res.status(200).send({
            msg: "success",
            data: date,
            status: 200
          });
       
    });

    this.router.post("/api/main/deleteTime", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.time();

      aModel.timeSheetCo = req.body.timeSheetCo;

      this.main
        .deleteTimesheet(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/addLaunchTime", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.time();

      aModel.staffCo = req.body.staffCo;
      aModel.date = req.body.date;

      this.main
        .addLaunchTime(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/approveStaff", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.approve();

      aModel.staffCo = req.body.staffCo;
      aModel.monthCo = req.body.monthCo;
      aModel.isApproved = req.body.isApproved;

      this.main
        .ApproveStaff(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/approveCompany", (req, res) => {
      var token = req.headers["x-access-token"];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
        return res.status(status).send({
          msg: "fail"
        });
      }

      var aModel = new mainModel.approve();
      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      aModel.monthCo = req.body.monthCo;
      aModel.isApproved = req.body.isApproved;

      this.main
        .ApproveCompany(aModel)
        .then(data => {
          res.status(200).send({
            msg: "success",
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

    this.router.post("/api/main/sendApproveMail", (req, res) => {
      var token = req.headers['x-access-token'];
      let status = jsontoken.checkToken(token);
      if (status !== 200) {
          return res.status(status).send({
              msg: 'fail'
          });
      }

      var aModel = new mainModel.Mail();

      let company = req.body.companyCo || jsontoken.getCompany(token);
      aModel.companyCo = company;

      aModel.file = req.body.file;
      aModel.fileName = req.body.fileName;

      let file = req.body.file;
      let fileName = aModel.fileName;
      
      if (file.length > 50) {
        let p = path.resolve(__dirname, "../reports/levan-");
        // let d = writeFileSync(p +fileName, file, "base64");
        base64topdf.base64Decode(file.split(",")[1], p + fileName);
      }

      this.main
        .LoadCompany(aModel)
        .then(data => {
          if (data[0]["FldAccountantEmail"]) {
            sendMail.send(1, data[0]["FldAccountantEmail"], fileName, '');
            res.status(200).send({
              msg: "success",
              data: data,
              status: 200
            });
          }
        })
        .catch(reason => {
          res.status(400).send({
            reason
          });
        });
    });
  }
}
export default new MainController().router;
