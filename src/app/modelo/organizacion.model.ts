import { SocialMedia } from "./social-media.model";

export class OrganizationModel{
    _id:string = "";
    description:string = "";
    firstname:string= "";
    lastname:string= "";
    name:string= "";
    email:string= "";
    phone:string = "";
    socialMedia:SocialMedia[] = [];
    updateID:string = ""
}