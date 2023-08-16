import { useState, useRef } from 'react';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Attendee() {
  
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');

  const [student, setStudent] = useState(true);
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');

  const [appq1, setAppq1] = useState('');
  const [appq2, setAppq2] = useState('');
  const [aif, setAif] = useState('');

  const [alert, setAlert] = useState(<></>);

  const submitButton = useRef(null);
  const [submittext, setSubmittext] = useState('Submit Form');

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmittext('Working...')
    submitButton.current.style.backgroundColor = '#4b5563'

    if (!student) {
      setSchool('');
      setGrade('');
    }

    if (appq1.length > 600 || appq2.length > 800) {
      setAlert(<div className='text-rose-300 flex items-center gap-2'><AiOutlineWarning/> One or more of your responses exceeds the character limit. Please shorten your responses and try again.</div>);
      setSubmittext('Submit Form')
      submitButton.current.style.backgroundColor = '#c60e34'
      return
    }

    let form = {
      type: 'Attendee',
      fName,
      lName,
      student,
      email,
      school,
      grade,
      appq1,
      appq2,
      aif
    }

    const res = await fetch('/api/append', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const text = await res.text();

    if (!res.ok) {
      setAlert(<div className='text-rose-300 flex items-center gap-2'><AiOutlineWarning/> An error occurred while submitting your form. Please try again later or contact us at <a href='mailto:questions@tedxcolumbialakeyouth.com'>questions@tedxcolumbialakeyouth.com</a></div>);
      setSubmittext('Submit Form')
      submitButton.current.style.backgroundColor = '#c60e34'
      return;
    }
    
    if (text === 'Email already exists') {
      setAlert(<div className='text-rose-300 flex items-center gap-2'><AiOutlineWarning/> This email has already been used. If this was a mistake, contact us at <a href='mailto:questions@tedxcolumbialakeyouth.com'>questions@tedxcolumbialakeyouth.com</a></div>);
    } else {
      setAlert(
        <div className='text-green-300 flex items-center gap-2'>
          <AiOutlineCheckCircle/> Your registration has been submitted successfully! 
          <Link href='/' className='underline'>Return to the home page</Link> or 
          <button className='no-styles underline' onClick={() => {
            setFName('');
            setLName('');
            setEmail('');
            setStudent(true);
            setSchool('');
            setGrade('');
            setAppq1('');
            setAppq2('');
            setAif('');
            setAlert(<></>);
            submitButton.current.disabled = false;
            }}>clear this form.
          </button>
        </div>
      );
      submitButton.current.disabled = true;
      setSubmittext('Submit Form')
      submitButton.current.style.backgroundColor = '#c60e34'
      }
    }

  return (
    <div>
      <div className='container p-8'>
        <h1 className='text-2xl mt-2'>Attendee Registration</h1>
        <p className='mt-2 text-dimmed'>
          Register to be an attendee and contribute to our mission of reinventing education. This form is due on August 20, 2023, at 11:59 PM EST. Submissions after that point will not be considered. Please note that as a TED<sup>x</sup> Youth event, most attendees at TED<sup>x</sup>Columbia Lake Youth will be students and youth.
          <br/><br/>
          This form does not autosave, so we recommend that you write your responses in a separate document and copy them over when you are ready to submit.<br/>
          Looking for the <Link className='text-red' href='/register/speaker'>speaker application?</Link>
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className='container p-8 mt-6'>
          <h2 className='text-xl'>Basic Info</h2>

          <div className='input-container'>
            <label>First Name</label>
            <input value={fName} onChange={e => setFName(e.target.value)} type="text" placeholder="Unnamed" required />
          </div>

          <div className='input-container'>
            <label>Last Name</label>
            <input value={lName} onChange={e => setLName(e.target.value)} type="text" placeholder="Attendee" required />
          </div>

          <div className='input-container'>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="attendee@tedxcolumbialakeyouth.com" required />
          </div>
        </div>

        <div className='container p-8 mt-6'>
          <h2 className='text-xl'>Student Information</h2>

          <div>
            <input className='mr-4 accent-red mt-4' value={student} onChange={e => {setStudent(e.target.checked)}} type="checkbox" checked={student} />
            <label onClick={() => setStudent(!student)} className='cursor-pointer'>I am a student</label>
          </div>

          {(student) ? (
            <>
            <div className='input-container'>
              <label>School (don&apos;t abbreviate)</label>
              <input value={school} onChange={e => setSchool(e.target.value)} type="text" placeholder="TEDx Secondary School" required />
            </div>

            <div className='input-container'>
              <label>Grade (2023-24 school year)</label>
              <input value={grade} onChange={e => setGrade(e.target.value)} type="number" placeholder="12" max="12" required />
            </div>
            </>
          ) : null}
        </div>

        <div className='container p-8 mt-6'>
          <h2 className='text-xl'>Long-Answer Question</h2>

          {/* <div className='input-container flex-col !mt-8 !items-start'>
            <label className='!w-full'>With Artifical Intelligence quickly becoming a big part of our lives, many systems such as the workplace, healthcare, data storage, and law enforcement are changing. How do you think the education system should adapt or change? (max. 600 characters)</label>
            <textarea className='!w-full mt-2' value={appq1} onChange={e => setAppq1(e.target.value)} type="text" placeholder="I think that AI..." required />
            {(appq1.length > 600) && <p className='text-rose-300 opacity-80 mt-2'>Well darn... this response exceeds the limit of 600 characters.</p>}
          </div> */}

          <div className='input-container flex-col !mt-8 !items-start'>
            <label className='!w-full'>Describe one subject that you are passionate about. What drives this passion? How do you continue to ignite your passion and learn about this subject? (max. 800 characters ≈ 130-270 words)</label>
            <textarea className='!w-full mt-2' value={appq2} onChange={e => setAppq2(e.target.value)} type="text" placeholder="I'm passionate about..." required />
            {(appq2.length > 800) && <p className='text-rose-300 opacity-80 mt-2'>Oh no... this response exceeds the limit of 800 characters.</p>}
          </div>

          <div className='input-container flex-col !mt-8 !items-start'>
            <label className='!w-full'>How did you hear about TED<sup>x</sup>Columbia Lake Youth? (optional)</label>
            <input className='!w-full mt-2' value={aif} onChange={e => setAif(e.target.value)} type="text" placeholder="The many, many Instagram reposts" />
          </div>

          <div>
            <button type="submit" className='bg-[#c60e34] mt-10 mr-2' ref={submitButton}>{submittext}</button>
            <button onClick={() => router.push('/')} className='!bg-gray-600 hover:!bg-gray-700 mt-2 md:mt-0'>Return home</button>
          </div>

          {(Object.keys(alert.props).length !== 0) && (
            <div className='p-4 mt-4 bg-gray-600 rounded-md'>
              {alert}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
