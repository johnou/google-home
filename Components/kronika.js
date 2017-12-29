const request = require('request');


class Kronika{
    constructor(name, destination){
        this.destination = destination;
        this.name = name;
    }
    getSync(){
        return [
            {
                "id": this.name,
                "type": "action.devices.types.SCENE",
                "traits": [
                    "action.devices.traits.Scene"
                ],
                "name": {
                    "name": "Morning news",
                },
                "willReportState": false,
                "attributes": {
                    "sceneReversible": false
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
            if(action =='action.devices.commands.ActivateScene'){
                let today = new Date();
                let url = 'http://videoweb.rtvslo.si/podcast/ava_archive04/{year}/{month}/{day}/PrvajutranjakronikaINFO1PR.mp3'
                let month = (today.getMonth()+1);
                let day = (today.getDate()-1);
                month = (((today.getMonth()+1)+'').length == 1)?'0':''+month;
                day = (((today.getDate())+'').length == 1)?'0':''+day;
                url = url.replace('{year}', today.getFullYear()).replace('{month}', month).replace('{day}',day);
                url = encodeURIComponent(url);
                request.get('http://job.pevecyan.com:3000/play/'+url, {},(err,response)=>{
                    resolve({
                        'ids':[device.id],
                        'status':'SUCCESS',
                    });
                });
                
            }
            
        })
    }
}

module.exports = Kronika;