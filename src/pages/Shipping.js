import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'

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
        title: 'Our Commitment to You',
        content: `Ancient Health has partnered with reputed logistics partners to ensure that all our products reach you in the best of conditions with no damages. We use packaging materials of the best quality, sourced from reliable vendors, and ensure thorough testing of package worthiness before using them for shipping and delivery of our products.

**Note:** Shipping is free on all orders above ₹499. A flat shipping charge of ₹99 applies to orders below ₹499.`
    },
    {
        title: 'How Does the Delivery Process Work?',
        content: `Once our system has processed your order, your products are thoroughly inspected to ensure they are in perfect condition. After passing our final round of quality check, we pack and hand over your products to our trusted logistics partner.

Our logistics partner will then deliver the products to you at the earliest possibility. In case our logistics partner is unable to reach you at the shipping address or at a suitable time, they shall contact you to resolve the same.

Please note that all products ordered by you will be shipped to the shipping address provided at the time of placing your order, along with an invoice. While we strive to ship all products in your order together, this may not always be possible.`
    },
    {
        title: 'How Are the Products Packaged?',
        content: `Each individual product is carefully packaged to ensure it reaches you safely. Fragile products such as glass bottles are secured with an additional layer of protective material. We then package our products in sturdy cardboard boxes before handing them over to our logistics partners.

Ancient Health holds responsibility for any damages caused to the product while in transit to you.`
    },
    {
        title: 'Where Do We Ship?',
        content: `Ancient Health ships throughout India to almost all pin codes. The list of pin code serviceability may change from time to time depending on our logistics partners.

You can check if we deliver to your location by entering your pin code on any product page or by entering your shipping details on the checkout page.`
    },
    {
        title: 'How Long Will It Take for My Order to Reach Me?',
        content: `We aspire to dispatch your order within 24 hours of it being placed. Delivery typically takes **7–10 business days** depending on your location within India.

Please note that Ancient Health will try its best to ensure you receive your order as soon as possible, but we are not liable for any delay in delivery caused by our logistics partner due to unforeseen circumstances.

**Note:** We reserve our right to pause deliveries at any time if warranted by extraordinary circumstances. We request you to bear with us in the case of slight delays.`
    },
    {
        title: 'Can I Track My Order?',
        content: `Once your order has been dispatched from our warehouse, you will receive a confirmation email at the address provided at the time of placing your order. This email will contain the tracking number and the name of the courier company processing your order.

If you are a registered user, you can also track your order by logging into the "My Account" section and clicking on the "My Orders" tab to view your order details.`
    },
    {
        title: 'What Time of Day Will My Order Be Delivered?',
        content: `Our logistics partner will call you before attempting delivery at your shipping address. Please make sure you are available to receive calls — after 3 (three) failed delivery attempts, the product will be returned to our warehouse.`
    },
    {
        title: 'Shipping Charges',
        content: `• Orders above ₹499 — **Free Shipping**
• Orders below ₹499 — Flat ₹99 shipping charge

The applicable shipping charge will be shown at the time of checkout before you make payment. Ancient Health does not levy any additional or hidden shipping charges beyond the amount shown at the time of placing your order.`
    },
    {
        title: 'Delivery Information',
        content: `If no one is available at your address when delivery is attempted, our logistics partner will make 2 (two) more delivery attempts subsequently. You can contact us to reschedule the delivery date and we shall try to accommodate your request to the best of our abilities.

If all 3 delivery attempts are unsuccessful, our logistics partner will return your package to us.`
    },
    {
        title: 'Returns & Refunds',
        content: `We have a **10-day return policy** from the date of delivery.

We accept returns only in the case of **damaged or defective products**. If you have received a product that is damaged or defective, please contact us within 10 days of delivery at theancienthealth7@gmail.com with your order details and photographs of the damaged/defective product.

Once we review and approve your return request, we will arrange a pickup and process your refund or replacement accordingly. Products that are not damaged or defective are not eligible for return or refund.`
    },
    {
        title: 'Changes to This Policy',
        content: `We keep our Shipping & Returns Policy under review to make sure it is up to date and accurate. Any changes we make to this policy in the future will be posted on this page. We reserve the right to change or update this policy at any time without prior intimation. Such changes shall be effective immediately upon posting on our website.`
    },
    {
        title: 'Contact Us',
        content: `In the rare case that you are not satisfied with the quality of the product delivered to you or with your delivery experience, we welcome you to reach out to us at theancienthealth7@gmail.com so we can look into the issue and address it on a case-by-case basis.`
    }
]

const Shipping = () => {
    return (
        <>
            <Helmet>
                <title>Shipping & Returns | Ancient Health</title>
                <meta name='description' content='Learn about Ancient Health shipping policy, delivery timelines, and returns process for damaged or defective products.' />
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
                                <Truck className='w-6 h-6 text-[#d4a574]' />
                            </div>
                            <h1 className='font-serif text-4xl md:text-5xl text-white mb-4'>Shipping & Returns</h1>
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

export default Shipping
