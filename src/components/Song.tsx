import { Input, Textarea } from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'
import { ReleaseSong } from '../types'

type ReleaseSongProps = {
  index: number
  data: ReleaseSong
}

export default function Song({ index, data }: ReleaseSongProps) {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <div className="border-b-1 py-4">
      <h4
        className="font-header text-xl cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        {index + 1}. {data.display}
      </h4>
      <div className={`${isOpen ? 'flex' : 'hidden'} flex-col`}>
        <Input label="title" additionalClasses="my-2" value={data.display} />
        <Textarea
          label="lyrics"
          additionalClasses="my-2"
          value={data.lyrics.unsynced}
        />
        <Input label="isrc" additionalClasses="my-2" value={data.isrc} />
      </div>
    </div>
  )
}
