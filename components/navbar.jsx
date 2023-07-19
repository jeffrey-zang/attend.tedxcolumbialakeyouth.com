import Title from './title.jsx'
import Link from 'next/link'

export default function navbar() {
  return (
    <div className='flex flex-col md:flex-row items-center md:justify-between mt-20 mb-12'>
      <Link className='text-xl opacity-80' href='/'><Title /></Link>
      <p className='text-dimmed text-lg'>OCTOBER 7, 2023</p>
    </div>
  )
}
