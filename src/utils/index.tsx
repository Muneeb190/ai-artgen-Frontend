import FileSaver from "file-saver"
import { surpriseMePrompts } from "../constant";


export function getRandomPrompt(prompt: string) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(photo: string | Blob, fileName = "image"): Promise<void> {
  try {
    let blob: Blob;

    if (photo instanceof Blob) {
      blob = photo;
    } else if (typeof photo === "string") {
      const src = photo.trim();

      if (src.startsWith("data:")) {
        // data URL → convert to blob
        const res = await fetch(src);
        blob = await res.blob();
      } else if (src.startsWith("http://") || src.startsWith("https://")) {
        // remote URL → fetch blob
        const res = await fetch(src);
        if (!res.ok) throw new Error("Failed to fetch image");
        blob = await res.blob();

        // ✅ Extract clean name from URL
        const urlName = src.split("/").pop()?.split("?")[0]; 
        if (urlName) fileName = urlName.replace(/\.[^/.]+$/, ""); // strip extension
      } else {
        // assume raw base64
        const byteCharacters = atob(src);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type: "image/png" });
      }
    } else {
      throw new Error("Unsupported image input");
    }

    // ✅ Make filename safe
    const safeName = `${fileName.replace(/\s+/g, "_")}.png`;
    FileSaver.saveAs(blob, safeName);
  } catch (err) {
    console.error("downloadImage failed:", err);
    alert("Failed to download image");
  }
}