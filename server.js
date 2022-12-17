import express from 'express'
import postgres from 'postgres'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

let app = express(), sql = postgres({database: 'todo_list'});
let port = process.env.PORT

// middleware ============================

app.use(express.json());
app.use(cors())
app.use('./views', express.static("./views"));


// get routes ===========================

app.get('/', (req, res) => {
    res.render('./view/index.html')
})

app.get('/test', (req, res) => {
    sql`SELECT * FROM list`.then((result) => {
        console.log(result)
    })
})

// post routes ==========================

app.post('/', (req, res) => {
    sql`INSERT INTO list(task, summary, category) VALUES('lift weights', 'go pick heavy things up and put them back down', 'fitness')`
        sql`SELECT * FROM list`.then(result => { console.log(result)})
    
})

// listener ==============================
app.listen(port, () => {
    console.log('live on the air' + port )
})