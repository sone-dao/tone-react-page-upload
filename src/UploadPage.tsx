'use client'

import { Page } from '@sone-dao/tone-react-core-ui'
import { useEffect, useState } from 'react'
import ReleaseArtwork from './components/ReleaseArtwork/ReleaseArtwork'
import ReleaseHeader from './components/ReleaseHeader'
import ReleaseImporter from './components/ReleaseImporter/ReleaseImporter'
import ReleaseMetadata from './components/ReleaseMetadata'
import ReleasePricing from './components/ReleasePricing'
import ReleaseSongs from './components/ReleaseSongs/ReleaseSongs'

import styles from './UploadPage.module.scss'

export interface IUploadReleaseSong {
  display: string
  lyrics: {
    unsynced: string
    synced: {
      line: string
      start: number
    }[]
  }
  description: string
  isrc: string
  iswc: string
  duration: number
  data: ArrayBuffer | null
  uploaded: {
    flac: boolean
    '128': boolean
    '320': boolean
  }
}

export const uploadReleaseSongDefaults: IUploadReleaseSong = {
  display: '',
  lyrics: {
    unsynced: '',
    synced: [],
  },
  description: '',
  isrc: '',
  iswc: '',
  duration: 0,
  data: null,
  uploaded: {
    flac: false,
    '128': false,
    '320': false,
  },
}

export interface IUploadArtwork {
  cover: ArrayBuffer | null
  back?: ArrayBuffer | null
  gatefoldL?: ArrayBuffer | null
  gatefoldR?: ArrayBuffer | null
  vinyl?: ArrayBuffer | null
  insert?: ArrayBuffer | null
  tape?: ArrayBuffer | null
}

const uploadArtworkDefaults = {}

export interface IUploadRelease {
  artists: {
    uniqueUrl: string
    display: string
    colors: {
      primary: string
      secondary: string
    }
  }[]
  labels: {
    uniqueUrl: string
    display: string
    colors: {
      primary: string
      secondary: string
    }
  }[]
  display: string
  custodians: { owners: string[]; maintainers: string[] }
  description: string
  credits: {
    written: string
    tagged: string[]
  }
  artwork: IUploadArtwork
  colors: {
    primary: string
    secondary: string
  }
  tags: string[]
  upc: string
  catalog: ''
  songs: IUploadReleaseSong[]
}

interface IUploadPageProps {
  releaseData: {
    artists: {
      uniqueUrl: string
      display: string
      colors: {
        primary: string
        secondary: string
      }
    }[]
    labels: {
      uniqueUrl: string
      display: string
      colors: {
        primary: string
        secondary: string
      }
    }[]
    display: string
    description: string
  }
}

export default function UploadPage({ releaseData }: IUploadPageProps) {
  const uploadReleaseDefaults: IUploadRelease = {
    artists: releaseData.artists.length ? releaseData.artists : [],
    labels: releaseData.labels.length ? releaseData.labels : [],
    display: releaseData.display || '',
    custodians: { owners: [], maintainers: [] },
    description: releaseData.description || '',
    credits: {
      written: '',
      tagged: [],
    },
    artwork: {
      cover: null,
    },
    colors: {
      primary: '',
      secondary: '',
    },
    tags: [],
    upc: '',
    catalog: '',
    songs: [],
  }

  const [release, setRelease] = useState<IUploadRelease>(uploadReleaseDefaults)
  const [songCache, setSongCache] = useState<ArrayBuffer[]>([])

  useEffect(() => {
    console.log({ release })
  }, [release])

  return (
    <Page className={styles.component}>
      <ReleaseImporter
        release={release}
        setRelease={setRelease}
        setSongCache={setSongCache}
      />
      <ReleaseHeader release={release} setRelease={setRelease} />
      <ReleasePricing release={release} setRelease={setRelease} />
      <ReleaseArtwork release={release} setRelease={setRelease} />
      <ReleaseMetadata release={release} setRelease={setRelease} />
      <ReleaseSongs
        release={release}
        setRelease={setRelease}
        songCache={songCache}
      />
    </Page>
  )
}
