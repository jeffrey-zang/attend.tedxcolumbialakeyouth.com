import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function Layout({ children }) {
  return (
    <>
      <div className='typography'>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  )
}