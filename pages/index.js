
import FooterBanner from "../components/FooterBanner";
import {client} from '../lib/client'
import HeroBanner from "../components/HeroBanner";
import ProductList from "../components/ProductList";

const Home = ({products, bannerData}) => (
    <div>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
        <div className='products-heading'>
            <h2>
                Best Selling Products
            </h2>
            <p>Speakers of many variations</p>
        </div>

        <ProductList products={products}/>

        <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
        props: { products, bannerData }
    }
}
export default Home;


