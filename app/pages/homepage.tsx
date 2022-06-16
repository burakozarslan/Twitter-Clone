import { BlitzPage } from "blitz"
// Components
import Layout from "app/core/layouts/Layout"
import HomeFeed from "app/core/components/HomeFeed"

const HomePage: BlitzPage = () => {
  return <HomeFeed />
}

HomePage.authenticate = true
HomePage.getLayout = (page) => <Layout title="Home / Twitter">{page}</Layout>

export default HomePage
