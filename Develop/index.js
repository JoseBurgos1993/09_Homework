const inquirer = require("inquirer");
const fs = require("fs");

// Prompts user for all of the information
async function promptUser(){
    try{
        console.log("Thank you for using the README Generator 2000 Max Epsilon EX");
        console.log("If you don't want to fill in a particular section, leave it");
        console.log("blank. The only exception are credits. Minimum 1 contributor.");
        console.log("Minimum 0 sources.");
        const { title } = await inquirer.prompt({
            message: "What is the title of your project?",
            name: "title"
        });
        const { description } = await inquirer.prompt({
            message: "Please write a description:",
            name: "description"
        });

        const { installation } = await inquirer.prompt({
            message: "What is the installation process?",
            name: "installation"
        });

        const { usage } = await inquirer.prompt({
            message: "What is the usage agreement?",
            name: "usage"
        });

        const { license } = await inquirer.prompt({
            message: "Write a license:",
            name: "license"
        });
        let credits = [];
        let done = false;

        // These next 2 while loops contain code that checks how many contributors and sources we have so that
        // we can prompt the user that number of times
        while(!done){
            const { numCred } = await inquirer.prompt({
                message: "How many team members would you like to credit?",
                name: "numCred"
            });
            if(parseInt(numCred) > 0){
                for(let i = 1; i < parseInt(numCred) + 1; i++){
                    const {credit} = await inquirer.prompt({
                        message: `Write down person #${i}'s name:`,
                        name: "credit"
                    });
                    const {git} = await inquirer.prompt({
                        message: `Write down ${credit}'s github username (leave blank if none):`,
                        name: "git"
                    });
                    credits.push([credit,git]);
                }
                done = true;
            } else{
                console.log("Minimum of 1 person required.")
            }
        }

        let sources = [];
        done = false;
        while(!done){
            const { numSources } = await inquirer.prompt({
                message: "How many sources would you like to credit?",
                name: "numSources"
            });
            if(parseInt(numSources) >= 0){
                for(let i = 1; i < parseInt(numSources) + 1; i++){
                    const {source} = await inquirer.prompt({
                        message: `Write down source #${i}'s name:`,
                        name: "source"
                    });
                    sources.push(source);
                }
                done = true;
            } else{
                console.log("Number of sources can't be negative.")
            }
        }

        const { tests } = await inquirer.prompt({
            message: "Write how to test your application.",
            name: "tests"
        });

        const { quests } = await inquirer.prompt({
            message: "Write down any questions you have regarding your application:",
            name: "quests"
        });
        createFileContents(title,description,installation,usage,license,credits,sources,tests,quests);

        console.log(title);
    } catch(err){
        console.log(err);
    }
}

// The reason this function looks wack is because of the way I built it. If the lines are indented, that
// follows through in the README we're generating. It looked way worse when I only pushed the strings
// to the left side. Trust me.

const createFileContents = (title,description,installation,usage,license,credits,sources,tests,quests) => {
    // We start with the first half of the README
    let readmeText = "```" + 
        `# ${title}
        ${description}

        ## Table of Contents
        * [Installation](#installation)
        * [Usage](#usage)
        * [License](#license)
        * [Contributors](#contributors)
        * [Sources](#sources)
        * [Tests](#tests)
        * [Questions](#questions)

        ## Installation
        ${installation}

        ## Usage
        ${usage}

        ## License
        ${license}

        ## Contributors
        ` + "```";

    // Next we write each contributor on they're own line. If there is no github username, we ignore that part
    credits.forEach(element => {
        if(element[1] === ""){
            readmeText = readmeText + `
                ${element[0]}   `;
        } else{
            readmeText = readmeText + `
                ${element[0]} ---- ${element[1]}   `;
        }
    });

    // Now we do the same for our sources
    readmeText = readmeText + `## Sources`;
    sources.forEach(element => {
        readmeText = readmeText + ` ${element}
        `;
    });

    // We finally write the last part of the README
    readmeText = readmeText + "```" + `
    ## Tests
    ${tests}

    ## Questions
    ${quests}
    ` + "```";

    writeToFile("newREADME.md", readmeText);
}

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err){
        if(err){
            return console.log(err);
        }
        console.log("File successfully created!");
    })
}



// function to initialize program
function init() {
    promptUser();
}

// function call to initialize program
init();