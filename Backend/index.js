const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectToDB = require('./config/connectToDB');
const fetchMetaDataRoutes = require('./Routes/fetchMetaDataRoutes')

connectToDB();

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 1000,
    max: 5
});

app.use('/api', limiter, fetchMetaDataRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server connecting to port: ${port}`);
});