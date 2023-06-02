const https = require('https');
const crypto = require('crypto');

// API에서 받아온 데이터를 암호화할 키: 32 byte
const encryptionKey = "0123456789abcdef0123456789abcdef";

// JSON 데이터를 저장할 파일 경로
const filePath = '/testcase/';


// API 요청 및 암호화 함수
function fetchAndEncryptData(url, encryptionKey) {
  https.get(url, (res) => { // 지정된 url에서 api를 받아와
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        const jsonString = JSON.stringify(jsonData);

        // 암호화 키 생성 -> 복호화
        const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
        let encryptedData = cipher.update(jsonString, 'utf8', 'hex');
        encryptedData += cipher.final('hex');

        console.log('암호화된 데이터:', encryptedData);
      } catch (error) {
        console.error('JSON 파싱 중 오류가 발생했습니다:', error);
      }

      // 암호화 데이터 file 저장
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

// JSON 데이터를 받아올 URL
const url = 'https://example.com/data.json';

// 함수 호출
fetchAndEncryptData(url, encryptionKey);
