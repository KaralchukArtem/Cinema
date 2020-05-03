const mongoose = require('mongoose');

const Lower_Admin_RightsSchema = new mongoose.Schema({
    flag:Boolean,
    key:String
})

const AccountSchema = new mongoose.Schema({
    email:String,
    nickname:String,
    password:String,
    lower_admin_rights:Lower_Admin_RightsSchema
})

exports.AccountSchema = AccountSchema;