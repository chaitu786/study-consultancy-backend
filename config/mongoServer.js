let dataBaseConnection
async function mongoServer(client) {
    dataBaseConnection = await client.connect();
    console.log('Connected successfully to server');
    return 'done.';
}

module.exports = { mongoServer,dataBaseConnection}
  