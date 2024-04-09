const { Client } = require('pg');
async function getConnection()
{
    var connection = new Client({
        "connectionString" : "postgresql://Elearning_owner:enqpMoDgm50C@ep-mute-sunset-a5i7p0xq.us-east-2.aws.neon.tech/Elearning?sslmode=require"
    });
    connection.connect();
    return connection;
}
module.exports = { getConnection };