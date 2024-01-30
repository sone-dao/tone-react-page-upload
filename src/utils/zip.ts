import JSZip from 'jszip'

export function getFilesFromZip(file: File) {
  return new Promise<File[]>(async (resolve, reject) =>
    JSZip.loadAsync(file).then(async (zip) => {
      const paths: string[] = []

      const files: File[] = []

      zip.forEach(async (relativePath) => paths.push(relativePath))

      for await (const path of paths) {
        const jsZipFile = zip.file(path)!

        const blob = await jsZipFile.async('blob')

        const file = new File([blob], jsZipFile.name)

        files.push(file)
      }

      resolve(files)
    })
  )
}
