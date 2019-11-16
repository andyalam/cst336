const express = require('express');
const faker = require('faker');

const app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.get('/', (req, res) => {
    const email = faker.internet.email();
    res.render('index.ejs', {
        title: 'Computer Science',
        email
    });
});

app.get('/methodologies', (req, res) => {
    const email = faker.internet.email();
    res.render('methodologies.ejs', {
        title: 'Methodologies',
        email
    });
});

app.get('/typescript', (req, res) => {
    const email = faker.internet.email();
    res.render('typescript.ejs', {
        title: 'Typescript',
        email
    });
});

app.get('/os', (req, res) => {
    const email = faker.internet.email();
    res.render('operating-systems.ejs', {
        title: 'Operating Systems',
        email
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
   console.log('Express Server is running...'); 
});