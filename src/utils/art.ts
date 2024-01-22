import { prominent } from 'color.js'
import { blobToDataURL } from './file'

export async function getColorsFromImage(image: Blob) {
  const dataURL = await blobToDataURL(image)

  return (await prominent(dataURL, {
    amount: 5,
    format: 'hex',
    group: 90,
  })) as string[]
}
