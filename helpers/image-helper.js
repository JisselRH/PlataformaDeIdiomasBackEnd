const axios = require('axios');

const apiKey = process.env.OPEN_AI_KEY;

/*async function imageReq(prompt) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    prompt,
    n: 1,
    size: '512x512',
  };

  const url = 'https://api.openai.com/v1/images/generations';

    try {
      const response = await axios.post(url, data, { headers });
      const imageUrl = response.data.data[0].url;
      console.log('IMAGE URL: ',imageUrl);

      return imageUrl;
    } catch (err) {
      console.log(err.response);
      return ("Error getting image")
    }

  
}*/

async function imageReq(prompt) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024', 
  };

  const url = 'https://api.openai.com/v1/images/generations';

  try {
    const response = await axios.post(url, data, { headers });
    const imageUrl = response.data.data[0].url;
    console.log('IMAGE URL: ', imageUrl);

    return imageUrl;
  } catch (err) {
    console.log(err.response);
    return "Error getting image";
  }
}


module.exports = {
  imageReq,
};
