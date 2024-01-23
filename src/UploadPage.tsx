import useToneApi from '@sone-dao/tone-react-api'
import {
  Button,
  Checkbox,
  Form,
  TonePicker,
} from '@sone-dao/tone-react-core-ui'
import ToneCSSUtils from '@sone-dao/tone-react-css-utils'
import localforage from 'localforage'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import ColorPalette from './components/ColorPalette'
import ReleaseArtInput from './components/ReleaseArtInput'
import ReleaseImport from './components/ReleaseImport'
import ReleaseInfo from './components/ReleaseInfo'
import SongItem from './components/SongItem'
import { ReleaseSong, UploadRelease } from './types'
import { blobToDataURL } from './utils/file'

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

const releaseSongDefaults: ReleaseSong = {
  display: '',
  lyrics: {
    unsynced: '',
  },
  duration: 0,
  isrc: '',
  fileId: '',
}

export default function UploadPage({ user, canUploadAs }: UploadPageProps) {
  const [release, setRelease] = useState<UploadRelease>(uploadReleaseDefaults)
  const [songs, setSongs] = useState<ReleaseSong[]>([])
  const [artColors, setArtColors] = useState<string[]>([])
  const [isImporting, setImporting] = useState<boolean>(false)
  const [playingId, setPlayingId] = useState<string>('')
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [publish, setPublish] = useState<boolean>(true)
  const [agreeTOS, setAgreeTOS] = useState<boolean>(false)

  const api = new useToneApi()

  const audioElement = useRef<HTMLAudioElement>(null)

  const uploadPlayer = {
    play: async (fileId?: string) => {
      if (fileId && fileId !== playingId) {
        const namespace = 'tone.upload.' + fileId

        await localforage.getItem(namespace).then(async (file) => {
          console.log({ file })

          const dataURL = await blobToDataURL(file as File)

          console.log({ dataURL })

          audioElement.current?.pause()

          audioElement.current?.setAttribute('src', dataURL)

          audioElement.current?.play()

          setPlayingId(fileId)

          setPlaying(true)
        })
      }

      audioElement.current?.play()

      setPlaying(true)
    },
    pause: async () => {
      audioElement.current?.pause()

      setPlaying(false)
    },
    stop: () => {
      audioElement.current?.pause()

      setPlaying(false)

      setPlayingId('')
    },
    fileId: playingId,
    isPlaying,
  }

  useEffect(() => {
    if (release.colors[0] && release.colors[1])
      ToneCSSUtils.setColors('global', release.colors[0], release.colors[1])
  }, [release.colors])

  return (
    <>
      <Head>
        <title>Tone - Upload</title>
      </Head>
      <audio style={{ display: 'none' }} ref={audioElement} />
      <div className="p-4 bg-global text-global">
        <ReleaseImport
          release={release}
          setRelease={setRelease}
          songs={songs}
          setSongs={setSongs}
          setArtColors={setArtColors}
          isImporting={isImporting}
          setImporting={setImporting}
        />
        <Form
          onSubmit={() => console.log('Release Form submit')}
          disabled={isImporting}
        >
          <ReleaseArtInput
            art={release.art}
            setArt={(art) => setReleaseProperty('art', art)}
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
          <div className="my-2">
            {songs.length ? (
              songs.map((song, i) => (
                <SongItem
                  key={i}
                  index={i}
                  song={song}
                  setReleaseSongProperties={setReleaseSongProperties}
                  removeSongFromRelease={removeSongFromRelease}
                  uploadPlayer={uploadPlayer}
                />
              ))
            ) : (
              <></>
            )}
          </div>
          <button
            type="button"
            className="flex items-center justify-center p-4 border-2 border-dashed border-global w-full rounded-xl cursor-pointer my-4"
            onClick={() => addNewSongToRelease()}
          >
            <i className="fa-fw fa-solid fa-tv-music mr-1" />
            Click/tap to add song
          </button>
          <div className="flex flex-col border-4 border-global rounded-xl p-2">
            <Checkbox
              className="my-2"
              value={agreeTOS}
              setValue={setAgreeTOS}
              label={
                <>
                  I agree to Tone's{' '}
                  <span className="underline">Terms of Service</span>
                </>
              }
            />
            <Button isDisabled={!agreeTOS}>Upload Release</Button>
          </div>
        </Form>
      </div>
    </>
  )

  function setReleaseProperty(key: string, value: any) {
    return setRelease({ ...release, [key as keyof typeof release]: value })
  }

  function setReleaseSongProperties(index: number, data: any) {
    const updatedSongs = songs.map((song, i) =>
      index == i ? { ...song, ...data } : song
    )

    return setSongs(updatedSongs)
  }

  function addNewSongToRelease() {
    return setSongs([...songs, releaseSongDefaults])
  }

  function removeSongFromRelease(index: number) {
    const fileId = songs[index].fileId

    if (fileId) {
      localforage.removeItem('tone.upload.' + fileId)
    }

    if (fileId == playingId) uploadPlayer.pause()

    const updatedSongs = songs.filter((song: any, i: number) => {
      if (i !== index) return song
    })

    setSongs(updatedSongs)
  }
}
