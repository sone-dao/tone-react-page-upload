import { Input, Tags, Textarea } from '@sone-dao/tone-react-core-ui'
import { UploadRelease } from '../types'
import ArtistsInput from './ArtistsInput'

type ReleaseInfoProps = {
  custodialArtists: any[]
  canUploadAs: string[]
  release: UploadRelease
  setReleaseProperty: Function
  artColors: string[]
}

export default function ReleaseInfo({
  custodialArtists,
  canUploadAs,
  release,
  setReleaseProperty,
  artColors,
}: ReleaseInfoProps) {
  return (
    <div>
      <ArtistsInput
        custodialArtists={custodialArtists}
        setReleaseProperty={setReleaseProperty}
        release={release}
      />
      <Input
        label="release title"
        placeholder="Title of your release"
        value={release.display}
        setValue={(value: string) => setReleaseProperty('display', value)}
      />

      {/* 
      RELEASE PRICING HERE 
      - checked by default
      - streaming
      - "tracks should be this much unless I override them below" input
      - purchase
      - purchase component has a field for purchase amount for download
      - show avertage cost/put in tooltips for pricing suggestions???
      - changing checkboxes will display components
      */}
      <Textarea
        label="about the release"
        value={release.description}
        setValue={(value: string) => setReleaseProperty('description', value)}
        className="my-4"
        styles={{
          textarea: {
            height: '15vh',
          },
        }}
      />
      <Textarea
        label="credits & thanks"
        value={release.credits}
        setValue={(value: string) => setReleaseProperty('credits', value)}
        className="my-4"
        styles={{
          textarea: {
            height: '15vh',
          },
        }}
      />
      <Tags
        tags={release.tags}
        setTags={(tags) => setReleaseProperty('tags', tags)}
      />
      <Input
        placeholder="EZ123420"
        label="upc/ean"
        value={release.upc}
        setValue={(value: string) => setReleaseProperty('upc', value)}
        className="my-2"
      />
    </div>
  )
}
