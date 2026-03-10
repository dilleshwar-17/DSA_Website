const axios = require('axios');

const testPiston = async () => {
  try {
    const res = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: 'python',
      version: '3.10.0',
      files: [{ content: "print('test')" }]
    });
    console.log("Success:", res.data);
  } catch (err) {
    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Data:", err.response.data);
    } else {
      console.log("Error:", err.message);
    }
  }
};

testPiston();
