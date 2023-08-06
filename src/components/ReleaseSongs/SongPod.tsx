'use client'

import { useEffect, useState } from 'react'
import { IUploadRelease, IUploadReleaseSong } from '../../UploadPage'
import styles from './ReleaseSongs.module.scss'
import SongLyrics from './SongLyrics'

interface ISongPodProps {
  index: number
  song: IUploadReleaseSong
  release: IUploadRelease
  setRelease: Function
}

export default function SongPod({ index, release, setRelease }: ISongPodProps) {
  const [song, setSong] = useState<IUploadReleaseSong>(release.songs[index])
  const [blobURL, setBlobURL] = useState<string>('')
  const [isLocked, setLocked] = useState<boolean>(false)
  const [isOpen, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const updatedSongs = [...release.songs]
    updatedSongs[index] = song

    setRelease({ ...release, songs: updatedSongs })
  }, [song])

  return (
    <div className={styles.songPod}>
      <div className={styles.songPodHeader} onClick={() => setOpen(!isOpen)}>
        <span className={styles.songNumber}>{index + 1}.</span>
        <span>{song.display}</span>
        <span className={styles.songLock}>
          <i
            className={`fa-sharp ${
              !isLocked ? 'fa-regular' : 'fa-solid'
            } fa-lock${!isLocked && '-open'}`}
          />
        </span>
      </div>
      <div
        className={styles.songPodForm}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div className={styles.group}>
          <h5>Song Title</h5>
          <input
            value={song.display}
            onChange={(e) => updateSong(index, 'display', e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <audio controls style={{ width: '100%' }}>
            <source type="audio/flac" />
          </audio>
        </div>
        <div className={styles.group}>
          <h5>Song Lyrics</h5>
          <SongLyrics index={index} song={song} setSong={setSong} />
        </div>

        <div className={styles.group}>
          <h5>ISRC</h5>
          <input
            value={song.isrc}
            onChange={(e) => updateSong(index, 'isrc', e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <h5>ISWC</h5>
          <input
            value={song.iswc}
            onChange={(e) => updateSong(index, 'iswc', e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  async function updateSong(index: number, key: string, value: any) {
    const updatedSong = { ...release.songs[index], [key]: value }

    let updatedSongs = release.songs

    updatedSongs[index] = updatedSong

    setRelease({ ...release, songs: updatedSongs })
  }
}
