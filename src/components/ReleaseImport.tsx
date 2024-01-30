import { FormGroup } from '@sone-dao/tone-react-core-ui'
import JSZip from 'jszip'
import localforage from 'localforage'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ReleaseSong, UploadRelease } from '../types'
import { getColorsFromImage } from '../utils/art'
import { getMetadata } from '../utils/audio'
import { getFileTypeFromName } from '../utils/file'
import { getFilesFromZip } from '../utils/zip'

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

  const [importedSongs, setImportedSongs] = useState<any[]>([])

  const [filesToSave, setFilesToSave] = useState<any[]>([])

  useEffect(() => {
    if (importedSongs.length) {
      setSongs([...songs, ...importedSongs])
    }
  }, [importedSongs])

  useEffect(() => {
    if (filesToSave.length) {
      saveFiles(filesToSave)
    }
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
            e.target.files && !isImporting && handleFiles(e.target.files)
          }
          style={{ display: 'none' }}
          ref={inputElement}
        />
      </div>
    </FormGroup>
  )

  async function handleFiles(fileList: FileList) {
    setImporting(true)

    if (fileList[0]) {
      const file = fileList[0]

      const fileType = file.name.split('.')[file.name.split('.').length - 1]

      if (fileType == 'zip') {
        const zipSongs: any = []

        let zipArt: {
          colors?: string[]
          data?: Blob | null
        } = {}

        let zipFiles: any[] = []

        let releaseDisplay = ''

        const files = await getFilesFromZip(file)

        for await (const file of files) {
          const type = getFileTypeFromName(file.name)

          if (type == 'flac' || type == 'wav') {
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

            zipFiles.push({
              fileId,
              data: file,
            })
          }

          if (type == 'png' || type == 'jpg' || type == 'jpeg') {
            const colors = await getColorsFromImage(file)

            zipArt = {
              colors,
              data: file,
            }
          }
        }

        setRelease({ ...release, display: releaseDisplay, art: zipArt.data })

        setArtColors(zipArt.colors)

        setImportedSongs(zipSongs)

        setFilesToSave(zipFiles)

        setImporting(false)
      }

      if (fileType == 'zoop') {
        const audioFileTypes = ['flac', 'wav', 'wave']

        const artFileTypes = ['png', 'jpg', 'jpeg']

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

          if (artFileTypes.includes(type)) {
            setRelease({ ...release, art: file })

            const colors = await getColorsFromImage(file)

            setArtColors(colors)
          }
        }

        return setImporting(false)
      }

      if (fileType == 'wav' || fileType == 'flac') {
        parseSong(file)

        return setImporting(false)
      }

      if (fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg') {
        parseSong(file)

        return setImporting(false)
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

  async function saveFiles(filesToSave: any[]) {
    for await (const file of filesToSave) {
      await localforage.setItem('tone.upload.' + file.fileId, file.data)
    }
  }
}
