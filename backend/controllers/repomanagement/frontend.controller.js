const dbmanager                 = require('../../_helpers/db-manager');
const commonactions             = require('./_helpers/commonactions');
const tablename                 = "global_vars";
const frontendFullPathRowName    = "frontendFullPath";
const projectBuildFolderRowName = "projectBuildFolder";
const deploymentFolderRowName   = "deploymentFolder";

pullChanges = async (req, res) => {
    const branch = req.body.branch
    const projectFullpathQuery  = await dbmanager.get(tablename, {name: frontendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    return await commonactions.pullchanges(req, res, branch, projectFullpath);
}

installPackages = async (req, res) => {
    const projectFullpathQuery = await dbmanager.get(tablename, {name: frontendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    return await commonactions.installNPMPkgs(req, res, projectFullpath);
}

deleteServerFolder = async (req, res) => {
    const projectBuildFolderVarnameQuery = await dbmanager.get(tablename, {name: projectBuildFolderRowName}, 1);
    const projectBuildFolderVarname = projectBuildFolderVarnameQuery.data.value;

    const deploymentFolderVarnameQuery = await dbmanager.get(tablename, {name: deploymentFolderRowName}, 1);
    const deploymentFolderVarname = deploymentFolderVarnameQuery.data.value;

    if(deploymentFolderVarname != null || projectBuildFolderVarname != null){
        return await commonactions.commandExecution(req, res, `rm -rf ${deploymentFolderVarname}${projectBuildFolderVarname} `);
    }
    return res.status(200).json({status: "false", message: "deploymentFolderVarname or projectBuildFolderVarname NOT found"}); 
}

moveDistToServerFolder = async (req, res) => {
    const projectFullpathQuery = await dbmanager.get(tablename, {name: frontendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    
    const projectBuildFolderVarnameQuery = await dbmanager.get(tablename, {name: projectBuildFolderRowName}, 1);
    const projectBuildFolderVarname = projectBuildFolderVarnameQuery.data.value;

    const deploymentFolderVarnameQuery = await dbmanager.get(tablename, {name: deploymentFolderRowName}, 1);
    const deploymentFolderVarname = deploymentFolderVarnameQuery.data.value;

    return await commonactions.commandExecution(req, res, 
        `cp -R ${projectFullpath}dist/${projectBuildFolderVarname} ${deploymentFolderVarname}${projectBuildFolderVarname} `);
}

buildProd = async (req, res) => {
    const projectFullpathQuery = await dbmanager.get(tablename, {name: frontendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    
    return await commonactions.commandExecution(req, res, `cd ${projectFullpath} && ng build --prod`);
}

module.exports = {
    pullChanges,
    installPackages,
    deleteServerFolder,
    moveDistToServerFolder,
    buildProd
}