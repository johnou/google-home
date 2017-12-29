const Dummy = require('./dummy');
const Kronika = require('./kronika');

class Components{
    constructor(){
        this.components = [
            new Dummy('dummy'),
            new Kronika('kronika','http://job.pevecyan.com:3000')
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