import { GetServerSideProps } from 'next'
import Page from '../components/Page'

const SSRPage = () => {
  return (
    <>
      <Page title="Index Page" linkTo="/other" />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { initialState: { lastUpdate: Date.now() } } }
}

export default SSRPage
