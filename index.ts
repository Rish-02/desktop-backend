// import express, {Express, Request, Response} from 'express';
// const port = 8000;

// const app:Express =express();

// app.get("/",(req:Request, res:Response) => {
//     res.send("Hhjvbjhvhjjh");
// });

// app.get("/hi",(req:Request, res:Response) => {
//     res.send("Hhhjjh");
// });

// app.listen(port, () => {
//     console.log(`done ${port}`);
// });

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { log } from 'console';

const app = express();
const port = 3000;
const dbFile = 'db.json';

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    res.send(true);
});

app.get("/",(req, res) => {
    res.send("Hhjvbjhvhjjh");
});

app.post('/submit', (req, res) => {
    const { name, email, phoneNumber, gitHubRepo } = req.body;
    const newSubmission = { name, email, phoneNumber, gitHubRepo };

    let submissions = [];
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf8');
        submissions = JSON.parse(data);
    }
    console.log(newSubmission)
    submissions.push(newSubmission);
    fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));

    res.status(201).send(newSubmission);
});

app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);
    // console.log("data ");
    console.log("reading data " + index);
    
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf8');
        const submissions = JSON.parse(data);

        console.log(submissions);
        
        let sendSub = []

        if (index >= 0 && index < submissions.length) {
            sendSub.push(submissions[index])
            res.send(sendSub);
        } else {
            res.status(404).send('Submission not found');
        }
    } else {
        res.status(404).send('No submissions found');
    }
});

app.get('/delete', (req, res) => {
    const index = parseInt(req.query.index as string);
    console.log("reached delete " + index);
    

    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf8');
        const submissions = JSON.parse(data);

        if (index >= 0 && index < submissions.length) {
            console.log("reached inside delete");
            
            submissions.splice(index, 1);
            fs.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));

            res.status(200).send('Submission deleted');
        } else {
            res.status(404).send('Submission not found');
        }
    } else {
        res.status(404).send('No submissions found');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
