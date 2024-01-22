import { Input, Textarea } from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'
import { ReleaseSong } from '../types'

type SongItemProps = {
  index: number
  song: ReleaseSong
  setReleaseSong: Function
}

export default function SongItem({
  index,
  song,
  setReleaseSong,
}: SongItemProps) {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <div className="border-b-1">
      <div
        className="flex items-center justify-between py-4 cursor-pointer text-lg"
        onClick={() => setOpen(!isOpen)}
      >
        <h4 className="font-content">
          {index + 1}. {song.display}
        </h4>
        <div>
          <span>{formatMSS(Math.floor(song.duration))}</span>
          <i
            className={`fa-sharp fa-solid ${
              !isOpen ? 'fa-angle-right' : 'fa-angle-down'
            } ml-2`}
          />
        </div>
      </div>
      <div className={`${isOpen ? 'flex' : 'hidden'} flex-col`}>
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
        <Input
          label="title"
          value={song.display}
          setValue={(value) => setReleaseSong(index, { display: value })}
        />
        <Textarea
          label="lyrics"
          value={song.lyrics.unsynced}
          setValue={(value) =>
            setReleaseSong(index, { lyrics: { unsynced: value } })
          }
          className="my-4"
        />
        <Input
          label="isrc"
          value={song.isrc}
          setValue={(value) => setReleaseSong(index, { isrc: value })}
        />
      </div>
    </div>
  )

  function formatMSS(s: any) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }
}
