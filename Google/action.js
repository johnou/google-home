const express = require('express');
const Components = require('../Components');

let components = new Components();

const router = express.Router();

router.get('/',(req,res)=>{
    debugger;
})

router.post('/',(req,res)=>{
    let accessCode = getAccessCode(req.headers['authorization']);
    handleRequest(req.body, accessCode) 
        .then(response=>{
            res.json(response);
        })
})

function handleRequest(request, accessCode){
    switch(request.inputs[0].intent){
        case 'action.devices.SYNC':
            return handleSync(request, accessCode);
            break;
        case 'action.devices.EXECUTE':
            return handleExecute(request, accessCode);
            break;
        default:
            return Promise.resolve({});
    }
}

function handleSync(request, accessCode){
    return new Promise((resolve, reject)=>{
        console.log('Handle Sync');
        let devices = components.getSync();
        let response= {
            "requestId": request.requestId,
            "payload": {
              "agentUserId": "pevechome",
              "devices": devices
            }
        }
        console.log(response);
        resolve(response);
    })
}

function handleExecute(request, accessCode){
    return new Promise((resolve, reject)=>{
        console.log('Handle exec', request);
        let commands = request.inputs[0].payload.commands;
        let results = [];
        
        commands.forEach(command=>{
            let execution = command.execution;
            let devices  =command.devices;
            devices.forEach(device=>{
                let componentName = device.customData.component;
                let component =  components.components.find(c=>c.name == componentName);
                if(component)
                    results.push(component.executeDevice(device, execution));
            })
        })
        Promise.all(results)
            .then(responses=>{
                let response= {
                    "requestId": request.requestId,
                    "payload": {
                        "commands": responses
                    }
                }
                console.log(response);
                resolve(response);
            })
    });
}

function getAccessCode(header){
    if(header.indexOf('Bearer') > -1){
        return header.split(' ')[1];
    }
    return '';
}

module.exports = router;