import Replicate from 'replicate';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { letsFormat } from './formatData.js';
import { createPresentation } from './updatedPpt.js';

(async () => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    userAgent: 'https://www.npmjs.com/package/create-replicate',
  });

  console.log('Running...');
  try {
    const output = await replicate.run(
      "google-deepmind/gemma-2b-it:dff94eaf770e1fc211e425a50b51baa8e4cac6c39ef074681f9e39d778773626",
      {
        input: {
          prompt: "Java need to do the ppt content for this please make it for 5 slides content",
          max_new_tokens: 200,
          min_new_tokens: -1,
        },
      }
    );
    console.log('Done!', output);

    if (output) {
      createPresentation(letsFormat(output));
    } else {
      console.error('No output received from Replicate.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
