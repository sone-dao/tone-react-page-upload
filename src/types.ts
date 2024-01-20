export type UploadRelease = {
  display: string
  artists?: string[]
  type: string
  description: string
  art: ReleaseArt
  upc: string
  catalog: string
  credits: string
  colors: {
    primary: string
    secondary: string
  }
  pricing?: {
    purchase?: string
    streamDefault?: string
  }
}

export type ReleaseArt = {
  [key: string]: { blob: Blob; dataURL: string; colors?: string[] }
}

export type ReleaseSong = {
  display: string
  lyrics: {
    unsynced: string
    synced?: { line: string; start: number }[]
  }
  duration: number
  isrc: string
  fileId: string
  pricing?: {
    purchase?: string
    stream?: string
  }
}
