import {
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from '@sone-dao/tone-react-core-ui'
import { UploadRelease } from '../types'

type ReleaseInfoProps = {
  release: UploadRelease
  setReleaseProperty: Function
  artColors: string[]
}

export default function ReleaseInfo({
  release,
  setReleaseProperty,
  artColors,
}: ReleaseInfoProps) {
  return (
    <div>
      <Input
        label="release title"
        placeholder="Title of your release"
        value={release.display}
        setValue={(value: string) => setReleaseProperty('display', value)}
      />
      <RadioGroup
        //label="release type"
        orientation="horizontal"
        additionalClasses="my-4"
        value={release.type}
        setValue={(value: string) => setReleaseProperty('type', value)}
      >
        <Radio value="demo">Demo</Radio>
        <Radio value="ep">EP</Radio>
        <Radio value="lp">LP</Radio>
        <Radio value="split">Split</Radio>
        <Radio value="comp">Compilation</Radio>
      </RadioGroup>
      <Textarea
        label="about the release"
        additionalClasses="my-4"
        value={release.description}
        setValue={(value: string) => setReleaseProperty('description', value)}
      />
      <Textarea
        label="credits & thanks"
        additionalClasses="my-4"
        value={release.credits}
        setValue={(value: string) => setReleaseProperty('credits', value)}
      />
      <Input
        additionalClasses="mt-4 mb-2"
        label="tags"
        placeholder="type to search tags..."
      />
      <p className="bg-zinc-500 font-content text-sm text-white p-1 rounded-xl">
        <i className="fa-fw fa-solid fa-tag mr-1" />A little blurb on the
        importance of tags here.
      </p>
      <Input
        placeholder="EZ123420"
        additionalClasses="my-4"
        label="upc/ean"
        value={release.upc}
        setValue={(value: string) => setReleaseProperty('upc', value)}
      />
    </div>
  )
}
