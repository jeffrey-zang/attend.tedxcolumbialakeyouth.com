import { useState, useRef } from 'react';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';
import Title from '../../components/title';
import { useRouter } from 'next/router'

export default function Performance() {
  
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [school, setSchool] = useState('');
  const [socials, setSocials] = useState('');

  const [title, setTitle] = useState('');
  const [idea, setIdea] = useState('');
  const [video, setVideo] = useState('');

  const [aif, setAif] = useState('');

  const [alert, setAlert] = useState(<></>);

  const router = useRouter()

  const submitButton = useRef(null);
  const [submittext, setSubmittext] = useState('Submit Application');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmittext('Working...')
    submitButton.current.style.backgroundColor = '#4b5563'

    if (idea.length > 600) {
      setAlert(<div className='text-rose-300 flex items-center gap-2'><AiOutlineWarning/> One or more of your responses exceeds the character limit. Please shorten your responses and try again.</div>);
      setSubmittext('Submit Application')
      submitButton.current.style.backgroundColor = '#c60e34'
      return
    }

    let form = {
      type: 'Performance',
      fName,
      lName,
      email,
      dob,
      school,
      socials,
      title,
      idea,
      video,
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

    if (!res.ok) {
      setAlert(<div className='text-rose-300 flex items-center gap-2'><AiOutlineWarning/> An error occurred while submitting your application. Please try again later.</div>);
      setSubmittext('Submit Application')
      submitButton.current.style.backgroundColor = '#c60e34'
      return
    }
    
    const text = await res.text();
    if (text === 'Email already exists') {
      setAlert(<div className='text-rose-300 flex items-center gap-2'><AiOutlineWarning/> This email has already been used. If this was a mistake, contact us at <a href='mailto:questions@tedxcolumbialakeyouth.com'>questions@tedxcolumbialakeyouth.com</a></div>);
    } else {
      setAlert(<div className='text-green-300 flex items-center gap-2'><AiOutlineCheckCircle/> Your application has been submitted successfully! <Link href='/' className='underline'>Return to the home page</Link> or <button className='no-styles underline' onClick={() => {
        setFName('');
        setLName('');
        setEmail('');
        setDob('');
        setSchool('');
        setSocials('');
        setTitle('');
        setIdea('');
        setVideo('');
        setAif('');
        setAlert(<></>);
        submitButton.current.disabled = false;
      }}>clear this form.</button></div>);
      submitButton.current.disabled = true;
    }
    setSubmittext('Submit Application')
    submitButton.current.style.backgroundColor = '#c60e34'
  }

  return (
    <div>
      <div className='container p-8'>
        <h1 className='text-2xl mt-2'>Performer Application</h1>
        <p className='mt-2 text-dimmed'>
          Interested in Performing at <Title />? 
          Here&apos;s what you need to know.
          <br/><br/>

          <strong className='text-xl'>Details</strong><br/>
          TEDxColumbia Lake Youth will be taking place on October 14th, 2023 in Waterloo, Ontario. There will be 5 adult speakers and 10 youth speakers. After recieving the submissions from this form, our team will select 10 applicants to be youth speakers at TED<sup>x</sup>Columbia Lake Youth. <strong>Performers and speakers will be separate and will be selected using separate criterias. A speaker cannot double-apply as a performer.</strong>
          <br/><br/>

          <strong className='text-xl'>Requirements for a TED performance</strong><br/>
          For your performance to be considered “worth spreading”, it should be:
          <ul className='list-disc pl-4'>
            <li>Proficiently performed</li>
            <li>Interesting and engaging</li>
          </ul>
          <br/><br/>

          <strong className='text-xl'>General Performance Guidelines</strong><br/>
          <ul className='list-disc pl-4'>
            <li>Performance should be 8-18 minutes in duration (we recommend no more than 15 minutes)</li>
            <li>No religious, corporate or political endorsements</li>
            <li>Performers are required to follow the timelines given below, attend rehearsals, and be present for the duration of the event</li>
          </ul>
          <br/><br/>

          <strong className='text-xl'>Timeline</strong><br/>
          September 14, 2023 - Application to be a performer for TED<sup>x</sup>Columbia Lake Youth due<br/><br/>
          <strong>If accepted</strong><br/>
          September 23, 2023 - First draft of performance due<br/>
          September 25, 2023 - Final draft of performance to be submitted <br/>
          September 30, 2023 - Practice rehearsal <br/>
          October 14, 2023 - Present at TED<sup>x</sup>Columbia Lake Youth <br/>
          <br/><br/>

          This form does not autosave, so we recommend that you write your responses in a separate document and copy them over when you are ready to submit.<br/>
          Looking for the <Link className='text-red' href='/register/attendee'>attendee registration?</Link>
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
            <input value={lName} onChange={e => setLName(e.target.value)} type="text" placeholder="Performer" required />
          </div>

          <div className='input-container'>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="performer@tedxcolumbialakeyouth.com" required />
          </div>

          <div className='input-container'>
            <label>Date of Birth</label>
            <input value={dob} onChange={e => setDob(e.target.value)} type="date" required />
          </div>
        
          <div className='input-container'>
            <label>Current school/company/affiliation</label>
            <input value={school} onChange={e => setSchool(e.target.value)} type="text" placeholder="TEDx" required />
          </div>

          <div className='input-container'>
            <label>Socials (Instagram, LinkedIn, etc)</label>
            <input value={socials} onChange={e => setSocials(e.target.value)} type="text" placeholder="https://www.linkedin.com/in/your-name/" required />
          </div>
        </div>
        
        <div className='container p-8 mt-6'>
          <h2 className='text-xl'>Your Performance</h2>

          <div className='input-container'>
            <label>What is the title of your performance?</label>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="My performance is titled..." required />
          </div>

          <div className='input-container flex !items-start flex-col !mt-8'>
            <label className='!w-full'>Give a brief outline/summary of your performance, the meaning behind it, and your experience with practicing your art. (max. 600 characters ≈ 85-150 words)</label>
            <textarea className='!w-full mt-2' value={idea} onChange={e => setIdea(e.target.value)} type="text" placeholder="My performance will be about..." required />
            {(idea.length > 600) && <p className='text-rose-300 opacity-80 mt-2'>Whoops... this response exceeds the limit of 600 characters.</p>}
          </div>

        </div>

        <div className='container p-8 mt-6'>
          <h2 className='text-xl'>Video Submission</h2>

          <div className='input-container flex-col !items-start'>
            <label className='!w-full'>Record a video (1-3 minutes) presenting a short clip of your performance so that we can see your style and personality. Your video submission will only be viewed by the TED<sup>x</sup>Columbia Lake Youth organizational team, and will not be uploaded to any social media sites. <strong>Please submit a shared google drive link to your video.</strong></label>
            <input className='!w-full' value={video} onChange={e => setVideo(e.target.value)} type="url" placeholder="https://drive.google.com/file/d/19LT8yJ4VlOjzEwNms5EB0i-cmpsruxoD/view?usp=sharing" required />
          </div>

          <div className='input-container flex-col !mt-8 !items-start'>
            <label className='!w-full'>How did you hear about TED<sup>x</sup>Columbia Lake Youth? (optional)</label>
            <input className='!w-full mt-2' value={aif} onChange={e => setAif(e.target.value)} type="text" placeholder="The cool and incredibly well made website" />
          </div>

          <div>
            <button type="submit" className='bg-[#c60e34] mt-10 mr-2' ref={submitButton}>{submittext}</button>
            <button onClick={() => router.push('/')} className='!bg-gray-600 hover:!bg-gray-700 mt-2 md:mt-0'>Return Home</button>
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
