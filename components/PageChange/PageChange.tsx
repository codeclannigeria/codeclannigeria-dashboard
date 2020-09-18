import { ReactNode } from 'react'
// reactstrap components
import { Spinner } from 'reactstrap'

// core components

const PageChange = (props: { path: ReactNode }) => {
  return (
    <div>
      <div className="page-transition-wrapper-div">
        <div className="page-transition-icon-wrapper mb-3">
          <Spinner
            color="white"
            style={{ width: '6rem', height: '6rem', borderWidth: '.3rem' }}
          />
        </div>
        <h4 className="title text-white">
          Loading page contents for: {props.path}
        </h4>
      </div>
    </div>
  )
}
export default PageChange
