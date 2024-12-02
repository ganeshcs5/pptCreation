import fs from 'fs';
import pptxgen from "pptxgenjs";

async function createPresentation(data) {
  const slidesData = data;
  if (!slidesData) return;

  const pptx = new pptxgen();

  const templateStyles = {
    backgroundColor: "F2F2F2",
    titleStyle: {
      x: 0.5, y: 0.5, w: "90%", h: 1,
      fontSize: 28,
      bold: true,
      color: "003366"
    },
    contentStyle: {
      x: 0.5,
      y: 1.5,
      fontSize: 18,
      color: "505050",
      bullet: true
    }
  };

  slidesData.forEach(slideData => {
    const slide = pptx.addSlide();
    slide.background = { color: templateStyles.backgroundColor };

    if (slideData.title) {
      slide.addText(slideData.title, templateStyles.titleStyle);
    }

    if (Array.isArray(slideData.content)) {
      slideData.content.forEach((content, index) => {
        slide.addText(content, {
          ...templateStyles.contentStyle,
          y: templateStyles.contentStyle.y + index * 0.5,
        });
      });
    }
  });

  try {
    await pptx.writeFile({ fileName: "Templated_Presentation.pptx" });
    console.log("Presentation created successfully with template styles!");
  } catch (error) {
    console.error("Error saving presentation:", error);
  }
}

export { createPresentation };
