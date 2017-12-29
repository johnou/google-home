const Datastore = require('nedb-core');
const crypto = require('crypto');
const config = require('../config');

class Users{
    constructor(){
        this.db = new Datastore({filename:__dirname+'/data/users.db',autoload:true});
        this.db.ensureIndex({ fieldName: 'username', unique: true }, function (err) {});
        
        this.db.update({username:config.admin.username},{username:config.admin.username, password:config.admin.password}, {upsert:true}, (err,docs)=>{})
    }

    hashPassword(password){
        return crypto.createHmac('sha256',config.hashSecret).update(password).digest('hex');
    }
}

module.exports = Users;