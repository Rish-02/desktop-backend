"use strict";
// import express, {Express, Request, Response} from 'express';
// const port = 8000;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
const dbFile = 'db.json';
app.use(body_parser_1.default.json());
app.get('/ping', (req, res) => {
    res.send(true);
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link } = req.body;
    const newSubmission = { name, email, phone, github_link };
    let submissions = [];
    if (fs_1.default.existsSync(dbFile)) {
        const data = fs_1.default.readFileSync(dbFile, 'utf8');
        submissions = JSON.parse(data);
    }
    submissions.push(newSubmission);
    fs_1.default.writeFileSync(dbFile, JSON.stringify(submissions, null, 2));
    res.status(201).send(newSubmission);
});
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index);
    if (fs_1.default.existsSync(dbFile)) {
        const data = fs_1.default.readFileSync(dbFile, 'utf8');
        const submissions = JSON.parse(data);
        if (index >= 0 && index < submissions.length) {
            res.send(submissions[index]);
        }
        else {
            res.status(404).send('Submission not found');
        }
    }
    else {
        res.status(404).send('No submissions found');
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
