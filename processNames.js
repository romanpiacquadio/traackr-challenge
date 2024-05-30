const fs = require('fs');
const readline = require('readline');

const getNamesFromFile = async (file, N=25) => {
  try {
    // initialiazing variables to count fullNames, lastNames, firstNames, and modifiedNames
    const fullNames = {};
    const lastNames = {};
    const firstNames = {};
    const modifiedNames = [];
    //regex validation for names
    const nameValidation = /^[a-zA-Z]+$/;

    // creating Set data structures to store unique names 
    const uniqueFirstNames = new Set();
    const uniqueLastNames = new Set();
    let newNamesCount = 0;

    // creating stream to read file
    const fileStream = fs.createReadStream(file, { encoding: 'utf-8' });

    // using readline library to read each line
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    // iterating through the lines 
    for await (const line of rl) {
      // making sure the line does not start with and empty space (lines with names don't have empty spaces)
      if (!line.startsWith(' ')) {
        // splitting lines with name by the double dash
        const fullName = line.split(' -- ')[0];
        // array destructuring to extract lastName and fullName
        const [lastName, firstName] = fullName.split(', ');

        // validating firstName and lastName using regex
        if (nameValidation.test(firstName) && nameValidation.test(lastName)) {
          // checking if firstName and lastName were already added to the sets. In case they weren't and as long the count is lower than the provided number, they are added
          if (
            !uniqueFirstNames.has(firstName) &&
            !uniqueLastNames.has(lastName) &&
            newNamesCount < N
          ) {
            modifiedNames.push(fullName);
            uniqueFirstNames.add(firstName);
            uniqueLastNames.add(lastName);
            newNamesCount++;
          }

          // these objects use the name as properties and the counts as values
          fullNames[fullName] = (fullNames[fullName] || 0) + 1;
          lastNames[lastName] = (lastNames[lastName] || 0) + 1;
          firstNames[firstName] = (firstNames[firstName] || 0) + 1;
        }
      }
    }

    // the function takes an object, sorts it in descending order based on the values, and slices the top positions
    const getTopNames = (namesObj, N) => {
      return Object.entries(namesObj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, N)
        .map(([name, count]) => ({ name, count }));
    };

    // obtaining top 10 lastNames and top 10 firstNames
    const topLastNames = getTopNames(lastNames, 10);
    const topFirstNames = getTopNames(firstNames, 10);

    // creates an object to be returned
    const result = {
      uniqueFullNamesCount: Object.keys(fullNames).length,
      uniqueLastNamesCount: Object.keys(lastNames).length,
      uniqueFirstNamesCount: Object.keys(firstNames).length,
      topTenLastNames: topLastNames,
      topTenFirstNames: topFirstNames,
      modifiedNames,
    };

    // creates a string that will be written into the output.txt
    let output = `Unique full name count: ${result.uniqueFullNamesCount}\n`;
    output += `Unique first name count: ${result.uniqueFirstNamesCount}\n`;
    output += `Unique last name count: ${result.uniqueLastNamesCount}\n\n`;

    output += `Top 10 last names:\n`;
    result.topTenLastNames.forEach(name => {
      output += `${name.name}: ${name.count}\n`;
    });

    output += `\nTop 10 first names:\n`;
    result.topTenFirstNames.forEach(name => {
      output += `${name.name}: ${name.count}\n`;
    });

    output += `\nModified unique names:\n`;
    result.modifiedNames.forEach(name => {
      output += `${name}\n`;
    });

    // after creating the string it writes a file
    await fs.promises.writeFile('output.txt', output);

    console.log('Output written to output.txt');
    return result;
  } catch (error) {
    console.log(error);
  }
};

const args = process.argv.slice(2);
const fileName = args[0];
const nameCount = parseInt(args[1], 10) || 25;

getNamesFromFile(fileName, nameCount);

module.exports = {getNamesFromFile};