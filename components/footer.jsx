export default function Footer() {
  return (
    <div className='flex flex-col md:flex-row justify-between text-dimmed mt-8 border-t-2 border-t-gray-600 pt-4 mb-16'>
      <p>Copyright © 2023</p>
      <div className='text-dimmed flex gap-4'>
        <a href='https://www.tedxcolumbialakeyouth.com' target='_blank' rel='noreferrer'>Main Website</a>
        <a href='https://www.instagram.com/tedxcolumbialakeyouth/' target='_blank' rel='noreferrer'>Instagram</a>
        <a href='mailto:questions@tedxcolumbialakeyouth.com'>Contact</a>
      </div>
    </div>
  )
}
