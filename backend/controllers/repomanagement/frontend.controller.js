const commandHandler        = require('../../_helpers/execute-commands');
const configHandler         = require('../../_helpers/config-handler');
const CONSTANTS             = require('../../configs/constants').constants
const commonactions         = require('./_helpers/commonactions');

pullChanges = async (req, res) => {
    const branch = req.body.branch
    const projectFullpath = await configHandler.retreiveConfigVar(CONSTANTS.frontendFullPathVarname)
    return await commonactions.pullchanges(req, res, branch, projectFullpath);
}

installPackages = async (req, res) => {
    const projectFullpath = await configHandler.retreiveConfigVar(CONSTANTS.frontendFullPathVarname)
    return await commonactions.installNPMPkgs(req, res, projectFullpath);
}

deleteServerFolder = async (req, res) => {
    const projectBuildFolderVarname = await configHandler.retreiveConfigVar(CONSTANTS.projectBuildFolderVarname)
    const deploymentFolderVarname = await configHandler.retreiveConfigVar(CONSTANTS.deploymentFolderVarname)
    if(deploymentFolderVarname != null || projectBuildFolderVarname != null){
        return await commonactions.commandExecution(req, res, `rm -rf ${deploymentFolderVarname}${projectBuildFolderVarname} `);
    }
    return res.status(200).json({status: "false", message: "deploymentFolderVarname or projectBuildFolderVarname NOT found"}); 
}

moveDistToServerFolder = async (req, res) => {
    const projectFullpath = await configHandler.retreiveConfigVar(CONSTANTS.frontendFullPathVarname)
    const projectBuildFolderVarname = await configHandler.retreiveConfigVar(CONSTANTS.projectBuildFolderVarname)
    const deploymentFolderVarname = await configHandler.retreiveConfigVar(CONSTANTS.deploymentFolderVarname)

    return await commonactions.commandExecution(req, res, 
        `cp -R ${projectFullpath}/dist/${projectBuildFolderVarname} ${deploymentFolderVarname}${projectBuildFolderVarname} `);
}

buildProd = async (req, res) => {
    const projectFullpath = await configHandler.retreiveConfigVar(CONSTANTS.frontendFullPathVarname)
    return await commonactions.commandExecution(req, res, `cd ${projectFullpath} && ng build --prod`);
}

module.exports = {
    pullChanges,
    installPackages,
    deleteServerFolder,
    moveDistToServerFolder,
    buildProd
}