
import express from 'express';
import cors from 'cors';
import connectToDB from './src/db.js'

const app = express();
connectToDB();
app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});