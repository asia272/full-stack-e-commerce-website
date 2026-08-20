import Hero from '@/components/Hero'
import PolicyFeatures from '@/components/PolicyFeatures'
import AllProducts from '@/components/product/AllProducts'
import Subscription from '@/components/Subscription'
import React from 'react'

const page = () => {
    return (
        <>
            <Hero />
            <PolicyFeatures />
            <Subscription />
            <section
                className="
                    mx-auto
                    w-full
                    max-w-[1800px]
                    px-[24px]
                    pb-[100px]
                    pt-[70px]
                    md:px-[40px]
                    lg:px-[60px]
                    xl:px-[72px]
                "
            >
                <AllProducts />
            </section>
        </>
    )
}

export default page