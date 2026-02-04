export const getDominantColor = (imageSrc: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve("rgb(0, 0, 0)");
        return;
      }
      const size = 10;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      resolve(`rgb(${r}, ${g}, ${b})`);
    };
    img.onerror = () => resolve("rgb(0, 0, 0)");
  });
};
