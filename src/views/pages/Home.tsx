import React from 'react'

//Component imports
import HomeBanner from '../components/home/HomeBanner'
import EventsBanner from '../components/home/EventsBanner'
import HomeValues from '../components/home/HomeValues'
import AppFooter from "../layout/AppFooter";


const Home = () => {
    return (
        <>
            <HomeBanner/>
            <HomeValues/>
            <EventsBanner/>
            <AppFooter/>
        </>
    )
}

export default Home
