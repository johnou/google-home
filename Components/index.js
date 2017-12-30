const Dummy = require('./dummy');
const Kronika = require('./kronika');
const Vacuum = require('./vacuum');
const Sonoff = require('./sonoff');

class Components{
    constructor(){
        this.components = [
            new Dummy('dummy'),
            new Kronika('kronika','http://job.pevecyan.com:3000'),
            new Vacuum('vacuum', 'http://job.pevecyan.com:3000'),
            new Sonoff('sonoff', 'http://job.pevecyan.com:3000/sonoff')
        ]
    }
    
    getSync(){
        return new Promise((resolve, reject)=>{
            let syncPromises = [];
            this.components.forEach(component=>{
                syncPromises.push(component.getSync());
                //devices = devices.concat(component.getSync());
            })
            Promise.all(syncPromises)
                .then(responses=>{
                    let devices = [];
                    responses.forEach(response=>{
                        devices = devices.concat(response);
                    })
                    resolve(devices);
                })
        })
        
    }
}

module.exports = Components;