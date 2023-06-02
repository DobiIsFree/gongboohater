const crypto = require('crypto');
const fs = require('fs');

// API에서 받아온 데이터를 암호화할 키: 32 byte
const encryptionKey = "0123456789abcdef0123456789abcdef";

// test
const testcase = [
  { num: 0,
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
const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
let encryptedData = cipher.update(jsonString, 'utf8', 'hex');
encryptedData += cipher.final('hex');
console.log('암호화된 데이터:', encryptedData);

// 복호화
const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');
console.log('복호화된 데이터:', decryptedData); // string

var jsonData = JSON.parse(decryptedData);
console.log(jsonData);

var NumberOfTest = jsonData.length;

var inputList = [];
var outputList = [];





// for(var i = 0 ; i < NumberOfTest ; i++){
//     fs.mkdirSync(testFolderPath + i);
// 		await makeTestCase(i);
// 		var problem = {
// 				id : i,
// 				check : false,
// 				path : testFolderPath,
// 				isCompile : false
// 		};
// 	problems.push(problem);
//     fs.writeFile(filePath, encryptedData, (err) => {
//           if (err) {
//             console.error('파일 저장 중 오류가 발생했습니다:', err);
//           } else {
//             console.log('JSON 데이터가 파일로 저장되었습니다.');
//           }
//         });
// }
