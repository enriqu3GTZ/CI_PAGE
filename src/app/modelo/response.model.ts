export class ResponseModel<T>{
    success:boolean;
    message:string;
    obj:T;
    list:T[];

    constructor(success:boolean, message:string, obj:T, list:T[]){
            this.success = success;
            this.list = list;
            this.obj = obj;
            this.message = message
    }
}