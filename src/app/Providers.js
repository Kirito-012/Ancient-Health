'use client'

import { CartProvider } from '../context/CartContext'
import { HelmetProvider } from 'react-helmet-async'
import { ReactLenis } from 'lenis/react'
import { ToastContainer } from 'react-toastify'
import GlobalLoader from '../components/GlobalLoader'
import ChatBot from '../components/ChatBot'
import ScrollToTop from '../components/ScrollToTop'
import { CheckCircle2, AlertCircle, XCircle, Info, X } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

export default function Providers({ children }) {
  return (
    <HelmetProvider>
      <ReactLenis root>
        <GlobalLoader />
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          icon={({ type }) => {
            switch (type) {
              case 'success': return <CheckCircle2 className="w-5 h-5 text-[#d4a574]" />
              case 'error': return <XCircle className="w-5 h-5 text-red-400" />
              case 'warning': return <AlertCircle className="w-5 h-5 text-amber-400" />
              default: return <Info className="w-5 h-5 text-[#d4a574]" />
            }
          }}
          closeButton={({ closeToast }) => (
            <button onClick={closeToast} className="p-1 opacity-50 hover:opacity-100 transition-opacity">
              <X className="w-4 h-4 text-white/60" />
            </button>
          )}
          toastClassName={() =>
            'relative flex items-center justify-between p-4 min-w-[320px] rounded-lg overflow-hidden cursor-pointer bg-[#0f1c18] border border-[#d4a574]/20 shadow-2xl mb-4 mr-4 group hover:border-[#d4a574]/40 transition-all duration-300'
          }
          bodyClassName={() =>
            'text-sm font-sans font-medium text-[#e8e6e3] flex-1 flex items-center gap-3 px-2'
          }
          progressClassName="!bg-[#d4a574]"
        />
        <CartProvider>
          <ScrollToTop />
          <ChatBot />
          {children}
        </CartProvider>
      </ReactLenis>
    </HelmetProvider>
  )
}
