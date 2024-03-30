const mongoDB = require('./db')
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req,res) => {
    res.send("Hello world")
})

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json())

app.use('/api', require('./Routes/createUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

mongoDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})