export class job {
    public jobCo: number;
    public jobNumber: string;
    public jobTypeCo: number;
    public companyCo: number;
    public clientName: string;
    public address: string;
    public startDate: string;
    public userId: number;

}

export class jobType {
    public jobTypeCo: number;
    public typeDesc: string;
    public companyCo: number;
}

export class activity {
    public activityDesc: string;
    public companyCo: number;
    public activityCo: number;
}


export class staff {
    public staffCo: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public cellPhone: string;
    public phone: string;
    public password: string;
    public companyCo: number;
}

export class time {
    public timeSheetCo: number;
    public jobCo: number;
    public staffCo: number;
    public activityCo: number;
    public note: string;
    public date: string;
    public startTime: string;
    public endTime: string;
    public companyCo: number;

}

export class account {
    public companyCo: number;
    public startingDate: string;
    public adminName: string;
    public adminFamily: string;
    public adminEmail: string;
    public adminPhone: string;
    public accountantName: string;
    public accountantFamily: string;
    public accountantEmail: string;
    public accountantPhone: string;
    public companyName: string;
    public password: string;
}

export class StaffTime {
    public companyCo: number;
    public monthCo: number;
    public staffCo: number;
    public date: string;
}

export class Mail {
    public email: string;
    public companyCo: number;
    public file: string;
    public fileName: string;

}

export class approve {
    public companyCo: number;
    public staffCo: number;
    public monthCo: number;
    public isApproved: number;
}