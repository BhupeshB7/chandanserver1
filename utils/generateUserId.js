// const fs = require('fs');

// // Read the count from a file or set it to 0
// let count = 0;
// try {
//   const data = fs.readFileSync('count.txt', 'utf8');
//   count = parseInt(data);
// } catch (err) {
//   console.error(err);
// }

  //  const generateUserId = () => {
  
  //   const prefix = 'GSP';
  //   count ++;
  //   let year = '2023';
  //   const randomNumbers = Math.floor(Math.random() * 90000000) + 10000000;
  //   return prefix+ count.toString().padStart(4, '0') +randomNumbers.toString();
  //   return prefix+ year+ count.toString().padStart(5, '0'); 
  // };


  exports.generateUserId =() => {
    // count++;
    const randomNumber = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
    const userID = `CMP${count.toString().padStart(2, '0')}${randomNumber}`;
    return userID;
  }
  // module.exports = generateUserId;
  // fs.writeFileSync('count.txt', count.toString(), 'utf8');