
import express from 'express'
import postgres from 'postgres'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config() // applies enviornment variables from .env file

let app = express();
let sql = postgres(process.env.DATABASE_URL);
let port = process.env.PORT;

// middleware ============================

app.use(express.json());
app.use(cors()) // cross browser stuff
app.use(express.static("./views")); // looking for html file(serve it to port), 


// get routes ===========================


// delete routes =================================
app.delete('/deletedTask', (req, res) => {

    let task = req.body;
    let {name} = task
    sql`DELETE FROM task WHERE name = ${name} RETURNING *`.then((result) => {
        res.json(result)
    });
});// done

// post routes ==========================

app.post('/task', (req, res) => {
    let task = req.body; // how to get req.body to = new-task
    let {name} = task
    sql`INSERT INTO task(name) VALUES(${name}) RETURNING *`.then((result) => {
        res.send(result[0]) 
    })
    
})

// put route ===============
app.put('/editedtask', (req, res) => { //need to hit edit button 2 times
    let task = req.body;
    let {name, edit} = task
    sql`UPDATE task SET name = ${edit} WHERE name = ${name} RETURNING *`.then(result => {
        res.send(result)
    })
})

// listener ==============================
app.listen(port, () => {
    console.log('live on the air' + port )
})