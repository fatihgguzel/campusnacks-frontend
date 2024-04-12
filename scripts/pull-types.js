const fs = require('fs');

const files = [
  { name: 'requestObjects', target: 'api/requestObjects.ts'},
  { name: 'responseObjects', target: 'api/responseObjects.ts'},
  { name: 'enums', target: 'api/enums.ts'},
  { name: 'Errors', target: 'api/Errors.ts'},
];

files.forEach((file) => {
  fetch(`http://localhost:3000/api/config/types/${file.name}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(content => {
    fs.writeFile(
      `./src/types/${file.target}`,
      content,
      function (err) {
        if (err) throw err;
        console.error(`/src/types/${file.target} is created...`);
      }
    );
  })
  .catch(error => {
    console.error('Fetch Error:', error);
  });
});
