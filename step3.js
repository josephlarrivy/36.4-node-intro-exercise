const fs = require('fs');
const process = require('process');
const axios = require('axios');

// ###########################

if (process.argv[2] === '--out') {
    let location = process.argv[3];
    let content = process.argv[4];
    writeToFile(location, content);
} else {
    let path = process.argv[2]
    if (path.startsWith('www.')) {
        webCat(path);
    } else if (path.startsWith('http')) {
        webCat(path);
    } else {
        cat(path)
    };
}

async function writeToFile (location, content) {
    fs.writeFile(`./files/${location}`, cat(content), "utf8", function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('Successfully wrote to file!');
    });
}

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
        return (`${data}`);
    });
}
