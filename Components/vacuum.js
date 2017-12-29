const request = require('request');

class Vacuum{
    constructor(name, desination){
        this.desination = desination;
        this.name = name;
    }
    getSync(){
        return [
            {
                "id": this.name,
                "type": "action.devices.types.VACUUM",
                "traits": [
                    "action.devices.traits.StartStop",
                    "action.devices.traits.Dock"
                ],
                "name": {
                    "name": "Vacuum",
                },
                "willReportState": false,
                "attributes": {
                },
                "customData": {
                    'component':this.name
                }
            }
        ]
    }
    executeDevice(device, execution){
        return new Promise((resolve, reject)=>{
            let action = execution[0].command;
            if(action =='action.devices.commands.StartStop'){
                
                let start = execution[0].params.start;
                let url = (start)?'start':'stop';

                request.get('http://job.pevecyan.com:3000/vacuum/'+url, {},(err,response)=>{
                    resolve({
                        'ids':[device.id],
                        'status':'SUCCESS',
                        "states": {
                            "isRunning": true,
                            "isPaused": !start
                         }
                    });
                });
                
            }
            else if(action == 'action.devices.commands.Dock'){
                request.get('http://job.pevecyan.com:3000/vacuum/dock', {},(err,response)=>{
                    resolve({
                        'ids':[device.id],
                        'status':'SUCCESS',
                        "states": {
                            "isDocked": true,
                         }
                    });
                });
            }
            
        })
    }
}

module.exports = Vacuum;