import useToneApi from '@sone-dao/tone-react-api'
import { Form } from '@sone-dao/tone-react-core-ui'
import ToneCSSUtils from '@sone-dao/tone-react-css-utils'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ReleaseInfo from './components/ReleaseInfo'
import ReleaseTheme from './components/ReleaseTone'
import { ReleaseSong, UploadRelease } from './types'

type UploadPageProps = {
  user: any
  canUploadAs: any
}

const uploadReleaseDefaults: UploadRelease = {
  display: '',
  artists: [],
  type: 'lp',
  description: '',
  art: {},
  upc: '',
  catalog: '',
  credits: '',
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
  },
  pricing: {
    purchase: '',
    streamDefault: '',
  },
}

export default function UploadPage({ user, canUploadAs }: UploadPageProps) {
  const [release, setRelease] = useState<UploadRelease>(uploadReleaseDefaults)
  const [songs, setSongs] = useState<ReleaseSong[]>([])
  const [artColors, setArtColors] = useState<string[]>([])

  const api = new useToneApi()

  useEffect(() => {
    const { primary, secondary } = release.colors

    if (primary && secondary)
      ToneCSSUtils.setColors('global', primary, secondary)
  }, [release.colors])

  useEffect(() => {
    console.log({ release })
  }, [release])

  return (
    <>
      <Head>
        <title>Tone - Upload</title>
      </Head>
      <div className="p-4 bg-global text-global">
        <Form>
          <ReleaseInfo
            user={user}
            canUploadAs={canUploadAs}
            release={release}
            setReleaseProperty={setReleaseProperty}
            artColors={artColors}
          />
          <ReleaseTheme
            artColors={artColors}
            release={release}
            setReleaseProperty={setReleaseProperty}
          />
          {songs.length ? (
            songs.map((song, i) => (
              <div key={i} className="py-4 flex align-center justify-between">
                <span className="font-content">{song.display}</span>
                <span className="font-header">
                  {formatMSS(Math.trunc(song.duration))}
                </span>
              </div>
            ))
          ) : (
            <></>
          )}
        </Form>
      </div>
    </>
  )

  function setReleaseProperty(key: string, value: any) {
    setRelease({ ...release, [key as keyof typeof release]: value })
  }

  function formatMSS(s: any) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }

  function formatReleaseType(type: string) {
    switch (type) {
      case 'lp':
        return 'LP'
      case 'ep':
        return 'EP'
      case 'demo':
        return 'Demo'
      case 'comp':
        return 'Compilation'
    }
  }
}
