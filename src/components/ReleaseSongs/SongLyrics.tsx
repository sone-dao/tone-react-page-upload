import { IUploadReleaseSong } from '../../UploadPage'
import styles from './ReleaseSongs.module.scss'

interface ISongLyricsProps {
  index: number
  song: IUploadReleaseSong
  setSong: Function
}

export default function SongLyrics({ index, song, setSong }: ISongLyricsProps) {
  const { synced, unsynced } = song.lyrics

  return (
    <div className={styles.songLyrics}>
      <div className={styles.songLyricsTable}>
        {synced.length &&
          synced.map((lyric: { line: string; start: number }, i: number) => (
            <div className={styles.songLyric} key={i}>
              <div className={styles.lyricNumber}>
                {9 > i && '0'}
                {i + 1}
              </div>
              <div className={styles.lyricLine}>
                <input
                  value={lyric.line}
                  onChange={(e) => updateLine(i, e.target.value)}
                />
              </div>
              <div className={styles.lyricStart}>
                <input
                  value={lyric.start}
                  onChange={(e) => updateStart(i, parseInt(e.target.value))}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  async function updateLine(i: number, line: string) {
    const updatedSynced = [...synced]
    synced[i].line = line

    const updatedUnsynced = generateUnsynced(updatedSynced)

    const lyrics = { synced: updatedSynced, unsynced: updatedUnsynced }

    setSong({ ...song, lyrics })
  }

  async function updateStart(i: number, start: number) {
    const updatedSynced = [...synced]
    synced[i].start = start

    const lyrics = { synced: updatedSynced, unsynced }

    setSong({ ...song, lyrics })
  }

  function generateUnsynced(synced: { line: string; start: number }[]) {
    const lines = synced.map((lyric: any) => lyric.line)
    return lines.toString().replace(/,/g, '\n')
  }
}
