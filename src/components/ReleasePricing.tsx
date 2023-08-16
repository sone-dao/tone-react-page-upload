import {
  CheckboxInput,
  CurrencyInput,
  FormGroup,
  InfoMessage,
} from '@sone-dao/tone-react-form-ui'
import { useEffect, useState } from 'react'
import { IUploadRelease } from '../UploadPage'
import styles from '../UploadPage.module.scss'

interface IReleasePricingProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ReleasePricing({
  release,
  setRelease,
}: IReleasePricingProps) {
  const [streamPrice, setStreamPrice] = useState<number>(0.0)
  const [purchasePrice, setPurchasePrice] = useState<number>(0.0)
  const [payMore, setPayMore] = useState<boolean>(false)
  const [freeStream, setFreeStream] = useState<boolean>(false)
  const [hasPurchasePricing, setPurchasePricing] = useState<boolean>(false)

  useEffect(() => {
    console.log(streamPrice)
  }, [streamPrice])

  return (
    <div className={styles.section}>
      <FormGroup display="Default Stream Pricing" required>
        <CurrencyInput value={streamPrice} setValue={setStreamPrice} />
        <InfoMessage style={{ margin: '0.5rem 0' }}>
          Song pricing can still be adjusted on an individual basis below.
        </InfoMessage>
        <CheckboxInput value={freeStream} setValue={setFreeStream}>
          Allow free streaming for public listeners / listeners with
          insufficient funds
          <i
            style={{ marginLeft: '0.25rem' }}
            className="fa-sharp fa-light fa-face-smile-halo"
          />
        </CheckboxInput>
      </FormGroup>
      <hr />
      <FormGroup display="Purchase Pricing">
        <CheckboxInput value={hasPurchasePricing} setValue={setPurchasePricing}>
          Enable purchasing
        </CheckboxInput>
        <InfoMessage style={{ margin: '0.5rem 0' }}>
          Allow a listener to purchase this release for a set price. A purchased
          release in a listener's library will allow them to bypass the pay per
          stream price when played.
        </InfoMessage>
        <CurrencyInput value={purchasePrice} setValue={setPurchasePrice} />
        <CheckboxInput
          style={{ marginTop: '0.5rem' }}
          value={payMore}
          setValue={setPayMore}
        >
          Allow listeners to pay more
          <i
            style={{ marginLeft: '0.25rem' }}
            className="fa-sharp fa-light fa-face-smile-hearts"
          />
        </CheckboxInput>
      </FormGroup>
    </div>
  )
}
