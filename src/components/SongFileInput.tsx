import localforage from 'localforage'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getMetadata } from '../utils/audio'

type SongFileInputProps = {
  index: number
  fileId: string
  setReleaseSong: Function
}

export default function SongFileInput({
  index,
  fileId,
  setReleaseSong,
}: SongFileInputProps) {
  const [file, setFile] = useState<File | null>(null)

  const inputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    handleFile(file)
  }, [file])

  return (
    <div>
      {fileId ? (
        <div className="flex items-center justify-between w-full p-1 border-2 rounded-xl border-global mb-4 w-full">
          <button type="button">
            <i className="fa-fw fa-sharp fa-solid fa-play text-3xl px-2" />
          </button>
          <button type="button" onClick={() => setFile(null)}>
            <i className="fa-fw fa-sharp fa-regular fa-xmark text-2xl px-2" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center justify-center border-2 border-dashed border-global p-4 rounded-xl mb-4 w-full"
          onClick={() => inputElement.current?.click()}
        >
          <i className="fa-fw fa-solid fa-file-audio mr-1" />
          Click/tap to upload an audio file
        </button>
      )}
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputElement}
        onChange={(e) => setFile(e.target.files![0])}
      />
    </div>
  )

  async function handleFile(file: File | null) {
    if (file) {
      const validTypes = ['wav', 'flac']

      const fileType = file.name.split('.')[file.name.split('.').length - 1]

      if (validTypes.includes(fileType)) {
        const meta = await getMetadata(file)

        if (meta.lossless) {
          const fileId = uuidv4()

          await localforage.setItem('tone.upload.' + fileId, file)

          setReleaseSong(index, { fileId })
        }
      }
    } else {
      if (fileId) {
        await localforage.removeItem('tone.upload.' + fileId).then(() => {
          setReleaseSong(index, { fileId: '' })
        })
      }
    }
  }
}
