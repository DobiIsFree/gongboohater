const https = require('https');
const crypto = require('crypto');

// API 요청 및 복호화 함수
function fetchAndDecryptData(url, encryptionKey) {
  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => { // 암호화된 json 파일
      try {
        // 데이터 복호화
        const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
        let decryptedData = decipher.update(data, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');

        console.log('복호화된 데이터:', decryptedData);
      } catch (error) {
        console.error('데이터 복호화 중 오류가 발생했습니다:', error);
      }
// inlist
// output list

var inputList = [];
var outputList = [];


// 끊어서 tcin0 .. tcout0
      // 복호화 데이터 file 저장
      fs.writeFile(filePath, encryptedData, (err) => {
          if (err) {
            console.error('파일 저장 중 오류가 발생했습니다:', err);
          } else {
            console.log('JSON 데이터가 파일로 저장되었습니다.');
          }
        });

    });
  }).on('error', (error) => {
    console.error('데이터를 받아오는 중 오류가 발생했습니다:', error);
  });
}

// API에서 받아온 데이터를 복호화할 키
const encryptionKey = '0123456789abcdef0123456789abcdef';

// 복호화할 데이터를 제공하는 API의 URL
const url = 'https://example.com/api/data';

// 함수 호출
fetchAndDecryptData(url, encryptionKey);
