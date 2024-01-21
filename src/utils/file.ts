export async function blobToDataURL(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('loadend', () => {
      return resolve(reader.result as string)
    })

    reader.readAsDataURL(blob)
  })
}
