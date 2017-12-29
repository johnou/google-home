const Dummy = require('./dummy');
const Kronika = require('./kronika');
const Vacuum = require('./vacuum');

class Components{
    constructor(){
        this.components = [
            new Dummy('dummy'),
            new Kronika('kronika','http://job.pevecyan.com:3000'),
            new Vacuum('vacuum', 'http://job.pevecyan.com:3000')
        ]
    }
    
    getSync(){
        let devices = [];
        this.components.forEach(component=>{
            devices = devices.concat(component.getSync());
        })
        return devices;
    }
}

module.exports = Components;