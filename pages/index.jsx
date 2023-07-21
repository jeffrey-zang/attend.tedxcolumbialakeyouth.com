import { BiRightArrowAlt } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  return (
    <main>
      <div onClick={() => router.push('/register/attendee')} className='p-10 container cursor-pointer opacity-100 hover:opacity-75 transition-opacity'>
        <div className='flex justify-between items-center md:flex-row flex-col'>
          <div>
            <p className='text-dimmed'>DUE AUG 12</p>
            <h1 className='text-2xl mt-2'>Attendee Form</h1>
            <p className='mt-6'>Register to be an attendee and contribute to our mission of reinventing education.</p>
          </div>
          <button onClick={() => router.push('/register/attendee')} className='flex items-center gap-1 text-lg hover:gap-3 mt-4 md:mt-0 w-full md:w-auto'>
            I want to attend
            <BiRightArrowAlt />
          </button>
        </div>
      </div>

      <div onClick={() => router.push('/register/speaker')} className='p-10 container cursor-pointer opacity-100 hover:opacity-75 transition-opacity mt-8'>
        <div className='flex justify-between items-center md:flex-row flex-col'>
          <div>
            <p className='text-dimmed'>DUE AUG 12</p>
            <h1 className='text-2xl mt-2'>Speaker Application</h1>
            <p className='mt-6'>Make a direct impact on the youth thinkers and innovators of the future.</p>
          </div>
          <button onClick={() => router.push('/register/speaker')} className='flex items-center gap-1 text-lg hover:gap-3 mt-4 md:mt-0 w-full md:w-auto'>
            I want to speak
            <BiRightArrowAlt />
          </button>
        </div>
      </div>
    </main>
  )
}
