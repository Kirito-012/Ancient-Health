import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { ScrollText } from 'lucide-react'

const renderContent = (text) => {
    // Split on **bold** markers and bare URLs
    const parts = text.split(/(\*\*.*?\*\*|https?:\/\/[^\s,\n]+)/g)
    return parts.map((part, i) => {
        if (/^\*\*(.*)\*\*$/.test(part)) {
            return <strong key={i} className='font-semibold text-[#1e4035]'>{part.slice(2, -2)}</strong>
        }
        if (/^https?:\/\//.test(part)) {
            return <a key={i} href={part} target='_blank' rel='noopener noreferrer' className='text-[#2d5f4f] hover:text-[#d4a574] underline underline-offset-2 transition-colors break-all'>{part}</a>
        }
        return part
    })
}

const sections = [
    {
        title: 'Introduction',
        content: `Welcome to Ancient Health. These terms and conditions outline the rules and regulations for the use of Ancient Health, located at https://www.ancienthealth.in/.

By accessing this website we assume you accept these terms and conditions. Do not continue to use Ancient Health if you do not agree to take all of the terms and conditions stated on this page.

The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person logged on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.`
    },
    {
        title: 'Consent',
        content: `We employ the use of cookies. By accessing Ancient Health, you agreed to use cookies in agreement with Ancient Health's Privacy Policy.

Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.`
    },
    {
        title: 'License',
        content: `Unless otherwise stated, Ancient Health and/or its licensors own the intellectual property rights for all material on Ancient Health. All intellectual property rights are reserved. You may access this from Ancient Health for your own personal use subjected to restrictions set in these terms and conditions.

You must not:
• Republish material from Ancient Health
• Sell, rent or sub-license material from Ancient Health
• Reproduce, duplicate or copy material from Ancient Health
• Redistribute content from Ancient Health

Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Ancient Health does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Ancient Health, its agents and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Ancient Health shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.

Ancient Health reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

You warrant and represent that:
• You are entitled to post the Comments on our website and have all necessary licenses and consents to do so
• The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party
• The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy
• The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity

You hereby grant Ancient Health a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.`
    },
    {
        title: 'Hyperlinking to our Content',
        content: `The following organizations may link to our Website without prior written approval:
• Government agencies
• Search engines
• News organizations
• Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses
• System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website

These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.

We may consider and approve other link requests from the following types of organizations:
• Commonly-known consumer and/or business information sources
• dot.com community sites
• Associations or other groups representing charities
• Online directory distributors
• Internet portals
• Accounting, law and consulting firms
• Educational institutions and trade associations

We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Ancient Health; and (d) the link is in the context of general resource information.

If you are one of the organizations listed above and are interested in linking to our website, you must inform us by sending an e-mail to Ancient Health. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2–3 weeks for a response.

Approved organizations may hyperlink to our Website as follows:
• By use of our corporate name
• By use of the uniform resource locator being linked to
• By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site

No use of Ancient Health's logo or other artwork will be allowed for linking absent a trademark license agreement.`
    },
    {
        title: 'iFrames',
        content: `Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.`
    },
    {
        title: 'Content Liability',
        content: `We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.`
    },
    {
        title: 'Reservation of Rights',
        content: `We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.`
    },
    {
        title: 'Removal of Links from our Website',
        content: `If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.

We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.`
    },
    {
        title: 'Disclaimer',
        content: `To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:

• Limit or exclude our or your liability for death or personal injury
• Limit or exclude our or your liability for fraud or fraudulent misrepresentation
• Limit any of our or your liabilities in any way that is not permitted under applicable law
• Exclude any of our or your liabilities that may not be excluded under applicable law

The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.

As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.`
    }
]

const TermsConditions = () => {
    return (
        <>
            <Helmet>
                <title>Terms & Conditions | Ancient Health</title>
                <meta name='description' content='Read the Ancient Health Terms and Conditions governing the use of our website and services.' />
            </Helmet>

            <Navbar />

            <main className='min-h-screen bg-[#faf8f5]'>
                {/* Hero */}
                <section className='relative bg-[#0f1c18] pt-32 pb-20 overflow-hidden'>
                    <div className='absolute inset-0 pointer-events-none opacity-[0.03] bg-[url("https://grainy-gradients.vercel.app/noise.svg")]' />
                    <div className='absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#2d5f4f]/10 rounded-full blur-[80px]' />
                    <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent' />

                    <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#d4a574]/10 border border-[#d4a574]/20 mb-6'>
                                <ScrollText className='w-6 h-6 text-[#d4a574]' />
                            </div>
                            <h1 className='font-serif text-4xl md:text-5xl text-white mb-4'>Terms & Conditions</h1>
                            <p className='text-white/50 text-sm'>Last updated: April 29, 2026</p>
                        </motion.div>
                    </div>
                </section>

                {/* Content */}
                <section className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                    <div className='space-y-5'>
                        {sections.map((section, i) => (
                            <div key={section.title}>
                                <h2 className='font-serif text-2xl text-[#1e4035] mb-4'>{section.title}</h2>
                                <div className='text-[#4a5568] leading-relaxed text-[15px] space-y-1'>
                                    {section.content.split('\n\n').map((para, j) => (
                                        <p key={j} className='whitespace-pre-line'>{renderContent(para)}</p>
                                    ))}
                                </div>
                                {i < sections.length - 1 && (
                                    <div className='mt-4 h-[1px] bg-gradient-to-r from-[#d4a574]/20 via-[#d4a574]/10 to-transparent' />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default TermsConditions
