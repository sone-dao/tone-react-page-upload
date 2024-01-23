import { FormGroup } from '@sone-dao/tone-react-core-ui'
import JSZip from 'jszip'
import localforage from 'localforage'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ReleaseSong, UploadRelease } from '../types'
import { getColorsFromImage } from '../utils/art'
import { getMetadata } from '../utils/audio'

type ReleaseImportProps = {
  release: UploadRelease
  setRelease: Function
  songs: ReleaseSong[]
  setSongs: Function
  setArtColors: Function
  isImporting: boolean
  setImporting: Function
}

export default function ReleaseImport({
  release,
  setRelease,
  songs,
  setSongs,
  setArtColors,
  isImporting,
  setImporting,
}: ReleaseImportProps) {
  const inputElement = useRef<HTMLInputElement>(null)

  const [filesToSave, setFilesToSave] = useState<
    {
      fileId: string
      file: File
    }[]
  >([])

  useEffect(() => {
    filesToSave.length && saveFiles(filesToSave)
  }, [filesToSave])

  return (
    <FormGroup label="import release" className="mb-4">
      <div className="bg-global-flipped text-global-flipped font-content text-sm p-2 rounded-xl my-2">
        <p className="mb-2">
          <i className="fa-fw fa-solid fa-circle-info mr-1" />
          Our release import supports image files (png & jpeg), lossless audio
          files (wav & flac), and zips containing audio & image files.
        </p>
        <p>
          Click/tap the area below to select a file. We will scan your
          zip/file(s) for metadata information and fill out what we can below.
        </p>
      </div>
      <div
        className="flex items-center justify-center border-2 border-dashed border-global w-full p-4 rounded-xl cursor-pointer"
        onClick={() => inputElement.current?.click()}
      >
        {!isImporting ? (
          <span className="font-content">
            <i className="fa-fw fa-solid fa-photo-film-music mr-1" />
            Click/tap here to select a file
          </span>
        ) : (
          <span className="font-content">
            <i className="fa-fw fa-regular fa-compact-disc mr-1 fa-spin-pulse" />
            Importing files...
          </span>
        )}
        <input
          type="file"
          onChange={(e) =>
            e.target.files?.length && handleFiles(e.target.files)
          }
          style={{ display: 'none' }}
          ref={inputElement}
        />
      </div>
    </FormGroup>
  )

  async function handleFiles(fileList: FileList) {
    setImporting(true)

    const fileCount = fileList.length

    for (let x = 0; x < fileCount; x++) {
      const file = fileList[x]

      const validFileTypes = ['png', 'jpg', 'jpeg', 'zip', 'wav', 'flac']

      const fileType = file.name.split('.')[file.name.split('.').length - 1]

      if (validFileTypes.includes(fileType)) {
        switch (fileType) {
          case 'zip':
            const zip = await parseZip(file)

            const art = zip?.art

            const files = zip?.files || []

            if (files.length) setFilesToSave(files)

            if (art) {
              const colors = await getColorsFromImage(art)

              setArtColors(colors)
            }

            const imported = {
              display: zip?.releaseDisplay,
              art,
            }

            setRelease({ ...release, ...imported })

            if (zip?.songs.length) setSongs(zip.songs)

            return setImporting(false)
          case 'wav':
          case 'flac':
            await parseSong(file)

            return setImporting(false)
          case 'png':
          case 'jpg':
          case 'jpeg':
            await parseArt(file)

            return setImporting(false)
        }
      }
    }
  }

  async function parseSong(file: File) {
    const meta = await getMetadata(file)

    if (!meta.lossless) return

    if (meta.releaseDisplay && !release.display) {
      setRelease({ ...release, display: meta.releaseDisplay })
    }

    const fileId = uuidv4()

    await localforage.setItem('tone.upload.' + fileId, file)

    setSongs([...songs, { ...meta }])
  }

  async function parseArt(file: File) {
    const colors = await getColorsFromImage(file)

    setArtColors(colors)

    setRelease({ ...release, art: file })
  }

  async function parseZip(file: File) {
    const audioFileTypes = ['flac', 'wav', 'wave']

    const artFileTypes = ['png', 'jpg', 'jpeg']

    const zipSongs: ReleaseSong[] = []

    const files: {
      fileId: string
      file: File
    }[] = []

    let art: Blob | null = null

    let releaseDisplay: string = ''

    const zip = await JSZip.loadAsync(file)

    const paths: string[] = []

    zip.forEach(async (relativePath) => paths.push(relativePath))

    for await (const path of paths) {
      const jsZipFile = zip.file(path)!

      const blob = await jsZipFile.async('blob')

      const file = new File([blob], jsZipFile.name)

      const type = file.name.split('.')[file.name.split('.').length - 1]

      if (audioFileTypes.includes(type)) {
        const meta = await getMetadata(file)

        if (!meta.lossless) return

        if (meta.releaseDisplay && !releaseDisplay) {
          releaseDisplay = meta.releaseDisplay
        }

        const fileId = uuidv4()

        zipSongs.push({
          display: meta.display,
          duration: meta.duration,
          isrc: meta.isrc,
          lyrics: {
            unsynced: meta.unsyncedLyrics,
          },
          fileId,
        })

        files.push({
          fileId,
          file,
        })
      }

      if (artFileTypes.includes(type)) art = file
    }

    return { songs: zipSongs, releaseDisplay, art, files }
  }

  async function saveFiles(filesToSave: { fileId: string; file: File }[]) {
    console.log('Saving files...')

    for await (const fileToSave of filesToSave) {
      console.log('Saving file:', fileToSave.file)
      await localforage
        .setItem('tone.upload.' + fileToSave.fileId, fileToSave.file)
        .then((file) => console.log('Saved file:', file))
    }
  }
}
