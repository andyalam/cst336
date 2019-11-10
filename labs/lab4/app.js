const express = require('express');
const app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/mercury', (req, res) => {
    res.render('mercury.html');
});

app.get('/venus', (req, res) => {
    res.render('venus.html');
});

app.get('/earth', (req, res) => {
    res.render('earth.html');
});

app.get('/mars', (req, res) => {
    res.render('mars.html');
});


app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express Server is running...');
});
