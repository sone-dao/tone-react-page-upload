import { win } from '@sone-dao/sone-react-utils'
import { prominent } from 'color.js'
import JSZip from 'jszip'
import localforage from 'localforage'
import * as mm from 'music-metadata-browser'
import { v4 as uuidv4 } from 'uuid'
import { ReleaseArt, ReleaseSong } from '../types'

export default class ImportZip {
  debug: boolean
  zip: Blob
  files: {
    name: string
    blob: Blob
  }[]
  art: ReleaseArt[]
  songs: ReleaseSong[]

  constructor(file: File) {
    this.zip = file
    this.files = []
    this.art = []
    this.songs = []

    this.debug = win.TONE_DEBUG ? true : false
  }

  async getFiles() {
    this.debug && console.log('Getting files from zip...')

    const zip = await JSZip.loadAsync(this.zip)

    const paths: string[] = []

    zip.forEach(async (relativePath) => paths.push(relativePath))

    for await (const path of paths) {
      const file = zip.file(path)!

      const type = this.getTypeFromExtension(file.name)

      this.files.push({
        name: file.name,
        blob: new Blob([await file?.async('blob')], { type }),
      })
    }

    this.debug && console.log({ files: this.files })

    return this.files
  }

  async getArtFromFiles() {
    const artFiles = this.files
      .map((file) => file.blob.type.split('/')[0] == 'image' && file)
      .filter((x) => x)

    for await (const file of artFiles) {
      if (file && file.blob) {
        const blob = file.blob

        const dataURL = await this.blobToDataURL(blob)

        const type = file.name.split('.')[0]

        const validTypes = [
          'cover',
          'back',
          'insert',
          'gate_left',
          'gate_right',
          'jcard',
        ]

        if (validTypes.includes(type)) {
          const colors = await prominent(dataURL, {
            amount: 5,
            format: 'hex',
            group: 100,
          })

          this.art = { ...this.art, [type]: { blob, dataURL, colors } }
        }
      }
    }

    this.debug && console.log({ art: this.art })

    return this.art
  }

  async getSongsFromFiles() {
    const songs = this.files
      .map((file) => file.blob.type.split('/')[0] == 'audio' && file)
      .filter((x) => x)

    for await (const song of songs) {
      if (song && song.blob) {
        const blob = song.blob

        const fileId = uuidv4()

        await localforage.setItem('tone.uploader.' + fileId, blob)

        mm.parseBlob(blob).then(async (meta) => {
          if (meta.format.lossless) {
            const display = meta.common.title || ''

            const unsyncedLyrics =
              (await meta.native['vorbis'].find(
                (x: any) => x.id === 'UNSYNCEDLYRICS'
              )?.value) || ''

            const duration = meta.format.duration || 0

            const isrc = (meta.common.isrc?.length && meta.common.isrc[0]) || ''

            this.songs.push({
              display,
              lyrics: { unsynced: unsyncedLyrics },
              duration,
              isrc,
              fileId,
            })
          }
        })
      }
    }

    this.debug && console.log({ songs: this.songs })

    return this.songs
  }

  getTypeFromExtension(filename: string) {
    const split = filename.split('.')

    const extension = filename.split('.')[split.length - 1]

    switch (extension) {
      case 'flac':
        return 'audio/flac'
      case 'jpg':
        return 'image/jpeg'
      case 'jpeg':
        return 'image/jpeg'
      case 'png':
        return 'image/png'
    }
  }

  async blobToDataURL(blob: Blob) {
    return new Promise<string>(async (resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => resolve(e.target?.result as string)

      reader.readAsDataURL(blob)
    })
  }
}
