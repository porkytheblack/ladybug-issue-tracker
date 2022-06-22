const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient("mongodb+srv://don:gOJPGMmzISZFBo1Y@cluster0.kpjnu.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client
