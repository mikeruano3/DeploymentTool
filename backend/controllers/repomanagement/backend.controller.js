const dbmanager                 = require('../../_helpers/db-manager');
const commonactions             = require('./_helpers/commonactions');
const tablename                 = "global_vars";
const backendFullPathRowName    = "backendFullPath";
const PM2projectNameRowName     = "PM2projectName";

pullChanges = async (req, res) => {
    const branch = req.body.branch;
    const projectFullpathQuery  = await dbmanager.get(tablename, {name: backendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    return await commonactions.pullchanges(req, res, branch, projectFullpath);
}

installPackages = async (req, res) => {
    const projectFullpathQuery  = await dbmanager.get(tablename, {name: backendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    return await commonactions.installNPMPkgs(req, res, projectFullpath);
}

runTests = async (req, res) => {
    const projectFullpathQuery  = await dbmanager.get(tablename, {name: backendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    return await commonactions.commandExecution(req, res, `cd ${projectFullpath} && npm test`);
}

reloadPM2Proj = async (req, res) => {
    const PM2projectNameQuery  = await dbmanager.get(tablename, {name: PM2projectNameRowName}, 1);
    const PM2projectName  = PM2projectNameQuery.data.value;
    return await commonactions.commandExecution(req, res, `pm2 restart ${PM2projectName}`);
}

startPM2Proj = async (req, res) => {
    const projectFullpathQuery  = await dbmanager.get(tablename, {name: backendFullPathRowName}, 1);
    const projectFullpath  = projectFullpathQuery.data.value;
    
    const PM2projectNameQuery  = await dbmanager.get(tablename, {name: PM2projectNameRowName}, 1);
    const PM2projectName  = PM2projectNameQuery.data.value;
    return await commonactions.commandExecution(req, res, `pm2 start ${projectFullpath}index.js --name ${PM2projectName} --watch --log logs.log`);
}

module.exports = {
    pullChanges,
    installPackages,
    runTests,
    reloadPM2Proj,
    startPM2Proj
}