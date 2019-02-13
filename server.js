const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');



const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
