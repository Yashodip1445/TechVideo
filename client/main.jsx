import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Practice from './Practice.jsx';

const examples = [
  {prompt:'Which index holds the first element of a Java array?', choices:['0','1','The array length'], correct:0},
  {prompt:'How much time does one pass over n elements take?', choices:['O(1)','O(n)','O(n²)'], correct:1},
  {prompt:'When moving zeroes in place, what does the write pointer track?', choices:['The last zero','The array length','The next slot for a nonzero value'], correct:2}
];

async function api(path, options) {
  const response = await fetch('/api/' + path, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

function Studio({onPublish}) {
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  async function publish(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const questions = examples.map((_,i) => ({
      prompt:fields.get('q'+i), choices:[0,1,2].map(j => fields.get('c'+i+j)), correct:Number(fields.get('a'+i))
    }));
    setBusy(true);
    setError('');
    try {
      const result = await api('lessons',{method:'POST',headers:{'Content-Type':'application/json','X-Admin-Key':fields.get('key')},body:JSON.stringify({
        title:fields.get('title'),videoId:fields.get('video').trim(),questions
      })});
      onPublish(result.id);
    } catch (err) { setError(err.message); } finally {setBusy(false);}
  }
  return <form onSubmit={publish}><h1>Publish a lesson</h1>
    <label>Lesson title<input name="title" required placeholder="Move Zeroes in Java"/></label>
    <label>YouTube video ID<input name="video" required pattern="[a-zA-Z0-9_\-]{11}" /></label>
    {examples.map((q,i) => <fieldset key={i}><legend>Question {i+1}</legend>
      <label>Prompt<input required name={'q'+i} defaultValue={q.prompt}/></label>
      {q.choices.map((c,j) => <label key={j}>Option {j+1}<input required name={'c'+i+j} defaultValue={c}/></label>)}
      <label>Correct option<select name={'a'+i} defaultValue={q.correct}>{[0,1,2].map(j=><option value={j} key={j}>{j+1}</option>)}</select></label>
    </fieldset>)}
    <label>Admin key<input required type="password" name="key"/></label>
    {error && <p role="alert">{error}</p>}<button disabled={busy}>Publish lesson</button>
  </form>;
}

function Lesson({lesson}) {
  const [result,setResult] = useState('');
  const [busy,setBusy] = useState(false);
  async function grade(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const answers = lesson.questions.map((_,i)=>Number(fields.get('answer'+i)));
    setBusy(true);
    try {
      const data = await api('lessons/'+lesson._id+'/attempts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers})});
      setResult('Your score: '+data.score+' / '+data.total);
    } catch (err) {setResult(err.message);} finally {setBusy(false);}
  }
  return <article><h1>{lesson.title}</h1><iframe title={lesson.title} src={'https://www.youtube-nocookie.com/embed/'+lesson.videoId} allowFullScreen/>
    <form onSubmit={grade} onChange={()=>setResult('')}><h2>Check your understanding</h2>
      {lesson.questions.map((q,i)=><fieldset key={q._id}><legend>{i+1}. {q.prompt}</legend>
        {q.choices.map((choice,j)=><label className="choice" key={j}><input required type="radio" name={'answer'+i} value={j}/>{choice}</label>)}
      </fieldset>)}<button disabled={busy}>Check answers</button><p role="status">{result}</p>
    </form></article>;
}

function App() {
  const [page,setPage] = useState('Video library');
  const [lessons,setLessons] = useState(null);
  const [selected,setSelected] = useState('');
  const [search,setSearch] = useState('');
  const [error,setError] = useState('');
  async function refresh(id='') {
    setError('');
    try {setLessons(await api('lessons'));setSelected(id);}
    catch {setError('Could not load lessons. Check the API and MongoDB connection.');}
  }
  useEffect(()=>{refresh();},[]);
  const lesson=lessons?.find(item=>item._id===selected);
  const filtered=lessons?.filter(item=>item.title.toLowerCase().includes(search.trim().toLowerCase()));
  return <><header><strong><span className="mark" aria-hidden="true">▶</span> TechVideo</strong>
    <nav aria-label="Main navigation">{['Video library','Aptitude practice','Creator studio'].map(label=>
    <button key={label} aria-pressed={page===label} onClick={()=>{setPage(label);setSelected('')}}>{label}</button>)}</nav></header><main>
    {page==='Aptitude practice'?<Practice/>:page==='Creator studio'?<Studio onPublish={id=>{setPage('Video library');refresh(id)}}/>:
    error?<section role="alert"><p>{error}</p><button onClick={()=>refresh()}>Retry</button></section>:
    lesson?<><button className="back" onClick={()=>setSelected('')}>← All videos</button><Lesson key={selected} lesson={lesson}/></>:
    <><h1>Video library</h1><label className="search">Search lessons<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title"/></label>
    {lessons===null?<p>Loading lessons…</p>:!lessons.length?<section><h2>Publish your first video</h2><p>Add a technical lesson and its quiz in Creator studio.</p><button onClick={()=>setPage('Creator studio')}>Create a lesson</button></section>:
    !filtered.length?<p>No lessons match your search.</p>:
    <div className="grid">{filtered.map(item=><button className="video tile" key={item._id} onClick={()=>setSelected(item._id)}>
      <img src={'https://i.ytimg.com/vi/'+item.videoId+'/hqdefault.jpg'} alt="" loading="lazy"/>
      <strong>{item.title}</strong><small>{item.questions.length} quiz questions</small></button>)}</div>}</>}</main></>;
}
createRoot(document.getElementById('root')).render(<App/>);
