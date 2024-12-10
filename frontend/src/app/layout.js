import { Inter } from 'next/font/google'
import './globals.css'
import LogoBar from './components/LogoBar'
import Footer from './components/Footer'
import StoreProvider from './StoreProvider'
import "./components/component-styles.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Youtube Downloader',
  description: 'Download anything',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <StoreProvider>
      <LogoBar/>
        {children}
      <Footer/>
      </StoreProvider>
      </body>
    </html>
  )
}
