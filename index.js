const fs = require('fs').promises;

const getNamesFromFile = async (file, N=25) => {
  try {
    const data = await fs.readFile(file, 'utf8')
    const trimmedData = data.trim();
    const lines = trimmedData.split('\n')
    const fullNames = {};
    const lastNames = {};
    const firstNames = {};
    const modifiedNames = [];
    const nameValidation = /^[a-zA-Z]+$/;  

    const uniqueFirstNames = new Set();
    const uniqueLastNames = new Set();
    let newNamesCount = 0;

    for (const line of lines) {
      if (!line.startsWith(' ')) {
        const fullName = line.split(' -- ')[0];
        const [lastName, firstName] = fullName.split(', ');
        if( nameValidation.test(firstName) && nameValidation.test(lastName) ) {
          if(
            !uniqueFirstNames.has(firstName) &&
            !uniqueLastNames.has(lastName) &&
            newNamesCount < N
          ) {
            modifiedNames.push(fullName);
            uniqueFirstNames.add(firstName);
            uniqueLastNames.add(lastName);
            newNamesCount++;
          };
          fullNames[fullName] = (fullNames[fullName] || 0) + 1;
          lastNames[lastName] = (lastNames[lastName] || 0) + 1;
          firstNames[firstName] = (firstNames[firstName] || 0) + 1;
        }
      }
    }
    
    const getTopNames = (namesObj, N) => {
      return Object.entries(namesObj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, N)
        .map(([name, count]) => ({ name, count }));
    };

    const topLastNames = getTopNames(lastNames, 10);

    const topFirstNames = getTopNames(firstNames, 10);
  
    return {
      uniqueFullNamesCount: Object.keys(fullNames).length,
      uniqueLastNamesCount: Object.keys(lastNames).length,
      uniqueFirstNamesCount: Object.keys(firstNames).length,
      topTenLastNames: topLastNames,
      topTenFirstNames: topFirstNames,
      modifiedNames,
    }
  } catch (error) {
    console.log(error)
  }
}

// Specify the file to be processed and the amount of modified names.
getNamesFromFile('./coding-test-data.txt', 25)
  .then(resp => console.log(resp));