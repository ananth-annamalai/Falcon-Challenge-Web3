const ipfsClient = require('ipfs-http-client');
var fs = require('fs')


const projectId = process.env.INFURA_PROJECT_ID
const projectSecret = process.env.INFURA_PROJECT_SECRET
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const getInfuraClient = async (auth) => {
    return await ipfsClient.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });
}

const addFileToInfura = async (fileObj) => {
    const file = fs.readFileSync(fileObj.path);
    client = await getInfuraClient(auth)
    return await client.add(file)
}

module.exports = addFileToInfura