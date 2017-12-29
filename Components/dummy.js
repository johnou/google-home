

class Dummy{
    constructor(name){
        this.name = name
    }
    getSync(){
        return [
            {
                "id": "someRandomId",
                "type": "action.devices.types.OUTLET",
                "traits": [
                    "action.devices.traits.OnOff"
                ],
                "name": {
                    "defaultNames": ["My Outlet 1234"],
                    "name": "Night light",
                    "nicknames": ["wall plug"]
                },
                'roomHint':'Bedroom',
                "willReportState": false,
                "customData": {
                    'component':this.name
                }
            }
        ]
    }
    executeDevice(device, execution){
        return new Promise((resolve, reject)=>{
            resolve({
                'ids':[device.id],
                'status':'SUCCESS',
                'states':{
                    'on':true,
                    'online':true
                }
            });
        })
    }
}

module.exports = Dummy;