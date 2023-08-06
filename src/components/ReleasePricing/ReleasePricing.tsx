import { useState } from 'react'
import { IUploadRelease } from '../../UploadPage'
import styles from './ReleasePricing.module.scss'

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
  const [libraryPrice, setLibraryPrice] = useState<number>(0.0)
  const [hasPurchasePricing, setPurchasePricing] = useState<boolean>(false)
  //const [hasLibraryPricing, setLibraryPricing] = useState<boolean>(false)
  return (
    <div className={styles.component}>
      <div className={styles.group}>
        <h5>Default Stream Price</h5>
        <div>
          <input
            value={streamPrice}
            onChange={(e) => setStreamPrice(+e.target.value)}
          />
        </div>
        <p style={{ margin: '0.5rem 0' }}>
          <i className="fa-fw fa-sharp fa-solid fa-circle-info" />
          Song pricing can still be adjusted on an individual basis.
        </p>
        <span
          className={styles.select}
          style={{ margin: 0 }}
          onClick={() => setFreeStream(!freeStream)}
        >
          {freeStream ? (
            <i className="fa-fw fa-sharp fa-solid fa-square-check" />
          ) : (
            <i className="fa-fw fa-sharp fa-light fa-square" />
          )}
          <span>
            Allow free streaming for public listeners / listeners with
            insufficient funds
            <i
              style={{ marginLeft: '0.25rem' }}
              className="fa-sharp fa-light fa-face-smile-halo"
            />
          </span>
        </span>
      </div>
      <hr />
      <div className={styles.group}>
        <h5>Purchase Pricing</h5>
        <span
          className={styles.select}
          style={{ marginTop: '0' }}
          onClick={() => setPurchasePricing(!hasPurchasePricing)}
        >
          {hasPurchasePricing ? (
            <i className="fa-fw fa-sharp fa-solid fa-square-check" />
          ) : (
            <i className="fa-fw fa-sharp fa-light fa-square" />
          )}
          Enable purchasing
        </span>
        <p style={{ marginBottom: '0.5rem' }}>
          <i className="fa-fw fa-sharp fa-solid fa-circle-info" />
          Allow a listener to purchase this release for a set price. A purchased
          release in a listener's library will allow them to bypass the pay per
          stream price when played.
        </p>
        <div>
          <input
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(+e.target.value)}
          />
        </div>
        <span className={styles.select} onClick={() => setPayMore(!payMore)}>
          {payMore ? (
            <i className="fa-fw fa-sharp fa-solid fa-square-check" />
          ) : (
            <i className="fa-fw fa-sharp fa-light fa-square" />
          )}
          Allow listeners to pay more
        </span>
      </div>
      {/*<div className={styles.group}>
        <h5>Library Pricing</h5>
        <p>
          <i className="fa-fw fa-sharp fa-solid fa-circle-info" />
          Library pricing allows users to add your release into their library
          for a monthly rental price. A release in a user's library will bypass
          per stream pricing whem played.
        </p>
        <div></div>
        <span
          className={styles.select}
          style={{ marginTop: '0.5rem' }}
          onClick={() => setLibraryPricing(!hasLibraryPricing)}
        >
          {hasLibraryPricing ? (
            <i className="fa-fw fa-sharp fa-solid fa-square-check" />
          ) : (
            <i className="fa-fw fa-sharp fa-light fa-square" />
          )}
          Allow users to add this release to their library
        </span>
        <div>
          <input
            value={libraryPrice}
            onChange={(e) => setLibraryPrice(+e.target.value)}
          />
        </div>
          </div>*/}
    </div>
  )
}
