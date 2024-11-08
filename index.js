import Replicate from 'replicate'
import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs';
import fetch from 'node-fetch';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
})
const model = 'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc'
const input = {
  width: 768,
  height: 768,
  prompt: 'An astronaut riding a rainbow unicorn, cinematic, dramatic',
  refine: 'expert_ensemble_refiner',
  scheduler: 'K_EULER',
  lora_scale: 0.6,
  num_outputs: 1,
  guidance_scale: 7.5,
  apply_watermark: false,
  high_noise_frac: 0.8,
  negative_prompt: '',
  prompt_strength: 0.8,
  num_inference_steps: 25,
}

//console.log('Using model: %s', model)
//console.log('With input: %O', input)

console.log('Running...')
const output = await replicate.run(
  "google-deepmind/gemma-2b-it:dff94eaf770e1fc211e425a50b51baa8e4cac6c39ef074681f9e39d778773626",
  {
    input: {
      prompt: "Node.js need to do the ppt conent for this please make it for 25 slides content",
      max_new_tokens: 200,
      min_new_tokens: -1
    }
  })
console.log('Done!', output)

// Check if output is a URL or array of URLs

    
//let fs = require("fs");
fs.writeFileSync("output.txt",JSON.stringify(output))
console.log('Image saved as output_image.png');
