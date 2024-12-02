export const letsFormat = (data) => {
  let rawData = data;
  let slides = [];
  let currentSlide = { title: "", content: [] };
  let currentContent = [];

  for (let i = 0; i < rawData.length; i++) {
    let text = rawData[i].trim();

    if (text.startsWith("**Slide")) {
      if (currentSlide.title && currentContent.length > 0) {
        currentSlide.content = [...currentContent];
        slides.push(currentSlide);
      }

      let returnObj = getTitle(rawData, i + 1);
      i = returnObj.index;
      currentSlide = {
        title: returnObj.title.replace("*", ""),
        content: []
      };
      currentContent = [];
    } else {
      let str = "";
      while (i < rawData.length) {
        if (rawData[i].includes("\n")) {
          currentContent.push(str + " " + rawData[i].replace("*", "").trim());
          str = "";
        } else {
          str += str === "" ? rawData[i].replace("*", "").trim() : " " + rawData[i].replace("*", "").trim();
        }
        if (rawData[i + 1] == "**Slide ") {
          break;
        }
        i += 1;
      }
    }
  }

  if (currentSlide.title && currentContent.length > 0) {
    currentSlide.content = [...currentContent];
    slides.push(currentSlide);
  }
  return slides;
};

const getTitle = (val, index) => {
  let title = "";
  while (true) {
    if (!val[index].includes("**")) {
      title += val[index];
      index += 1;
    } else {
      title += val[index];
      return { title: title.replace("**\n", "").trim(), index: index };
    }
  }
};
