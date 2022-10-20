[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Cypress automation framework skeleton for e2e projects

### Suggested IDEs by [Cypress documentation](https://docs.cypress.io/guides/tooling/IDE-integration.html#Extensions-amp-Plugins):

- VsCode (Best option to work with Cypress and it's free). I strongly recommend you to use this one!
- Intellij (Alternative solution, also free)

If you are gonna use VsCode, I really suggest you to use the following extensions:

- ESLint (from Dirk Baeumer)
- Prettier (from Prettier)
- vscode-ions (from VSCode Icons Team)
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

You will need to install the Node.js to execute the project.
Download the latest stable Node version [here](https://nodejs.org/en/).

After the completed node's installation, you will need to clone this current repo

## Installing the dependencies

In this project I am using Yarn as the project package manager. So, once you have npm/node installed, you can do:

> ```bash
>  npm install --global yarn
> ```

After that, you can check yarn was correctly installed by running

> ```bash
>  yarn --version
> ```

Now, open the repo folder over CLI mode and install all dev dependencies using yarn.
Just type:

> ```bash
> yarn
> ```

- Note for Windows users: If you get some error saying that the yarn cannot be loaded because running scripts is disabled, just execute this code bellow to change system policies:

> `Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser`

Once you run yarn, you will see something like this:

> ```bash
> yarn install v1.15.2
> info No lockfile found.
> [1/4] �  Resolving packages...
> [2/4] �  Fetching packages...
> [3/4] �  Linking dependencies...
> [4/4] �  Building fresh packages...
> success Saved lockfile.
> ```

---

<br>

## How to Run the tests with Cypress Interface

Cypress give us the ability to run tests with a test runner interface that allow us to debug and develop tests much more quickly
To do this, just run the following command:

> ```bash
> yarn cy:open
> ```

With this command, Cypress interface will be opened and you can select the browser and the exact file that you want to run. In addition, you are able to select to run all files directly clicking on "Run All Specs" Button.

## How to Run the tests with Cypress using CLI

We can create many personalized ways to run cypress. To do this, we need to create commands in the package.json file located in the root of this repo. So far, we have some commands to facilitate our day to day work, which are:

> ```bash
> # Starting the tests via CLI with the Chrome browser by default:
> yarn cy:run
>
> # Starting the tests via CLI in headless mode with the Chrome browser by default:
> yarn cy:run
>
> # Starting the tests via CLI in headless mode with the Chrome browser:
> yarn cy:run:chrome
>
> # Starting the tests via CLI in headless mode with the Firefox browser:
> yarn cy:run:firefox
>
> # Starting the tests via CLI in headless mode with the Edge browser:
> yarn cy:run:edge
> ```

Remember that all those commands above can be totally adapted, modified, or even created according to the project current necessities

---

<br>

## Compilers and linters

Basically, we need to make sure we do not have any issue raised by the compilers before committing any code. So, we need to run all the compilers in this order:

```bash
# Run this typescript compiler first, if some error is found, fix it and it run again:
yarn compile

# Now, with no more errors from the previous one, run the ESLint and prettier:
yarn lint:fix

# Then, fix any issue raised and rerun the scripts above again just to make you are okay.

# If no issues were found, you can move forward to commit your code.
```

I added Husky in this project. If you activate it in your local repository, you will not need to be worried about running the compilers before the commits because husky does it automatically for you.

To do that, open a git bash terminal in your Cypress project root and type the following commands:

> ```bash
> npx husky install
> git add .husky/pre-commit
> ```

The compilers will run whenever you commit your code in both VSCode UI and Git Bash. However, when the compilers raises errors it is much easier to debug it over the Git Bash. Therefore, I recommend the the usage of Git Bash for your commits.

The usage of Husky is not mandatory but it is very helpful since you don’t need to type/remember the compiler and linters commands

> **_NOTE:_** Do never commit your code before running the compilers using scripts provided in this page. They are meant to prevent several issues we may find in our CI environment, so it is a good practice to always run the compilers before pushing code. Whether you forget to run the scripts or don’t want to use husky, you will get an error in the pipeline if any issue is found anyway. Hence, there is no way to skip the compilers verification.

---

<br>

## Node packages updates

We know that some Cypress plugins and other node packages can be updated along the time. New versions usually includes new features, bug fixes, and, most important, security enhancements.

So, it is recommended to keep an eye on the node packages (Once a month looks good).

To do that you can perform the following command:

> ```bash
> yarn outdated # It will show you the list of outdated packages
> ```

---

<br>

## Cypress with Docker

When we execute tests using our local resources, the tests take advantage of the host machine like browsers, memory and etc.

Using Docker you'll be able to customize your "machine configurations" without having any extra infrastructure. It's so simple to create Containers on the fly and add your tests into a Continuous Integration Environment.

For this case, the tests are running inside the container via dockerfile so, you can follow the next steps to see how to run tests with Docker.

### How to Run the tests with Docker

> ```bash
> # Into your cli:
> docker build -t cypress .
> ```
