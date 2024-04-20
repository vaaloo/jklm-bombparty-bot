import words from 'an-array-of-french-words/index.json' assert { type: 'json' };
import readline from 'readline';
import clipboardy from 'clipboardy';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let oldWords = [];
let i = 1;

function askQuestion() {
    rl.question('Entrez un mot : ', (word) => {
        try {
            let result = words.find(d => new RegExp(word).test(d));
            if (!oldWords.length) oldWords.push("init")
            if (oldWords.includes(result) === false) {
                console.log(chalk.blue(result));
                clipboardy.writeSync(result);
                oldWords.push(result);
            } else {
                let index = words.indexOf(result);
                result = words[index + i];
                console.log(result);
                i++;
                oldWords.push(result);
            }
        } catch (e) {
            console.log(chalk.red('Aucun mot trouvé'));
        }
        askQuestion();
    });
}

askQuestion();