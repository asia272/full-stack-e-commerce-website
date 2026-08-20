import Hero from '@/components/Hero'
import PolicyFeatures from '@/components/PolicyFeatures'

import BestSeller from '@/components/product/BestSeller'
import LatestProducts from '@/components/product/LatestProducts'
import Subscription from '@/components/Subscription'


const page = () => {
    return (
        <>
            <Hero />
            <div className="mx-auto max-w-[1600px] px-[24px] mt-[110px]">
                <LatestProducts />

                <div className="mt-[110px]">
                    <BestSeller />
                </div>
            </div>
            <PolicyFeatures />
            <Subscription />

        </>
    )
}

export default page