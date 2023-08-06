import JSZip from 'jszip'

export async function getFilesFromZip(file: File) {
  console.log('Getting files from zip...')

  const paths: string[] = []
  const files: { pathname: string; file: ArrayBuffer }[] = []

  const zip = await JSZip.loadAsync(file)

  zip.forEach((relativePath, file) => {
    paths.push(relativePath)
  })

  for await (const path of paths) {
    const file = await zip.file(path)?.async('arraybuffer')!

    files.push({ pathname: path, file })
  }

  return files
}

export async function parseZipFiles(
  zipFiles: { pathname: string; file: ArrayBuffer }[]
) {
  const artFiles: { type: string; data: ArrayBuffer }[] = []
  const songFiles: ArrayBuffer[] = []

  for await (const zipFile of zipFiles) {
    const filename = zipFile.pathname.split('.')[0]
    const ext = zipFile.pathname.split('.')[1]

    const artFilenames = ['cover', 'back', 'insert', 'lyrics', 'jcard']
    const artExtensions = ['jpg', 'jpeg', 'png', 'gif']

    artExtensions.includes(ext) &&
      artFilenames.includes(filename) &&
      artFiles.push({ type: filename, data: zipFile.file })

    const songExtensions = ['mp3', 'flac', 'wav', 'wave']

    songExtensions.includes(ext) && songFiles.push(zipFile.file)
  }

  return { artFiles, songFiles }
}
