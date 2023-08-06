'use client'

import { useRef } from 'react'
import styles from './ReleaseImporter.module.scss'
import { getFilesFromZip, parseZipFiles } from './ZipUtils'

interface IZipImportProps {
  setReleaseArt: Function
  setReleaseSongs: Function
}

export default function ZipImport({
  setReleaseArt,
  setReleaseSongs,
}: IZipImportProps) {
  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.zipInput} onClick={() => fileInput.current?.click()}>
      <i className="fa-fw fa-sharp fa-regular fa-folder-open" />
      <input type="file" ref={fileInput} onChange={() => parseZip()} />
    </div>
  )

  async function parseZip() {
    const input = fileInput.current

    if (!input?.files?.length) return console.log('No file selected.')

    const file = input.files[0]

    const zipFiles = await getFilesFromZip(file)

    const { artFiles, songFiles } = await parseZipFiles(zipFiles)

    setReleaseArt(artFiles)
    setReleaseSongs(songFiles)
  }
}
