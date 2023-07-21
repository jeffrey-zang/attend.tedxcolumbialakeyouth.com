import { useState, useRef } from 'react';
import { AiOutlineWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';
import Title from '../../components/title';
import { useRouter } from 'next/router'

export default function Speaker() {
  
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [school, setSchool] = useState('');
  const [socials, setSocials] = useState('');

  const [idea, setIdea] = useState('');
  const [outline, setOutline] = useState('');
  const [exp, setExp] = useState('');
  const [why, setWhy] = useState('');
  const [accomplishments, setAccomplishments] = useState('');
  const [video, setVideo] = useState('');
  const [doc, setDoc] = useState('');
  const [interest, setInterest] = useState('');

  const [aif, setAif] = useState('');

  const [alert, setAlert] = useState(<></>);

  const router = useRouter()

  const submitButton = useRef(null);
  const [submittext, setSubmittext] = useState('Submit Application');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmittext('Working...')
    submitButton.current.style.backgroundColor = '#4b5563'

    if (outline.length > 600 || why.length > 800 || accomplishments > 1200) {
      setAlert(<div className='text-rose-300 flex items-center gap-2'><AiOutlineWarning/> One or more of your responses exceeds the character limit. Please shorten your responses and try again.</div>);
      setSubmittext('Submit Application')
      submitButton.current.style.backgroundColor = '#c60e34'
      return
    }

    let form = {
      type: 'Speaker',
      fName,
      lName,
      email,
      dob,
      school,
      socials,
      idea,
      outline,
      exp,
      why,
      accomplishments,
      interest,
      video,
      doc,
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
        setIdea('');
        setOutline('');
        setExp('');
        setWhy('');
        setAccomplishments('');
        setVideo('');
        setDoc('');
        setInterest('');
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
        <h1 className='text-2xl mt-2'>Speaker Application</h1>
        <p className='mt-2 text-dimmed'>
          Interested in Speaking at <Title />? 
          Here&apos;s what you need to know.
          <br/><br/>

          <strong className='text-xl'>Details</strong><br/>
          TEDxColumbia Lake Youth will be taking place on October 7th, 2023 in Waterloo, Ontario. There will be 4 adult speakers and 8 youth speakers. After recieving the submissions from this form, our team will select 8 applicants to be youth speakers at TED<sup>x</sup>Columbia Lake Youth.
          <br/><br/>

          <strong className='text-xl'>Requirements for a TED talk</strong><br/>
          For your idea to be considered “worth spreading”, it should be:
          <ul className='list-disc pl-4'>
            <li>New and unique</li>
            <li>Interesting and engaging</li>
            <li>Factual, realistic, and evidence-based</li>
            <li>Inspirational and informative</li>
          </ul>
          <br/><br/>

          <strong className='text-xl'>General Speaker Guidelines</strong><br/>
          <ul className='list-disc pl-4'>
            <li>Speech should be 8-18 minutes in duration (we recommend no more than 15 minutes)</li>
            <li>Visuals (slides are optional, however, are recommended) </li>
            <li>Include evidence-based data and research</li>
            <li>Strongly recommended that speeches be memorized, however, speaker notes are allowed if absolutely necessary</li>
            <li>No religious, corporate or political endorsements</li>
            <li>Speakers are required to follow the timelines given below, attend rehearsals, and be present for the duration of the event</li>
          </ul>
          <br/><br/>

          <strong className='text-xl'>Timeline</strong><br/>
          August 12, 2023 - Application to be a speaker for TED<sup>x</sup>Columbia Lake Youth due<br/><br/>
          <strong>If accepted</strong><br/>
          August 17, 2023 - First draft of speech due<br/>
          August 31, 2023 - Final draft of speech to be submitted <br/>
          September 23, 2023 - Practice rehearsal <br/>
          October 7, 2023 - Present at TED<sup>x</sup>Columbia Lake Youth <br/>
          <br/><br/>

          <p>Be sure to review the <a className='text-red' href='https://storage.ted.com/tedx/manuals/tedx_speaker_guide.pdf' target='_blank' rel='noreferrer'>TED<sup>x</sup> guidelines.</a></p><br/>
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
            <input value={lName} onChange={e => setLName(e.target.value)} type="text" placeholder="Speaker" required />
          </div>

          <div className='input-container'>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="speaker@tedxcolumbialakeyouth.com" required />
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
          <h2 className='text-xl'>Your Talk</h2>

          <div className='input-container'>
            <label>What is the title of your talk?</label>
            <input value={idea} onChange={e => setIdea(e.target.value)} type="text" placeholder="My talk is titled..." required />
          </div>

          <div className='input-container flex !items-start flex-col !mt-8'>
            <label className='!w-full'>Give a brief outline/summary of your talk and its connection to the event theme of &quot;Reinventing Education&quot;. (600c)</label>
            <textarea className='!w-full mt-2' value={outline} onChange={e => setOutline(e.target.value)} type="text" placeholder="My talk will be about..." required />
            {(outline.length > 600) && <p className='text-rose-300 opacity-80 mt-2'>Whoops... this response exceeds the limit of 600 characters.</p>}
          </div>

          <div className='input-container !items-start flex-col !mt-8'>
            <label className='!w-full'>What prior public speaking experiences do you have, if any?</label>
            <textarea className='!w-full mt-2' value={exp} onChange={e => setExp(e.target.value)} type="text" placeholder="I have previously spoken at..." required />
          </div>

          <div className='input-container !items-start flex-col !mt-8'>
            <label className='!w-full'>What is unique about your idea and why is it worth spreading? (max. 800 characters)</label>
            <textarea className='!w-full mt-2' value={why} onChange={e => setWhy(e.target.value)} type="text" placeholder="My idea is unique because..." required />
            {(why.length > 800) && <p className='text-rose-300 opacity-80 mt-2'>Oh no! this response exceeds the limit of 800 characters.</p>}
          </div>

          <div className='input-container !items-start flex-col !mt-8'>
            <label className='!w-full'>What is your proudest accomplishment and why? (max. 1200 characters)</label>
            <textarea className='!w-full mt-2' value={accomplishments} onChange={e => setAccomplishments(e.target.value)} type="text" placeholder="I have accomplished..." required />
            {(why.length > 1200) && <p className='text-rose-300 opacity-80 mt-2'>Aw, shucks! this response exceeds the limit of 1200 characters.</p>}
          </div>

          <div className='input-container'>
            <label>If you aren't selected as a speaker, would you still be interested in being present as an attendee? (Yes/No)</label>
            <input value={interest} onChange={e => setInterest(e.target.value)} type="text" placeholder="Yes" />
          </div>

        </div>

        <div className='container p-8 mt-6'>
          <h2 className='text-xl'>Video and Script Submission</h2>

          <div className='input-container flex-col !items-start'>
            <label className='!w-full'>Record a video (1-3 minutes) presenting a short clip of your speech or outlining your idea so that we can see your communication style and personality. Your video submission will only be viewed by the TED<sup>x</sup>Columbia Lake Youth organizational team, and will not be uploaded to any social media sites. <strong>Please submit a shared google drive link to your video.</strong></label>
            <input className='!w-full' value={video} onChange={e => setVideo(e.target.value)} type="url" placeholder="https://drive.google.com/file/d/19LT8yJ4VlOjzEwNms5EB0i-cmpsruxoD/view?usp=sharing" required />
          </div>

          <div className='input-container flex-col !items-start !mt-8'>
            <label className='!w-full'>If you have already begun writing a script for your talk, please submit a shared google drive link of your work thus far. (optional)</label>
            <input className='!w-full' value={doc} onChange={e => setDoc(e.target.value)} type="url" placeholder="https://docs.google.com/drawings/d/17w6nhHSvkDKJdebKGArQCWa-LzdjpKnYiuTQTHtEKJk/edit?usp=sharing"  />
          </div>

          <div className='input-container flex-col !mt-8 !items-start'>
            <label className='!w-full'>How did you hear about TED<sup>x</sup>Columbia Lake Youth? (optional)</label>
            <input className='!w-full mt-2' value={aif} onChange={e => setAif(e.target.value)} type="text" placeholder="The cool and incredibly well made website" />
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
