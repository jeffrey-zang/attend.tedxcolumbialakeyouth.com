import { BiRightArrowAlt } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  return (
    <main>
      <div className='p-10 container cursor-not-allowed opacity-75 transition-opacity'>
        <div className='flex justify-between items-center md:flex-row flex-col'>
          <div>
            <p className='text-dimmed'>EXPIRED</p>
            <h1 className='text-2xl mt-2'>Attendee Form</h1>
            <p className='mt-6'>Register to be an attendee and contribute to our mission of reinventing education.</p>
          </div>
          <button className='flex items-center gap-1 text-lg cursor-not-allowed mt-4 md:mt-0 w-full md:w-auto'>
            I want to attend
            <BiRightArrowAlt />
          </button>
        </div>
      </div>

      <div className='p-10 container cursor-not-allowed opacity-75 transition-opacity mt-8'>
        <div className='flex justify-between items-center md:flex-row flex-col'>
          <div>
            <p className='text-dimmed'>EXPIRED</p>
            <h1 className='text-2xl mt-2'>Speaker Application</h1>
            <p className='mt-6'>Make a direct impact on the youth thinkers and innovators of the future.</p>
          </div>
          <button className='flex items-center gap-1 text-lg cursor-not-allowed mt-4 md:mt-0 w-full md:w-auto'>
            I want to speak
            <BiRightArrowAlt />
          </button>
        </div>
      </div>

      <div className='p-10 container cursor-not-allowed opacity-75 transition-opacity mt-8'>
        <div className='flex justify-between items-center md:flex-row flex-col'>
          <div>
            <p className='text-dimmed'>EXPIRED</p>
            <h1 className='text-2xl mt-2'>Performance Application</h1>
            <p className='mt-6'>Want to express your art through a performance at our event? This form is for you!</p>
          </div>
          <button className='flex items-center gap-1 text-lg cursor-not-allowed mt-4 md:mt-0 w-full md:w-auto'>
            I want to perform
            <BiRightArrowAlt />
          </button>
        </div>
      </div>
    </main>
  )
}
