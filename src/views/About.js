'use client'

import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHero from '../components/AboutHero'
import PhilosophySection from '../components/PhilosophySection'
import StoryJourney from '../components/StoryJourney'
import ValuesSection from '../components/ValuesSection'
import CTASection from '../components/CTASection'

const About = () => {
    return (
        <div className='min-h-screen bg-[#0f1c18]'>
            <Helmet>
                <title>Our Story | Ancient Health</title>
                <meta name="description" content="Learn about Ancient Health's mission to bridge ancient Ayurvedic traditions with modern wellness through pure, ethically sourced Himalayan botanicals." />
                <meta name="keywords" content="about Ancient Health, Himalayan botanicals, Ayurveda mission, ethical sourcing, ancient remedies story" />
                <meta name="author" content="Ancient Health" />
                <meta name="publisher" content="Ancient Health" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.ancienthealth.in/about/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Our Story | Ancient Health" />
                <meta property="og:description" content="Learn about Ancient Health's mission to bridge ancient Ayurvedic traditions with modern wellness through pure, ethically sourced Himalayan botanicals." />
                <meta property="og:image" content="https://www.ancienthealth.in/og-image.jpeg" />
                <meta property="og:url" content="https://www.ancienthealth.in/about/" />
                <meta property="og:site_name" content="Ancient Health" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Story | Ancient Health" />
                <meta name="twitter:description" content="Learn about Ancient Health's mission to bridge ancient Ayurvedic traditions with modern wellness through pure, ethically sourced Himalayan botanicals." />
                <meta name="twitter:image" content="https://www.ancienthealth.in/og-image.jpeg" />
            </Helmet>
            <Navbar />
            <AboutHero />
            <PhilosophySection />
            <StoryJourney />
            <ValuesSection />
            <CTASection />
            <Footer />
        </div>
    )
}

export default About
