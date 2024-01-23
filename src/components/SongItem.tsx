import { Button, Input, Textarea } from '@sone-dao/tone-react-core-ui'
import { useEffect, useState } from 'react'
import { ReleaseSong } from '../types'
import SongFileInput from './SongFileInput'

type SongItemProps = {
  index: number
  song: ReleaseSong
  setReleaseSongProperties: Function
  removeSongFromRelease: Function
  uploadPlayer: any
}

export default function SongItem({
  index,
  song,
  setReleaseSongProperties,
  removeSongFromRelease,
  uploadPlayer,
}: SongItemProps) {
  const [isOpen, setOpen] = useState<boolean>(false)

  useEffect(() => {
    !song.display && setOpen(true)
  }, [])

  return (
    <div className="border-b-1 border-global">
      <div
        className="flex items-center justify-between py-4 cursor-pointer text-lg"
        onClick={() => setOpen(!isOpen)}
      >
        <h4 className="font-content">
          {index + 1}.
          {song.display ? (
            <span className="ml-1">{song.display}</span>
          ) : (
            <span className="ml-1 opacity-30 font-italic">Untitled Song</span>
          )}
        </h4>
        <div>
          <span>
            {song.duration ? formatMSS(Math.floor(song.duration)) : <></>}
          </span>
          <i
            className={`fa-sharp fa-solid ${
              !isOpen ? 'fa-angle-right' : 'fa-angle-down'
            } ml-2`}
          />
        </div>
      </div>
      <div className={`${isOpen ? 'flex' : 'hidden'} flex-col mb-4`}>
        {/**
         * Dynamically set pricing blurb
         */}
        {/**
         * "PURCHASE PRICING" COMPONENT
         * - dollar amount
         * - e z p z
         * - can enter 0
         * - allow the listner to pay more (checkbox)
         */}
        {/**
         * "STREAMING PRICING" COMPONENT
         * - dollar amount
         * - can enter 0
         * - can differ from main streaming price
         * - alert about pricing concerns
         * - "hey, 50% of tone listeners have their settings set to not play music abouve this"
         * - listeners can choose to not pay you greedy lil bitch
         *
         */}
        <SongFileInput
          index={index}
          fileId={song.fileId}
          setReleaseSong={setReleaseSongProperties}
          uploadPlayer={uploadPlayer}
        />
        <Input
          label="title"
          value={song.display}
          setValue={(value) =>
            setReleaseSongProperties(index, { display: value })
          }
        />
        <Textarea
          label="lyrics"
          value={song.lyrics.unsynced}
          setValue={(value) =>
            setReleaseSongProperties(index, { lyrics: { unsynced: value } })
          }
          className="my-4"
          styles={{
            textarea: {
              height: '15vh',
            },
          }}
        />
        <Input
          label="isrc"
          value={song.isrc}
          setValue={(value) => setReleaseSongProperties(index, { isrc: value })}
        />
        <Button
          isSubmit={false}
          className="mt-4"
          onClick={() => removeSongFromRelease(index)}
        >
          Remove Song From Release
        </Button>
      </div>
    </div>
  )

  function formatMSS(s: any) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }
}
