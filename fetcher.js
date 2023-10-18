const request = require('request');
const fs = require('fs/promises');

let url = process.argv[2].toString();
let localPath = process.argv[3].toString();

async function fetcher(content) {
  try {
    const charCount = content.length;
    await fs.writeFile(localPath, content);
    console.log(`Downloaded and saved ${charCount} bytes to ${localPath}`)
  } catch (err) {
    console.log(err);
  }
}

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); //

  if (!error && response.statusCode === 200) {
    fetcher(body);
  }
});

