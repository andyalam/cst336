const express = require('express');
const request = require('request');
const mysql = require('mysql');

const { getRandomImages_cb, getRandomImages_promise } = require('./utils');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', async (req, res) => {
    const { keyword } = req.query;
    
    // Callback approach
    // getRandomImages_cb(keyword, 9, (imageUrls) => res.render('results', { imageUrls }));
    
    // Promise approach
    const imageUrl = await getRandomImages_promise('', 1);
    res.render('index', { imageUrl });
});

app.get('/search', async (req, res) => {
    const { keyword } = req.query;
    
    // Callback approach
    // getRandomImages_cb(keyword, 9, (imageUrls) => res.render('results', { imageUrls }));
    
    // Promise approach
    const imageUrls = await getRandomImages_promise(keyword, 9);
    res.render('results', { imageUrls });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express Server is running');
});