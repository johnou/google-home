const express = require('express');
const storage = require('../Storage');

const router = express.Router();

router.get('/health', (req,res)=>{
    console.log('OK');
})

router.get('/', (req,res)=>{
    let {client_id, redirect_uri,state,scope,response_type} = req.query;
    let authCode = 'randomAuthCode';
    res.redirect(`${redirect_uri}?code=${authCode}&state=${state}`);
})

router.post('/token', (req,res)=>{
    let {client_id,client_secret,grant_type,code,redirect_uri} = req.body;
    if(grant_type == 'authorization_code'){
        let refresh = 'refreshMe';
        let access = 'access';
        res.json({
            token_type:'bearer',
            access_token:access,
            refresh_token:refresh,
            expires_in:24*60*60
        })
    }
    else if(grant_type == 'refresh_token'){
        let access = 'access';
        res.json({
            token_type:'bearer',
            access_token:access,
            expires_in:24*60*60
        })
    }
})

module.exports = router;