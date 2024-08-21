import FileSaver from 'file-saver';

import surpriseMePromps from "../constants"

export function getRandomPropt(prompt) {
 const randomIndex = Math.floor(Math.random() * surpriseMePromps.length);

 const randomPrompt = surpriseMePromps[randomIndex]

 if (randomPrompt === prompt) return getRandomPropt(prompt)

 return randomPrompt;
}

export async function downloadImage(_id, photo) {
 FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

