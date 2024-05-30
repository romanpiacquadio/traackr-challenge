const { getNamesFromFile } = require('./processNames');

const mockFilePath = 'mockFile.txt';
const mockFileContent = `
Smith, Joan -- corporis
  Totam eos ut omnis et nemo dolore.
Smith, Sam -- ut
  Ut dolorem est voluptate fugit qui vitae.
Thomas, Joan -- modi
  Nesciunt magni suscipit maxime quaerat sint hic voluptate.
Upton, Joan -- veritatis
  Sed ut impedit harum.
Cartman, Eric -- tenetur
  Esse amet adipisicing commodo labore.
`;

const fs = require('fs').promises;

beforeAll(async () => {
  await fs.writeFile(mockFilePath, mockFileContent);
});

afterAll(async () => {
  await fs.unlink(mockFilePath);
});

test('Names cardinality for full, last, and first names', async () => {
  const result = await getNamesFromFile(mockFilePath);

  expect(result.uniqueFullNamesCount).toBe(5);
  expect(result.uniqueLastNamesCount).toBe(4);
  expect(result.uniqueFirstNamesCount).toBe(3);
});

test('The most common last names are', async () => {
  const result = await getNamesFromFile(mockFilePath);

  expect(result.topTenLastNames).toEqual([
    { name: 'Smith', count: 2 },
    { name: 'Thomas', count: 1 },
    { name: 'Upton', count: 1 },
    { name: 'Cartman', count: 1 }
  ]);
});

test('The most common first names are', async () => {
  const result = await getNamesFromFile(mockFilePath);

  expect(result.topTenFirstNames).toEqual([
    { name: 'Joan', count: 3 },
    { name: 'Sam', count: 1 },
    { name: 'Eric', count: 1 }
  ]);
});
