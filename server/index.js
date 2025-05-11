
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});