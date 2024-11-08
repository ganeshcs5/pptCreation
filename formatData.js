import fs from 'fs';

// Input data as array
//export.module = 
let getTitle = (val,index)=>{
  let title = "";
  while(true){
    if(!val[index].includes("**")){
      title+=val[index];
      index+=1;
    }else{
      title+=val[index];
      return title.replace("**\n", "").trim();
    }
  }
 return ""
} 

let rawData =  fs.readFileSync("./output.txt", { encoding: 'utf8', flag: 'r' });
rawData = JSON.parse(rawData);
// / Initialize variables
let slides = [];
let currentSlide = { title: "", content: [] };
let currentContent = [];
// Function to process raw data
for (let i = 0; i < rawData.length; i++) {
  let text = rawData[i].trim();

  // Detect slide title
  if (text.startsWith("**Slide")) {
    // If we have accumulated content, push the current slide data to slides array
    if (currentSlide.title && currentContent.length > 0) {
      currentSlide.content = [...currentContent];
      slides.push(currentSlide);
    }

    // Start a new slide
    //let titleMatch = text.match(/\*\*Slide (\d+:.+?)\*\*/);
    currentSlide = {
      title: getTitle(rawData,i+1),
      content: []
    };
    currentContent = [];
  } else if (text.startsWith("*")) {
    // Add content line, removing the leading '*' for bullet points
    //currentContent.push(text.replace("*", "").trim());
    let str = ""
    while(i < rawData.length ){
      if(rawData[i].includes("\n")){
        currentContent.push(str+" "+rawData[i].replace("*", "").trim());
        str=""
        //break;
      }else{
        str += str === "" ? rawData[i].replace("*", "").trim() : " "+rawData[i].replace("*", "").trim();
      }
      if(rawData[i+1] == "**Slide "){
        break;
      }
      i += 1; 
    }
  }
  
}

// Add the last slide if it has content
if (currentSlide.title && currentContent.length > 0) {
  currentSlide.content = [...currentContent];
  slides.push(currentSlide);
}

// Write the structured JSON to a file
fs.writeFileSync("output.json", JSON.stringify(slides, null, 2), 'utf8');
console.log("Slides have been structured and saved to output.json");
