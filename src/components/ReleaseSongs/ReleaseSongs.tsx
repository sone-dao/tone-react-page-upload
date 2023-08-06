'use client'

import { IUploadRelease, IUploadReleaseSong } from '../../UploadPage'
import styles from './ReleaseSongs.module.scss'
import SongPod from './SongPod'

interface IReleaseSongsProps {
  release: IUploadRelease
  setRelease: Function
  songCache: ArrayBuffer[]
}

export default function ReleaseSongs({
  release,
  setRelease,
}: IReleaseSongsProps) {
  const songs = release.songs
  return (
    <div className={styles.component}>
      {songs.length &&
        songs.map((song: IUploadReleaseSong, i: number) => (
          <SongPod
            key={i}
            index={i}
            song={song}
            release={release}
            setRelease={setRelease}
          />
        ))}
    </div>
  )
}
