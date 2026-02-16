import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHero from '../components/AboutHero'
import StoryJourney from '../components/StoryJourney'
import ValuesSection from '../components/ValuesSection'
import CTASection from '../components/CTASection'

const About = () => {
    return (
        <div className='min-h-screen bg-white'>
            <Navbar />
            <AboutHero />
            <StoryJourney />
            <ValuesSection />
            <CTASection />
            <Footer />
        </div>
    )
}

export default About
