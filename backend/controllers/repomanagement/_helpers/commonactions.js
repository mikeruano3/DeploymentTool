const commandHandler        = require('../../../_helpers/execute-commands');

commandExecution = async(req, res, command) =>{
    let result = await commandHandler.executeCommandReturn(command); 
    if(result.stderr.stderr){
        message = `ERROR: ${result.stderr.stderr} , STATUS CODE: ${result.stderr.code}, SIGNAL: ${result.stderr.signal}, `+
            `COMMAND: '${result.stderr.cmd}', `;
        return res.status(200).json({status: "false", message: message, data: result});    
    }
    return res.status(200).json({status: "true", message: result.stdout, data: result});
}

pullchanges = async (req, res, branch, repoFullPath) => {
    const command = `cd ${repoFullPath} && git checkout ${branch} && git pull`
    return await commandExecution(req, res, command);
}

installNPMPkgs = async (req, res, repoFullPath) => {
    const command = `cd ${repoFullPath} && npm install`
    return await commandExecution(req, res, command);
}

module.exports = {
    commandExecution,
    pullchanges,
    installNPMPkgs
}