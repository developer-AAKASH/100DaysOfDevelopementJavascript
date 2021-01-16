// nodejs.org contains native node modules which are basically some kind of library or package to build desptop applications usin nodejs and it fullfills the nodejs as an individual language.

// you can go on documentation and search for any modules and import them like below..
const fileSystem = require("fs");

// And start learning its methods and all other thing like this..........
// Copy content of file1 into file2.
fileSystem.copyFileSync( "file1.txt", "file2.txt" );


// callback example with deleting files...
// fileSystem.unlink('file2.txt', (error) => {
//     if (error) throw error;
//     console.log('successfully deleted File2.txt !!');
//   });

// deleting file via promises...
// (async function(path) {
//     try {
//       await fileSystem.unlink(path);
//       console.log(`successfully deleted ${path}`);
//     } catch (error) {
//       console.error('there was an error:', error.message);
//     }
// })("File1.txt");


// renaming of file...
// fileSystem.rename('file1.txt', 'File1.txt', (err) => {
//     if (err) throw err;
//     console.log('renamed complete');
//   });
//   information of file......
//   fileSystem.stat('File1.txt', (err, stats) => {
//     if (err) throw err;
//     console.log(`stats: ${JSON.stringify(stats)}`);
//   });