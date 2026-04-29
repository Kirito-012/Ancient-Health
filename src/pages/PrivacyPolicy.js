import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const renderContent = (text) => {
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
        content: `This Privacy Notice for Ancient Health ('we', 'us', or 'our') describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:

• Visit our website at https://www.ancienthealth.in/ or any website of ours that links to this Privacy Notice
• Engage with us in other related ways, including any marketing or events

Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at theancienthealth7@gmail.com.`
    },
    {
        title: 'Summary of Key Points',
        content: `**What personal information do we process?** When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.

**Do we process any sensitive personal information?** We do not process sensitive personal information.

**Do we collect any information from third parties?** We do not collect any information from third parties.

**How do we process your information?** We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.

**In what situations and with which parties do we share personal information?** We may share information in specific situations and with specific third parties.

**How do we keep your information safe?** We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.

**What are your rights?** Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.

**How do you exercise your rights?** The easiest way to exercise your rights is by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.`
    },
    {
        title: '1. What Information Do We Collect?',
        content: `**Personal information you disclose to us**

We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.

The personal information we collect may include the following:
• Names
• Phone numbers
• Email addresses
• Billing addresses

**Sensitive Information.** We do not process sensitive information.

**Payment Data.** We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number and the security code associated with your payment instrument. All payment data is handled and stored by our payment processors.

All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.

**Google API:** Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.`
    },
    {
        title: '2. How Do We Process Your Information?',
        content: `We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.

We process your personal information for a variety of reasons, depending on how you interact with our Services, including:

• **To facilitate account creation and authentication and otherwise manage user accounts.** We may process your information so you can create and log in to your account, as well as keep your account in working order.`
    },
    {
        title: '3. When And With Whom Do We Share Your Personal Information?',
        content: `We may share information in specific situations described in this section and/or with the following third parties.

We may need to share your personal information in the following situations:

**Business Transfers.** We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.`
    },
    {
        title: '4. Do We Use Cookies And Other Tracking Technologies?',
        content: `We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.

We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences).

**Google Analytics:** We may share your information with Google Analytics to track and analyse the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout.`
    },
    {
        title: '5. How Long Do We Keep Your Information?',
        content: `We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.

We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.

When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or securely store your personal information and isolate it from any further processing until deletion is possible.`
    },
    {
        title: '6. How Do We Keep Your Information Safe?',
        content: `We aim to protect your personal information through a system of organisational and technical security measures.

We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.

Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.`
    },
    {
        title: '7. Do We Collect Information From Minors?',
        content: `We do not knowingly collect data from or market to children under 18 years of age.

We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services.

If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at theancienthealth7@gmail.com.`
    },
    {
        title: '8. What Are Your Privacy Rights?',
        content: `You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.

**Withdrawing your consent:** If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time by contacting us using the contact details provided in this notice. Please note that this will not affect the lawfulness of the processing before its withdrawal.

**Account Information:** If you would at any time like to review or change the information in your account or terminate your account, you can log in to your account settings and update your user account. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, or enforce our legal terms.

**Cookies and similar technologies:** Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject cookies, though this could affect certain features or services of our Services.

If you have questions or comments about your privacy rights, you may email us at theancienthealth7@gmail.com.`
    },
    {
        title: '9. Controls For Do-Not-Track Features',
        content: `Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.

At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.`
    },
    {
        title: '10. Do We Make Updates To This Notice?',
        content: `Yes, we will update this notice as necessary to stay compliant with relevant laws.

We may update this Privacy Notice from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.`
    },
    {
        title: '11. How Can You Contact Us About This Notice?',
        content: `If you have questions or comments about this notice, you may contact us by post at:

Ancient Health
K NO 43/1, Near Inter College, Village Khedli, Bahadrabad
Haridwar, Uttarakhand - 249402
India

Or by email at: theancienthealth7@gmail.com`
    },
    {
        title: '12. How Can You Review, Update, Or Delete The Data We Collect From You?',
        content: `Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.

To request to review, update, or delete your personal information, please contact us at theancienthealth7@gmail.com.`
    }
]

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | Ancient Health</title>
                <meta name='description' content='Read the Ancient Health Privacy Policy to understand how we collect, use, and protect your personal information.' />
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
                                <Shield className='w-6 h-6 text-[#d4a574]' />
                            </div>
                            <h1 className='font-serif text-4xl md:text-5xl text-white mb-4'>Privacy Policy</h1>
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

export default PrivacyPolicy
