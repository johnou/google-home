const request = require('request');

class Sonoff{
    constructor(name, destination){
        this.destination = destination;
        this.name = name;
    }

    getSync(){
        return new Promise((resolve, reject)=>{
            request.get(this.destination+'/devices', {},(err,response, body)=>{
                if(!err && response.statusCode == 200){
                    let devices = JSON.parse(body);
                    let result = this._prepareDevices(devices);
                    resolve(result);
                }else{
                    resolve([]);
                }
            })
        })
    }

    executeDevice(device, execution){
        return new Promise((resolve, reject)=>{
            let turnOn = (execution[0].params.on)?'on':'off';
            request.get(this.destination+'/devices/'+device.id+'/'+turnOn, {}, (err,response, body)=>{
                resolve({
                    'ids':[device.id],
                    'status':'SUCCESS',
                    'states':{
                        'on':true,
                        'online':true
                    }
                });
            })
        })
    }

    _prepareDevices(devices){
        let result = [];
        let id = 0;
        devices.forEach(devices=>{
            result.push({
                id:devices.id,
                type:"action.devices.types.OUTLET",
                "traits": [
                    "action.devices.traits.OnOff"
                ],
                "name": {
                    "name": this.name+'-'+id,
                },
                "willReportState": false,
                "customData": {
                    'component':this.name
                }
            })
            id++;
        })
        return result;
    }
}

module.exports = Sonoff;