export type UploadRelease = {
  display: string
  artists?: string[]
  type: string
  description: string
  tags: any[]
  art: Blob | null
  upc: string
  catalog: string
  credits: string
  colors: [string, string]
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
}
