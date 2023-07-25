import Link from 'next/link'

export default function Custom404() {
  return (
    <div className='flex flex-col items-center gap-4 my-16'>
      <h1 className='text-6xl'>404</h1>
      <p>Page not found</p>
      <Link href='/' className='text-red'>Go home</Link>
    </div>
  )
}