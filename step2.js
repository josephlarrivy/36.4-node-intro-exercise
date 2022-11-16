const fs = require('fs');
const process = require('process');
const axios = require('axios');

// ###########################

let path = process.argv[2];

if (path.startsWith('www.')) {
    webCat(path);
} else if (path.startsWith('http')) {
    webCat(path);
} else {
    cat(path)
};

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`file contents: ${data}`);
    });
}
