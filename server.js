'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./models')
const router = require('./routes/user.routes');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello from the other side')
});
app.use(router)
db.sequelize.sync().then(() => {
    app.listen(3000, () => console.log('up and running on port 3000'))
})
