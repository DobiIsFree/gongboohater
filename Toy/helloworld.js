const crypto = require('crypto');
const encryptionKey = "0123456789abcdef0123456789abcdef";

const testcase = [
  {
    num: 0,
    in: 1,
    out: 2
  },
  {
    num: 1,
    in: 2,
    out: 2
  }
];

jsonString = JSON.stringify(testcase);
console.log(jsonString);

const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
let encryptedData = cipher.update(jsonString, 'utf8', 'hex');
encryptedData += cipher.final('hex');

console.log('암호화된 데이터:', encryptedData);

const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');

console.log('복호화된 데이터:', decryptedData); // string

var jsonData = JSON.parse(decryptedData);
console.log(jsonData);

// var data_size = Object.keys(decryptedData).length;
console.log('json 사이즈: ', jsonData.length);

