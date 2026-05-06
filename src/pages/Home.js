'use client'

import React, { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import JsonLd from '../components/JsonLd'
import { buildOrganizationSchema, buildWebSiteSchema } from '../utils/schemaUtils'
import HeroSection from '../components/HeroSection'
import SocialProofBar from '../components/SocialProofBar'

const PuritySection = lazy(() => import('../components/PuritySection'))
const WellnessRetreat = lazy(() => import('../components/WellnessRetreat'))
const FeaturedProducts = lazy(() => import('../components/FeaturedProducts'))
const ReviewsSection = lazy(() => import('../components/ReviewsSection'))
const BlogSection = lazy(() => import('../components/BlogSection'))
const CTASection = lazy(() => import('../components/CTASection'))
const Footer = lazy(() => import('../components/Footer'))

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
			<JsonLd schema={[buildOrganizationSchema(), buildWebSiteSchema()]} />
			<Navbar />
			<HeroSection />
			<SocialProofBar />
			<Suspense fallback={<div className="min-h-[200px]" />}>
				<FeaturedProducts />
				<PuritySection />
				<ReviewsSection />
				<BlogSection />
				{/* <WellnessRetreat /> */}
				<CTASection />
				<Footer />
			</Suspense>
		</div>
	)
}

export default Home

