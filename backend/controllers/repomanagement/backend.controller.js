const commandHandler        = require('../../_helpers/execute-commands');
const configHandler         = require('../../_helpers/config-handler');
const CONSTANTS             = require('../../configs/constants').constants
const commonactions         = require('./_helpers/commonactions');

pullChanges = async (req, res) => {
    const branch = req.body.branch
    const backendFullPath = await configHandler.retreiveConfigVar(CONSTANTS.backendFullPathVarname)
    return await commonactions.pullchanges(req, res, branch, backendFullPath);
}

installPackages = async (req, res) => {
    const backendFullPath = await configHandler.retreiveConfigVar(CONSTANTS.backendFullPathVarname)
    return await commonactions.installNPMPkgs(req, res, backendFullPath);
}

runTests = async (req, res) => {
    const backendFullPath = await configHandler.retreiveConfigVar(CONSTANTS.backendFullPathVarname)
    return await commonactions.commandExecution(req, res, `cd ${backendFullPath} && npm test`);
}

reloadPM2Proj = async (req, res) => {
    const PM2projectName = await configHandler.retreiveConfigVar(CONSTANTS.PM2projectNameVarname)
    return await commonactions.commandExecution(req, res, `pm2 restart ${PM2projectName}`);
}

startPM2Proj = async (req, res) => {
    const backendFullPath = await configHandler.retreiveConfigVar(CONSTANTS.backendFullPathVarname)
    const PM2projectName = await configHandler.retreiveConfigVar(CONSTANTS.PM2projectNameVarname)
    return await commonactions.commandExecution(req, res, `pm2 start ${backendFullPath}index.js --name ${PM2projectName} --watch --log logs.log`);
}

module.exports = {
    pullChanges,
    installPackages,
    runTests,
    reloadPM2Proj,
    startPM2Proj
}