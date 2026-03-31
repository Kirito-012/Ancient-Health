import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import PuritySection from '../components/PuritySection'
import WellnessRetreat from '../components/WellnessRetreat'
import FeaturedProducts from '../components/FeaturedProducts'
import StorySection from '../components/StorySection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

const Home = () => {
	return (
		<div className='min-h-screen bg-white'>
			<Helmet>
				<title>Ancient Health | Pure Himalayan Botanicals & Ayurvedic Remedies</title>
				<meta name="description" content="Discover pure, hand-harvested botanicals from the heart of the Himalayas. Ancient Health brings you ethically sourced Ayurvedic remedies for modern wellness." />
				<meta name="keywords" content="Ayurvedic remedies, Himalayan botanicals, natural health, herbal medicine, holistic wellness, ancient health" />
				<meta name="author" content="Ancient Health" />
				<meta name="publisher" content="Ancient Health" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://www.ancienthealth.in/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Ancient Health | Pure Himalayan Botanicals & Ayurvedic Remedies" />
				<meta property="og:description" content="Discover pure, hand-harvested botanicals from the heart of the Himalayas. Ancient Health brings you ethically sourced Ayurvedic remedies for modern wellness." />
				<meta property="og:image" content="https://www.ancienthealth.in/og-image.jpeg" />
				<meta property="og:url" content="https://www.ancienthealth.in/" />
				<meta property="og:site_name" content="Ancient Health" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Ancient Health | Pure Himalayan Botanicals & Ayurvedic Remedies" />
				<meta name="twitter:description" content="Discover pure, hand-harvested botanicals from the heart of the Himalayas. Ancient Health brings you ethically sourced Ayurvedic remedies for modern wellness." />
				<meta name="twitter:image" content="https://www.ancienthealth.in/og-image.jpeg" />
			</Helmet>
			<Navbar />
			<HeroSection />
			<PuritySection />
			<FeaturedProducts />
			<StorySection />
			<WellnessRetreat />
			<CTASection />
			<Footer />
		</div>
	)
}

export default Home

