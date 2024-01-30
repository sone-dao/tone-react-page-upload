import * as mm from 'music-metadata-browser'

export async function getMetadata(file: File) {
  return mm.parseBlob(file).then(async (meta) => {
    const lossless = meta.format.lossless || false

    const releaseDisplay = meta.common.album

    const display = meta.common.title || ''

    const unsyncedLyrics =
      (await meta.native['vorbis'].find((x: any) => x.id === 'UNSYNCEDLYRICS')
        ?.value) || ''

    const duration = meta.format.duration || 0

    const isrc = meta.common.isrc?.length ? meta.common.isrc[0] : ''

    return { lossless, releaseDisplay, display, unsyncedLyrics, duration, isrc }
  })
}
