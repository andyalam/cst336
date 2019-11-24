const express = require('express');

const { getRandomImages_cb, getRandomImages_promise, createConnection } = require('./utils');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', async (req, res) => {
    const { keyword } = req.query;
    const imageUrls = await getRandomImages_promise('', 1);
    res.render('index', { imageUrls });
});

app.get('/search', async (req, res) => {
    const { keyword } = req.query;
    
    // Callback approach
    // getRandomImages_cb(keyword, 9, (imageUrls) => res.render('results', { imageUrls }));
    
    // Promise approach
    const imageUrls = await getRandomImages_promise(keyword, 9);
    res.render('results', { imageUrls, keyword });
});

app.get('/keywords', async (req, res) => {
   const imageUrls = await getRandomImages_promise('', 1);
   const connection = createConnection();
   const sql = `
    SELECT DISTINCT keyword
    FROM favorites
    ORDER BY keyword
   `;
   
   connection.connect((err) => {
       if (err) throw err;
       connection.query(sql, (err, rows) => {
           if (err) throw err;
           res.render('favorites', { rows, imageUrls });
       });
   });
});

app.get('/api/favorite', (req, res) => {
    const connection = createConnection();
    let sql, sqlParams;
    
    if (req.query.action === 'add') {
        sql = `
            INSERT INTO favorites (imageUrl, keyword)
            VALUES (?, ?)
        `;
        sqlParams = [req.query.imageUrl, req.query.keyword];
    } else {
        sql = `
            DELETE FROM favorites
            WHERE imageUrl = ?
        `;
        sqlParams = [req.query.imageUrl];
    }
    
    connection.connect((err) => {
        if (err) throw err;
        
        connection.query(sql, sqlParams, (err, result) => {
           if (err) throw err;
           res.send('it works');
        });
    });
    
});

app.get('/api/displayFavorites', (req, res) => {
    const connection = createConnection();
    const sql = `
        SELECT imageUrl
        FROM favorites
        WHERE keyword = ?
    `;
    const sqlParams = [req.query.keyword];
    
    connection.connect((err) => {
        if (err) throw err;
        
        connection.query(sql, sqlParams, (err, results) => {
           if (err) throw err;
           
           res.send(results);
        });
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express Server is running');
});