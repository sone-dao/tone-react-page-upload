'use client'

import * as mm from 'music-metadata-browser'
import { useEffect, useState } from 'react'
import DriveImport from './DriveImport'
import DropboxImport from './DropboxImport'
import styles from './ReleaseImporter.module.scss'
import ZipImport from './ZipImport'

interface IReleaseImporterProps {
  release: any
  setRelease: Function
  setSongCache: Function
}

export default function ReleaseImporter({
  release,
  setRelease,
  setSongCache,
}: IReleaseImporterProps) {
  const [releaseArt, setReleaseArt] = useState<
    { type: string; data: ArrayBuffer }[]
  >([])
  const [releaseSongs, setReleaseSongs] = useState<ArrayBuffer[]>([])

  useEffect(() => {
    parseReleaseArt()
  }, [releaseArt])

  useEffect(() => {
    if (releaseSongs.length) {
      parseReleaseSongs()
    }
  }, [releaseSongs])

  return (
    <div className={styles.component}>
      <div className={styles.importDisplay}>
        <DropboxImport />
        <DriveImport />
        <ZipImport
          setReleaseArt={setReleaseArt}
          setReleaseSongs={setReleaseSongs}
        />
      </div>
      <div className={styles.importInfo}>[Bulk Import Information]</div>
    </div>
  )

  async function parseReleaseSongs() {
    const songs: any[] = []
    const cache: ArrayBuffer[] = []
    const releaseNames: string[] = []
    const releaseArtists: string[] = []

    for await (const song of releaseSongs) {
      const array = new Uint8Array(song)

      const metadata = await mm.parseBuffer(array)

      const container = metadata.format.container || ''

      const approvedTypes = ['FLAC', 'WAVE']

      if (approvedTypes.includes(container)) {
        if (container == 'FLAC') {
          const releaseName = metadata.common.album || ''

          const artist = metadata.common.artist || ''

          !releaseNames.includes(releaseName) && releaseNames.push(releaseName)

          !releaseArtists.includes(artist) && releaseArtists.push(artist)

          const unsyncedLyrics =
            (await metadata.native['vorbis'].find(
              (x: any) => x.id === 'UNSYNCEDLYRICS'
            )?.value) || ''

          const split = unsyncedLyrics.split(/\r?\n|\r|\n/g) || []

          const syncedLyrics = split.map((line: string) => ({ line, start: 0 }))

          const isrc =
            (metadata.common.isrc?.length && metadata.common.isrc[0]) || ''

          const newSong = {
            display: metadata.common.title,
            isrc,
            lyrics: {
              unsynced: unsyncedLyrics,
              synced: syncedLyrics,
            },
            duration: metadata.format.duration,
            data: song,
          }

          songs.push(newSong)
        } else {
          const newSong = { duration: metadata.format.duration, data: song }

          songs.push(newSong)
        }
      }
    }

    const releaseName = releaseNames.length == 1 ? releaseNames[0] : ''

    setSongCache(cache)
    setRelease({ ...release, display: releaseName, songs })
  }

  async function parseReleaseArt() {
    let artwork = release.artwork

    releaseArt.map((art) => {
      artwork[art.type] = art.data
    })

    setRelease({ ...release, artwork })
  }
}
