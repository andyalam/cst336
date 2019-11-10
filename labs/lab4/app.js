const express = require('express');
const app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/mercury', (req, res) => {
    res.send('This will be the mercury web page');
});

app.get('/venus', (req, res) => {
    res.send('This will be the Venus web page');
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express Server is running...');
});
