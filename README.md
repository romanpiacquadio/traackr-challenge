# People Name Program 1.0

## Description

This program processes an input file containing people's names, and generates and output file with the statistics.

## Instructions

1. **Install Dependencies**
   - Run `npm install` in your terminal to install the required dependencies.

2. **Update the Configuration**
   - Place the file to be processed inside the unzipped folder.
   - Open the `package.json` file.
   - Modify the `start` script to specify the input file and the amount of modified names.
   - For example:
      `"start": "node processNames.js coding-test-data.txt 25"`
   - If the amount of modified names is not provided, it defaults to 25.

3. **Run the program**
   - Open a terminal and execute the following command:
      `npm start`
   - The result will be displayed in an output file called `output.txt`


## Example

Modify the `start` script in `package.json` to specify the input file and the amount of modified names:

`"start": "node processNames.js coding-test-data.txt 20"`

Then, run the program:

`npm start`

## Running Tests

To run the tests, execute the following command in your terminal:

`npm test`

## Additional Notes

- Make sure Node.js is installed on your system.