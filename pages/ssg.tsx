import { GetStaticProps } from 'next'
import Page from '../components/Page'

const SSGPage = () => {
  return <Page title="Index Page" linkTo="/other" />
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { initialState: { lastUpdate: Date.now() } } }
}

export default SSGPage
