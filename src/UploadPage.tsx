'use client'

import useToneApi from '@sone-dao/tone-react-api'
import { Page, Switch } from '@sone-dao/tone-react-core-ui'
import { useEffect, useState } from 'react'
import { name, version } from '../package.json'
import BulkUpload from './components/BulkUpload'
import ReleaseArt from './components/ReleaseArt'
import ReleaseInfo from './components/ReleaseInfo'
import ReleaseTheme from './components/ReleaseTheme'
import Song from './components/Song'
import { ReleaseSong, UploadRelease } from './types'
import ToneCSSUtils from './utils/css'

type UploadPageProps = {}

const uploadReleaseDefaults: UploadRelease = {
  display: '',
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
}

export default function UploadPage({}: UploadPageProps) {
  const [release, setRelease] = useState<UploadRelease>(uploadReleaseDefaults)
  const [songs, setSongs] = useState<ReleaseSong[]>([])
  const [artColors, setArtColors] = useState<string[]>([])
  const [dark, setDark] = useState<boolean>(false)

  const api = new useToneApi()

  useEffect(() => {
    console.log({ release })
  }, [release])

  useEffect(() => {
    const { primary, secondary } = release.colors

    if (primary && secondary)
      ToneCSSUtils.setColors('tone-upload-preview', primary, secondary)
  }, [release.colors])

  return (
    <Page name={name} version={version} className="flex">
      <div className={'w-1/2 ' + (dark ? 'dark' : 'light')}>
        <div
          className="p-4 h-full max-h-screen bg-[var(--tone-upload-preview-lighter)] text-[var(--tone-upload-preview-darker)] dark:bg-[var(--tone-upload-preview-darker)] dark:text-[var(--tone-upload-preview-lighter)]"
          style={{ overflowY: 'scroll' }}
        >
          <Switch
            value={dark}
            classNames={{
              wrapper:
                'bg-[var(--tone-upload-preview-darker)] group-data-[selected=true]:bg-[var(--tone-upload-preview-darker)] dark:bg-[var(--tone-upload-preview-lighter)] dark:group-data-[selected=true]:bg-[var(--tone-upload-preview-lighter)]',
              thumb:
                'bg-[var(--tone-upload-preview-lighter)] dark:bg-[var(--tone-upload-preview-darker)]',
            }}
            setValue={setDark}
            thumbIcon={({ isSelected, className }: any) =>
              isSelected ? (
                <i
                  className="
                    'fa-fw fa-sharp fa-solid fa-moon text-[var(--tone-upload-preview-lighter)]"
                />
              ) : (
                <i
                  className="
                    'fa-fw fa-solid fa-sun text-[var(--tone-upload-preview-darker)]
                  "
                />
              )
            }
          />
          <div>
            <div className="w-full flex items-center justify-center p-4">
              {release.art.length ? (
                <img
                  src={release.art['cover']?.dataURL}
                  style={{ height: '100%', maxWidth: 'auto' }}
                />
              ) : (
                <div
                  className="flex bg-[var(--tone-upload-preview-darker)] dark:bg-[var(--tone-upload-preview-lighter)]"
                  style={{ height: '100%', width: '100%', maxWidth: 'auto' }}
                />
              )}
            </div>
            {release.display ? (
              <h1 className="font-release text-5xl font-bold">
                {release.display}
              </h1>
            ) : (
              <h1 className="font-release text-5xl font-bold opacity-20">
                Title of your release
              </h1>
            )}
            <p className="font-content text-sm mb-2">
              by <span className="font-header">[artist]</span>
            </p>
            <p className="font-header text-sm">
              {songs.length || 0} song{songs.length !== 1 && 's'}, total time,
              {' ' + formatReleaseType(release.type)}
            </p>
            <p className="font-content text-sm">
              Released on <span className="font-header">[date]</span>
            </p>
          </div>
          <div>
            <h4 className="font-header hidden">About the release</h4>
            <p className="font-content whitespace-pre-wrap">
              {release.description}
            </p>
          </div>
          <div>
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
          </div>
          <div>
            <h4 className="font-header hidden">Release credits</h4>
            <p className="font-content whitespace-pre-wrap">
              {release.credits}
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 max-h-screen p-4" style={{ overflowY: 'scroll' }}>
        <ReleaseArt
          release={release}
          setReleaseProperty={setReleaseProperty}
          artColors={artColors}
          setArtColors={setArtColors}
        />
        <ReleaseInfo
          release={release}
          setReleaseProperty={setReleaseProperty}
          artColors={artColors}
        />
        <ReleaseTheme
          artColors={artColors}
          release={release}
          setReleaseProperty={setReleaseProperty}
        />
        <BulkUpload
          setReleaseProperty={setReleaseProperty}
          setSongs={setSongs}
        />
        {songs.map((data, i) => (
          <Song key={i} index={i} data={data} />
        ))}
      </div>
    </Page>
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
