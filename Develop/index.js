// array of questions for user
const questions = [
    "What is the title of your project? ",
    "Write a description for this project: ",
    "Write a table of contents: ",
    "Write installation instructions: ",
    "Write project usage: ",
    "Write a license for the project: ",
    "Write credits: ",
    "Write tests: ",
    "Write questions: "
];

const readmeText = [
    `# ${projectName}\n`,
    "## Description",
    `${description}`,
    `## Table of Contents`,
    "* [Installation](#installation)",
    "* [Usage](#usage)",
    "* [License](#license)",
    "* [Credits](#credits)",
    "* [Tests](#tests)",
    "* [Questions](#questions)",
    "## Installation",
    `${installation}`,
    "## Usage",
    `${usage}`,
    "## License",
    `${license}`,
    "## Credits",
    `${credits}`,
    "## Tests",
    `${tests}`,
    "## Questions"
    `${questions2}`,
];
// function to write README file
function writeToFile(fileName, data) {

}

// function to initialize program
function init() {
    console.log(questions);
}

// function call to initialize program
init();
