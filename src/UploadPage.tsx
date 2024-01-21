import useToneApi from '@sone-dao/tone-react-api'
import { Form, TonePicker } from '@sone-dao/tone-react-core-ui'
import ToneCSSUtils from '@sone-dao/tone-react-css-utils'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ColorPalette from './components/ColorPalette'
import ReleaseArtInput from './components/ReleaseArtInput'
import ReleaseInfo from './components/ReleaseInfo'
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
  tags: [],
  art: {},
  upc: '',
  catalog: '',
  credits: '',
  colors: ['#000000', '#FFFFFF'],
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
    if (release.colors[0] && release.colors[1])
      ToneCSSUtils.setColors('global', release.colors[0], release.colors[1])
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
          <ReleaseArtInput setReleaseArt={(art) => {}} />
          <ReleaseInfo
            user={user}
            canUploadAs={canUploadAs}
            release={release}
            setReleaseProperty={setReleaseProperty}
            artColors={artColors}
          />
          <TonePicker
            tone={release.colors}
            setTone={(tone) => setReleaseProperty('colors', tone)}
          >
            <p className="text-global text-sm font-content">
              These colors will represent this release on the platform, and will
              effect the sites visual appearance when interacting with pages
              relating to it (ie. search colors, release page, etc). You can
              change these colors at anytime in the release's settings.
            </p>
            {artColors.length ? (
              <div className="w-full">
                <ColorPalette artColors={artColors} />
                <p className="bg-global-flipped font-content my-4 text-sm text-global-flipped p-2 rounded-xl">
                  <i className="fa-sharp fa-solid fa-circle-info mr-1" />
                  We've gathered these colors from the art you've uploaded.
                  Click to copy it's hex code.
                </p>
              </div>
            ) : (
              <></>
            )}
          </TonePicker>
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
