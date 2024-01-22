import useToneApi from '@sone-dao/tone-react-api'
import { Form, TonePicker } from '@sone-dao/tone-react-core-ui'
import ToneCSSUtils from '@sone-dao/tone-react-css-utils'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ColorPalette from './components/ColorPalette'
import ReleaseArtInput from './components/ReleaseArtInput'
import ReleaseImport from './components/ReleaseImport'
import ReleaseInfo from './components/ReleaseInfo'
import SongItem from './components/SongItem'
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
  art: null,
  tags: [],
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

  useEffect(() => {
    console.log({ songs })
  }, [songs])

  useEffect(() => {
    console.log({ artColors })
  }, [artColors])

  return (
    <>
      <Head>
        <title>Tone - Upload</title>
      </Head>
      <div className="p-4 bg-global text-global">
        <ReleaseImport
          release={release}
          setRelease={setRelease}
          songs={songs}
          setSongs={setSongs}
          setArtColors={setArtColors}
        />
        <Form>
          <ReleaseArtInput
            art={release.art}
            setArt={(art) => art && setReleaseProperty('art', art)}
            artColors={artColors}
            setArtColors={setArtColors}
          />
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
            {artColors.length ? <ColorPalette artColors={artColors} /> : <></>}
          </TonePicker>
          <div className="my-4">
            {songs.length ? (
              songs.map((song, i) => (
                <SongItem
                  index={i}
                  song={song}
                  setReleaseSong={setReleaseSong}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </Form>
      </div>
    </>
  )

  function setReleaseProperty(key: string, value: any) {
    setRelease({ ...release, [key as keyof typeof release]: value })
  }

  function setReleaseSong(index: number, data: any) {
    const updatedSongs = songs.map((song, i) =>
      index == i ? { ...song, ...data } : song
    )

    setSongs(updatedSongs)
  }
}
