# People Name Program 1.0

## Description

This program processes an input file containing people's names, outputs some statistics, and generates an updated output.

## Instructions

1. **Unzip the Archive**
   - Unzip the provided `.rar` file into your desired destination folder.

2. **Add the Input File**
   - Place the file to be processed inside the unzipped folder.
   - Edit the `index.js` file to invoke the `getNamesFromFile` function with the name of the file you want to process.

3. **Set the Amount of Modified Names**
   - Edit the `index.js` file to invoke the `getNamesFromFile` function with the amount of modified names. If not provided, the number will be defaulted to 25.

4. **Run the Program**
   - Open a terminal and navigate to the unzipped folder.
   - Execute the program with the following command:
     ```bash
     node index.js
     ```
   - The result will be displayed in the console.

## Example

Modify `index.js` to call `getNamesFromFile` with the correct filename and the correct amount of modified names:

```javascript
const getNamesFromFile = require('./getNamesFromFile');

getNamesFromFile('coding-test-data.txt', 20);

Then, run the program:

node index.js


## Additional Notes

- Ensure Node.js is installed on your system.