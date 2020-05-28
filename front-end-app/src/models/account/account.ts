import { Lower_admin_rights } from './lower_admin_rights';

export class AccountModel{
    email:String;
    nickname:String;
    password:String;
    lower_admin_rights = new Lower_admin_rights();
}