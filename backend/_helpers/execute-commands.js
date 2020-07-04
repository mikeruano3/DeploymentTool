const util                  = require('util');
const execPromise           = util.promisify(require('child_process').exec);

exports.executeCommandReturn = async(command) => {
    try {
        const { stdout, stderr } = await execPromise(command);
        return {stdout : stdout, stderr: stderr}
    } catch (e) {
        return {stdout : "", stderr: e}
    }
}