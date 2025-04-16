const { imageReq } = require('../helpers/image-helper');

async function createImage(req, res) {
  const { prompt } = req.body;
  const imageUrl = await imageReq(prompt);
  res.status(200).json(imageUrl);
}

module.exports = {
  createImage,
};
