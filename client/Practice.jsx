import React,{useEffect,useState} from 'react';

const groups=['Quantitative aptitude','Verbal ability','Logical reasoning'];
const levels=['Easy','Medium','Hard'];
async function request(path,options) {
  const res=await fetch('/api/practice'+path,options);
  if(!res.ok) throw Error('Could not load practice. Check your local API and try again.');
  return res.json();
}
function Test({topic,level,back}) {
  const [items,setItems]=useState(null), [answers,setAnswers]=useState(Array(20).fill(null));
  const [index,setIndex]=useState(0),[review,setReview]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  const path='/'+encodeURIComponent(topic)+'/'+level;
  useEffect(()=>{let active=true;request(path).then(x=>active&&setItems(x)).catch(e=>active&&setError(e.message));return ()=>{active=false};},[path]);
  async function grade(){
    setBusy(true);setError('');
    try {setReview(await request(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers})}));setIndex(0);}
    catch(e){setError(e.message)}finally{setBusy(false)}
  }
  const item=items?.[index], answered=answers.filter(a=>a!==null).length;
  return <><button className="back" onClick={back}>← Topics</button><h1>{topic}</h1><p>{level} · 20 questions</p>
    {error&&<p role="alert">{error}</p>}{!item&&!error&&<p>Loading questions…</p>}
    {item&&<section>{review&&<h2 role="status">Score: {review.score} / 20</h2>}
    <progress value={answered} max="20" aria-label="Questions answered"/><p>Question {index+1} of 20</p>
    <fieldset><legend>{item.prompt}</legend>{item.choices.map((choice,i)=><label className="choice" key={i}>
      <input type="radio" name="option" disabled={!!review||busy} checked={answers[index]===i} onChange={()=>setAnswers(answers.map((v,j)=>j===index?i:v))}/>{choice}</label>)}</fieldset>
    {review&&<p className="feedback"><strong>Correct answer: {item.choices[review.review[index].correct]}</strong><br/>{review.review[index].explanation}</p>}
    <div className="controls"><button disabled={!index} onClick={()=>setIndex(index-1)}>Previous</button>
    {index<19?<button disabled={answers[index]===null} onClick={()=>setIndex(index+1)}>Next question</button>:review?<button onClick={back}>Finish review</button>:<button disabled={answered!==20||busy} onClick={grade}>Check score</button>}</div>
    </section>}</>;
}
export default function Practice(){
 const [topics,setTopics]=useState([]),[group,setGroup]=useState(groups[0]),[level,setLevel]=useState('Easy'),[active,setActive]=useState(null),[error,setError]=useState(''),[retry,setRetry]=useState(0);
 useEffect(()=>{let live=true;request('').then(x=>live&&setTopics(x)).catch(e=>live&&setError(e.message));return ()=>{live=false};},[retry]);
 if(active)return <Test topic={active} level={level} back={()=>setActive(null)}/>;
 return <><h1>Aptitude practice</h1><div className="filters"><label>Subject<select value={group} onChange={e=>setGroup(e.target.value)}>{groups.map(g=><option key={g}>{g}</option>)}</select></label>
 <label>Difficulty<select value={level} onChange={e=>setLevel(e.target.value)}>{levels.map(g=><option key={g}>{g}</option>)}</select></label></div>
 {error?<section role="alert">{error} <button onClick={()=>{setError('');setRetry(retry+1)}}>Retry</button></section>:!topics.length?<p>Loading topics…</p>:<div className="grid">{topics.filter(t=>t.category===group).map(t=><button className="tile" key={t.name} onClick={()=>setActive(t.name)}><strong>{t.name}</strong><small>{level} · 20 questions →</small></button>)}</div>}</>;
}
