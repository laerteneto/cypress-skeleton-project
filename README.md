[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Cypress skeleton project

This repository contains a skeleton base project for Cypress. It includes PO Singleton setup, linters, and reporting.

### Suggested IDEs by [Cypress documentation](https://docs.cypress.io/guides/tooling/IDE-integration.html#Extensions-amp-Plugins):

- VsCode (Best option to work with Cypress and it's free). I strongly recommend you to use this one!
- Intellij (Alternative solution, also free)

If you are gonna use VsCode, I also suggest you to use the following extensions to help during development:

- ESLint (from Microsoft)
- Prettier (from Prettier)
- vscode-icons (from VSCode Icons Team)
- Cypress Helper (from Oleksandr Shevtsov)
- Code Spell Checker (from Street Side Software)
- Excel Viewer (from GrapeCity)
- Git History (from Don Jayamanne)
- Git Lends - Git supercharged (from GitKraken)
- vscode-pdf (from tomoki1207)
- Docker (from Microsoft)

### Official framework links:

- [Cypress website](https://www.cypress.io/).
- The API documentation is available [here](https://docs.cypress.io/api/api/table-of-contents.html).

---

<br>

## Dependencies

### NodeJS setup:

You need to install the Node.js as the main dependency to use Cypress in this project.
You can click in [here](https://nodejs.org/en/) to download the latest stable Node version.

After that, you can clone this repository in your local machine.

### Yarn setup:

This project uses Yarn as the project package manager (You can use npm as well, but the following instructions will cover the Yarn). So, once you have node installed and the repository downloaded, you can run the following command in your machine:

> ```bash
>  npm install --global yarn
> ```

After that, you can check that Yarn was correctly installed by running

> ```bash
>  yarn --version
> ```

Now, open the repo folder over CLI mode and install all dev dependencies using Yarn.
Just type:

> ```bash
> yarn
> ```

Once it is done, you will see something like this in the last log line:

> ```bash
> Done in 63.25s.
> ```

---

<br>

## Running the tests

### Cypress test runner interface:

Cypress give us the ability to run tests with a test runner interface that allow us to debug and develop tests quickly.<br>
<br>
To do this, just run the following command:

> ```bash
> yarn cy:open
> ```

With this command, the Cypress interface will be opened and you can select the desired browser for testing <br>

After that, you you will find all the project folders containing tests inside of it. In this particular project, one folder for Task1 (api) and another one for task2 (ui)

### Cypress CLI run:

You can create personalized commands to run cypress. In order to do it, you need to create them in the package.json file located in the root of this repository. Some commands were already added in this project:

> ```bash
> # Runs all the UI tests:
> yarn cy:run:ui
>
> ```

Remember that all those commands above can be totally adapted, modified, or even created according to the project current necessities.

At this point, the commands above will run in the default electron browser (the one that comes with Cypress). So, if you want to run the tests in another one, just add <strong>--browser</strong> and the name of the browser in the command. More info in [here](https://docs.cypress.io/guides/guides/launching-browsers#Browsers).

---

## Project code quality and standards

### Compilers and linters:

This project is set to use the TypeScript compiler, Prettier and ESList to guarantee the project does not have any syntax or code style issues before committing any code.

So, you can run the following commands in this order:

```bash
# Run this typescript compiler first, if some error is found, fix it and it run again:
yarn compile

# Now, with no more errors from the previous one, run the ESLint and prettier:
yarn lint:fix

# Then, fix any issue raised and rerun the scripts above again just to make sure you are good to go.

# If no issues were found, you can move forward to commit your code.
```

### Husky:

Husky was added in this project, so if you activate it in your local repository, you will not need to be worried about running the compilers before the commits because Husky does it automatically for you.

To do that, open a git bash terminal in your Cypress project root folder and type the following commands:

> ```bash
> npx husky install
> ```
>
> <br/>
> By doing it, the compilers will run whenever you commit your code in either VSCode or Git Bash. <br/>
> The usage of Husky is not mandatory but it is very helpful since you donâ€™t need to type/remember the compiler and linters commands
> <br/><br/>

> **_NOTE:_** It is a very good practice to never commit your code before running the compilers using scripts provided in this project. They are meant to prevent several issues you may find in your CI environment, so it is a good practice to always run the compilers before pushing new code changes.

---

<br>

## Node packages updates

We know that some Cypress plugins and other node packages can be updated along the time. New versions usually includes new features, bug fixes, and, most important, security enhancements.

So, it is recommended to keep an eye on the node packages.<br/>

To do that you can perform the following command:

> ```bash
> yarn outdated # It will show you the list of outdated packages, so you can update them according to your needs.
> ```

---

<br>

## Test results

After running your tests with any of the CLI commands (UI and API), you will be able to see a file called test <strong>test-results.html</strong> in cypress/test-results folder. <br>
So, you can open it and analyze your test results by looking at the logs and screenshots provided (in case of test failures).
<br>
A JUnit report is also generated as a xml file in <strong>cypress/JUnitReport.xml</strong>.

---

<br>

## Bitbucket pipeline:

This project is set to run in a Bitbucket pipeline. All PRs that goes into the master branch trigger the CI to run all the test cases automatically.
You can take a look in the <strong>bitbucket-pipelines.yml</strong> file for more details about the implementation.
