const fsprom                = require('fs').promises;
const CONSTANTS             = require('../configs/constants').constants

retreiveConfigVar = async(varname)=>{
    const data = await fsprom.readFile(CONSTANTS.configfilelocation, 'utf8')
    const objectData = JSON.parse(data);
    for (const [key, value] of Object.entries(objectData)) {
        if(key == varname){
            return value   
        } 
    }
    return null
}

module.exports = {
    retreiveConfigVar
}