import fs from 'fs';
import PptxGenJS from "pptxgenjs";

// Read data from JSON file
let data = fs.readFileSync("./output.txt", { encoding: 'utf8', flag: 'r' });
let slidesData = JSON.parse(data);

// Initialize PowerPoint generator
let pptx = new PptxGenJS();

// Function to create slides from structured JSON data
function createSlides(slidesData) {
  slidesData.forEach(slide => {
    // Extract title and content for each slide
    const { title, content } = slide;
    addSlide(title, content);
  });
}

// Function to add a slide to the presentation
function addSlide(title, contentLines) {
  let slide = pptx.addSlide();

  // Add the slide title
  slide.addText(title, { x: 0.5, y: 0.5, fontSize: 24, bold: true });

  // Format content as bullet points
  const bullets = contentLines.map(line => ({ text: line, options: { fontSize: 18 } }));
  slide.addText(bullets, { x: 0.5, y: 1.5, bullet: true });
}

// Process JSON data and create slides
createSlides(slidesData);

// Save the presentation
pptx.writeFile("React_Presentation.pptx").then(() => {
  console.log("PowerPoint presentation created successfully!");
});
