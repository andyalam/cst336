const request = require('request');
const mysql = require('mysql');

/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int    imageCount - number of random images
 * @param function callback
 */
module.exports.c = (keyword, imageCount, callback) => {
    const url = `https://api.unsplash.com/photos/random?client_id=2d226f550d9245f77d8b64cdde73e1855598f475cc8f97b8319c1de25e785ac7&orientation=landscape&count=9&query=${keyword}`;
    request(url, (error, response, body) => {
        if (error) {
            console.log(error); // TODO update.
        }
        
        const parsedData = JSON.parse(body);
        const imageUrls = (parsedData || []).map(data => data.urls.regular);
        
        callback(imageUrls);
    });
};

/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param number    imageCount - number of random images
 * @return Promise<Array<string>> of image URLs
 */
module.exports.getRandomImages_promise = (keyword, imageCount) => {
    const url = `https://api.unsplash.com/photos/random?client_id=2d226f550d9245f77d8b64cdde73e1855598f475cc8f97b8319c1de25e785ac7&orientation=landscape&count=9&query=${keyword}`;
    
    return new Promise((resolve, reject) => { 
        request(url, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            
            const parsedData = JSON.parse(body);
            const imageUrls = (parsedData || []).map(data => data.urls.regular);
            resolve(imageUrls);
        });
    });
};

module.exports.createConnection = () => mysql.createConnection({
    host: 'cst336db.space',
    user: 'cst336_dbUser024',
    password: 'rygiam',
    database: 'cst336_db024'
});