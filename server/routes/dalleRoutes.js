import express from 'express'
import OpenAi from "openai"
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAi({
 apiKey: process.env.OPENAI_API_KEY
})

try {
 router.route("/").get((req,res) => {
  res.send('Dam-E Activated');
 })
} catch (error) {
 console.log(error, 'Error initiazing OpenAi')
}

router.route("/").post(async (req, res) => {
 try {
  const { prompt } = req.body;

  openai.createImage

  const aiResponse = await openai.images.generate({
   model: "dall-e-3",
   prompt,
   n: 1,
   size: '1024x1024',
   response_format: 'b64_json'
  });


  const image = aiResponse.data[0].b64_json;

  res.status(200).json({ photo: image })

 } catch (error) {
  console.log(error);
  res.status(500).send(error?.response.data.error.message)
 }
})

export default router;