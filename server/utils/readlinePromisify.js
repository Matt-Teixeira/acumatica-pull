const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query, args) {
    return new Promise(resolve => {
        readline.question(query, resolve);
    });
}

module.exports = {question, readline};