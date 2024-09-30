const express = require('express')
var Datastore = require('nedb')

var db_usr = new Datastore({filename: 'users'});
db_usr.loadDatabase()

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.post('/api/add-user', (req, res) => {
    db_usr.insert(req.body)
    res.end(JSON.stringify({success: true}))
})

app.post('/api/get-user', (req, res) => {
    db_usr.find(req.body, (err, docs) => {
        if (err)
        return;
        
        docs = docs[0];
        res.end(JSON.stringify({docs}));
    });
})

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})