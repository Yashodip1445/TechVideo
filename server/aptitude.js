import {Router} from 'express';

const topics = [];
const levels = ['Easy','Medium','Hard'];
function topic(category,name,build) {topics.push({category,name,build});}
const quant=(name,build)=>topic('Quantitative aptitude',name,build);
const logic=(name,build)=>topic('Logical reasoning',name,build);
const verbal=(name,build)=>topic('Verbal ability',name,build);
const gcd=(a,b)=>b?gcd(b,a%b):a;
const fmt=x=>Number(x.toFixed(4)).toString();
const contexts=['a library','a workshop','a college','a training centre','a lab'];
// Each row contains a prompt, its answer, and the reasoning used to mark it.
quant('Percentages', (n,d)=>{
 const x=100*n;
 return [
 [`What is 15% of ${x}?`,15*n,'Multiply the base by 0.15.'],
 [`A price of ₹${x} rises 20% and then falls 10%. Find the final price in rupees.`,108*n,'Multiply the original price by 1.20 × 0.90.'],
 [`After a 25% increase and a 20% discount, a bill including 5% tax is ₹${105*n}. Find the original price before all changes.`,x,'Divide the bill by 1.25 × 0.80 × 1.05.']][d];
});
quant('Profit, loss and discounts',(n,d)=>[
 [`Buy at ₹${50*n}, sell at ₹${58*n}. Find the profit in rupees.`,8*n,'Profit = selling price − cost.'],
 [`An item costs ₹${80*n}. A trader marks it up 50% and gives a 10% discount. Find the profit in rupees.`,28*n,'Profit = cost × (1.5 × 0.9 − 1).'],
 [`Two items sell for ₹${120*n} each. One gains 20%, the other loses 20%. Find the combined loss in rupees.`,10*n,'Add the two costs (selling price ÷ 1.2 and ÷ 0.8), then subtract the total revenue.']][d]);
quant('Ratio and proportion',(n,d)=>[
 [`Divide ${7*n} seats in a 3:4 ratio. How many are in the smaller group?`,3*n,'Each part is the total divided by seven.'],
 [`A:B = 2:3 and B:C = 4:5. If A = ${8*n}, find C.`,15*n,'Equalise B to get 8:12:15.'],
 [`Two teams have a 3:5 ratio. After ${n} members move from the larger to the smaller, their ratio is 2:3. Find the original total.`,40*n,'Write the teams as 3k and 5k. Then 3(3k+n)=2(5k−n).']][d]);
quant('Time and work',(n,d)=>[
 [`A worker finishes a job in ${n+3} days. At that rate, how many days for three such jobs?`,3*(n+3),'Multiply the time per job by three.'],
 [`A can finish in ${3*n} days and B in ${6*n} days. Working together, how many days do they need?`,2*n,'Add their daily rates, then take the reciprocal.'],
 [`A takes ${6*n} days alone and B takes ${3*n}. Both work for ${n} days, then B leaves. How many MORE days must A work?`,3*n,'Together they finish half the job. A completes the remaining half alone.']][d]);
quant('Pipes and cisterns',(n,d)=>[
 [`An inlet fills ${4*n} L per minute. How many litres enter in 7 minutes?`,28*n,'Volume = rate × time.'],
 [`A tank fills in ${4*n} hours; a drain empties it in ${12*n} hours. Starting empty with both open, find the filling time in hours.`,6*n,'Subtract the drain rate from the inlet rate.'],
 [`A tank fills in ${4*n} hours. After ${n} hours a drain that empties a full tank in ${12*n} hours opens. Find the time from the start until full, in hours.`,5.5*n,'One quarter fills first. The remaining three quarters fill at the net rate.']][d]);
quant('Speed, distance and trains',(n,d)=>[
 [`A cyclist travels at ${n+8} km/h for 3 hours. Find the distance in km.`,3*(n+8),'Distance = speed × time.'],
 [`A train travels at 72 km/h. It passes a pole in ${n+5} seconds. Find its length in metres.`,20*(n+5),'Convert 72 km/h to 20 m/s and multiply by time.'],
 [`Two trains of lengths ${30*n} m and ${20*n} m move in opposite directions at 72 and 108 km/h. How many seconds to cross completely?`,n,'Divide their combined length by their relative speed of 50 m/s.']][d]);
quant('Boats and streams',(n,d)=>[
 [`A boat moves at ${n+6} km/h in still water. Current speed is 3 km/h. Find downstream speed.`,n+9,'Add the current to still-water speed.'],
 [`Upstream speed is ${2*n} km/h and downstream speed is ${4*n} km/h. Find still-water speed in km/h.`,3*n,'Average the upstream and downstream speeds.'],
 [`A boat covers ${12*n} km downstream in 2 hours and returns in 3 hours. Find the current speed in km/h.`,n,'Half the difference between the two speeds is the current speed.']][d]);
quant('Averages and ages',(n,d)=>[
 [`Find the average of ${n}, ${n+4} and ${n+8}.`,n+4,'Divide their sum by three.'],
 [`Five people average ${n+20} years. A sixth joins and the average rises by 2 years. How old is the newcomer?`,n+32,'Subtract the original total from the new total.'],
 [`Two groups average ${n+12} and ${n+27} years. Together they average ${n+21}. If the younger group has ${2*n} members, find the older group size.`,3*n,'Balance deviations from the combined mean: 9 × younger count = 6 × older count.']][d]);
quant('Simple and compound interest',(n,d)=>[
 [`Find simple interest on ₹${100*n} at 8% per year for 3 years.`,24*n,'Simple interest = principal × rate × time.'],
 [`₹${100*n} earns 10% interest compounded annually. Find the interest after 2 years.`,21*n,'Interest = principal × (1.1² − 1).'],
 [`At 10% per year the difference between compound (annual) and simple interest over three years is ₹${31*n}. Find the principal.`,1000*n,'The difference is principal × (1.1³ − 1 − 0.3).']][d]);
quant('Mixtures and alligation',(n,d)=>[
 [`A ${10*n} L drink is 30% juice. How many litres of juice does it contain?`,3*n,'Multiply volume by concentration.'],
 [`How many litres of water turn ${6*n} L of 50% juice into 30% juice?`,4*n,'Juice stays constant. Divide juice volume by 0.30, then subtract initial volume.'],
 [`A vessel holds ${16*n} L of milk. Twice, one quarter of the well-mixed contents is removed and replaced by water. How many litres of milk remain?`,9*n,'Multiply the original milk volume by (3/4)².']][d]);
quant('Number systems, HCF and LCM',(n,d)=>[
 [`Find the HCF of ${12*n} and ${18*n}.`,6*n,'Factor out the common multiplier; gcd(12,18)=6.'],
 [`Bells ring every ${4*n} and ${6*n} minutes. After ringing together, in how many minutes will they next coincide?`,12*n,'Take the least common multiple.'],
 [`Find the smallest integer greater than ${12*n} leaving remainder 1 on division by both ${4*n} and ${6*n}.`,12*n+1,'The number minus one must be a multiple of both divisors.']][d]);
quant('Algebra and equations',(n,d)=>[
 [`Solve for x: 3x + 7 = ${3*n+7}.`,n,'Subtract seven and divide by three.'],
 [`x+y=${4*n+2}, and 3x+y=${6*n+2}. Find y.`,3*n+2,'Subtract equations to find x, then substitute.'],
 [`The roots of a quadratic sum to ${2*n+5} and multiply to ${n*(n+5)}. Find the sum of their squares.`,n*n+(n+5)**2,'Use (a+b)² − 2ab.']][d]);
quant('Geometry and mensuration',(n,d)=>[
 [`A rectangle measures ${n+2} by 5 cm. Find its area in cm².`,5*(n+2),'Area = length × width.'],
 [`A cylinder has radius 7 cm and height ${n} cm. Using π=22/7 find its volume in cm³.`,154*n,'Volume = πr²h.'],
 [`A cube with edge ${3*n} cm is melted into 27 equal cubes. Find their combined surface area in cm².`,162*n*n,'Each small cube has edge n. Multiply its surface area by 27.']][d]);
quant('Permutations and combinations',(n,d)=>{const k=n+4;return [
 [`A menu has ${k} mains and 3 drinks. How many ways to choose one of each?`,3*k,'Multiply the independent counts.'],
 [`How many distinct pairs can be chosen from ${k} students?`,k*(k-1)/2,'Order does not matter: use k(k−1)/2.'],
 [`From ${k} people choose a chairperson and two equal-ranking delegates. How many selections?`,k*(k-1)*(k-2)/2,'Choose the chair, then an unordered pair from those left.']][d]});
quant('Probability',(n,d)=>{const a=n+2,b=n+3;const [p,q,ask,why]=[
 [a,a+b,'one red ball','Favourable outcomes divided by total outcomes.'],
 [a*b*2,(a+b)*(a+b-1),'one ball of each colour in two draws without replacement','Count both colour orders and account for the smaller second pool.'],
 [a*(a-1)*(a-2),(a+b)*(a+b-1)*(a+b-2),'three red balls in three draws without replacement','Multiply the three successive conditional probabilities.']][d];const g=gcd(p,q);return [`A bag contains ${a} red and ${b} blue balls. For ${ask}, what is the numerator of the probability in lowest terms?`,p/g,why+' Reduce the fraction.']});
quant('Data interpretation',(n,d)=>[
 [`At ${contexts[n%5]}, attendance Mon–Wed was ${8*n}, ${10*n}, ${12*n}. Find total attendance.`,30*n,'Sum the daily counts.'],
 [`Classes A and B enrolled ${10*n} and ${20*n} students. Completion rates were 80% and 65%. How many completed overall?`,21*n,'Multiply each count by its own rate and add.'],
 [`A report lists ${60*n} visits in Q1. Q2 rises by 25%; Q3 falls 20% from Q2. One fifth of Q3 visits are repeats. Find first-time Q3 visits.`,48*n,'Apply each quarterly multiplier, then retain 80% of Q3.']][d]);
logic('Number series',(n,d)=>{const s=Array.from({length:5},(_,i)=>[n+3*i,n+i*(i+1),n*2**i+2**i-1][d]);return [`Continue the pattern: ${s.slice(0,4).join(', ')}, …`,s[4],['Add three at each step.','Add successive even numbers, starting with two.','Double the previous term and add one.'][d]]});
logic('Directions and distances',(n,d)=>[
 [`Walk ${3*n} m north and ${n} m south. How far north of the start are you?`,2*n,'Subtract the southward distance.'],
 [`Walk ${3*n} m east and ${4*n} m north. Find the straight-line distance back, in metres.`,5*n,'Use the Pythagorean theorem.'],
 [`Facing north, walk ${8*n} m, turn right for ${6*n} m, turn right for ${4*n} m, then turn right for ${3*n} m. Find the straight-line distance from the start in metres.`,5*n,'Net displacement is 4n north and 3n east.']][d]);
logic('Ranking and order',(n,d)=>[
 [`In a queue of ${3*n+5}, Ana ranks ${n} from the front. What is her rank from the back?`,2*n+6,'Back rank = total − front rank + 1.'],
 [`Ravi is ${n+2} from the front. Mira is behind him with 4 people between them. Mira ranks 7 from the back. How many people are there?`,n+13,'Add five to Ravi’s rank for Mira’s front rank, then add her back rank minus one.'],
 [`In a row of ${4*n+12}, Ana and Bo swap places. Ana is now ${n+4} from the front, and Bo is ${n+3} from the back. How many people stood between them before the swap?`,2*n+5,'Convert both ranks to front ranks; subtract one from their difference.']][d]);
logic('Coding and decoding',(n,d)=>{const word=['MAP','PEN','INK','BOX','CUP','KEY','LAB','ROW','BUS','CAT','DOG','HAT','JAR','KIT','LOG','NET','OWL','PAN','RUG','SUN'][n-1];
 const shift=(w,k)=>[...w].map(c=>String.fromCharCode(65+(c.charCodeAt(0)-65+k)%26)).join('');
 const k=n%5+1;const rules=['shift each letter forward','reverse the letters, then shift each forward','shift each letter forward, then move the first encoded letter to the end'];
 const base=d===1?[...word].reverse().join(''):word;
 const enc=i=>{const s=shift(base,i);return d===2?s.slice(1)+s[0]:s};
 return [`Encode ${word}: ${rules[d]} by ${k} place(s) ${d===2?'in the shift step':''} (wrap after Z).`,enc(k),'Apply the operations in their stated order.',[enc(k+1),enc(k+2),enc(k+3)]]});
const words=[
 ['brief','short','lengthy','The editor asked for a brief summary.'],['scarce','rare','abundant','Clean water was scarce during the drought.'],['cautious','careful','reckless','The cautious driver slowed near the bend.'],['fragile','delicate','sturdy','The fragile vase needed extra padding.'],['vivid','striking','dull','The witness gave a vivid description.'],['swift','quick','sluggish','The team made a swift recovery.'],['eager','keen','reluctant','She was eager to join the workshop.'],['rigid','inflexible','flexible','The rigid timetable allowed no changes.'],['modest','humble','boastful','Despite the award he remained modest.'],['evident','obvious','obscure','The cause was evident from the data.'],['diligent','hardworking','idle','The diligent apprentice practised daily.'],['precise','exact','vague','The manual gave precise measurements.'],['tranquil','calm','turbulent','The lake was tranquil at dawn.'],['durable','lasting','flimsy','The durable bag survived years of travel.'],['vacant','empty','occupied','One seat remained vacant.'],['expand','enlarge','shrink','The board voted to expand the library.'],['retain','keep','discard','Please retain a copy of the invoice.'],['conceal','hide','reveal','The curtain helped conceal the cables.'],['unite','join','divide','The organisers hoped to unite the teams.'],['assist','help','hinder','A mentor will assist the new recruit.']
];
verbal('Vocabulary in context',(n,d)=>{const [word,syn,ant,line]=words[n-1];return [
 [`Which word is closest in meaning to “${word}” in “${line}”?`,syn,`Here, “${word}” means “${syn}”.`,[ant,'repeat','delay']],
 [`In “${line}”, which alternative most directly reverses the meaning of “${word}”?`,ant,`“${ant}” expresses the opposite sense.`,[syn,word,'observe']],
 [`Read: “${line}” Which pair gives, in order, a near synonym and a contrasting word for “${word}”?`,syn+' / '+ant,'The first word preserves the contextual meaning; the second reverses it.',[ant+' / '+syn,word+' / '+syn,ant+' / '+word]]][d]});
const subjects=['editor','tutor','analyst','designer','writer','teacher','mentor','reviewer','engineer','manager','planner','auditor','librarian','coordinator','researcher','inspector','architect','developer','trainer','technician'];
verbal('Grammar and sentence completion',(n,d)=>{const s=subjects[n-1];return [
 [`Every ${s} ___ a checklist before starting.`,'uses','Every takes a singular subject and verb.',['use','using','have used']],
 [`Neither the ${s} nor the assistants ___ available yesterday.`,'were','With neither/nor, the verb agrees with the nearer subject, assistants.',['was','is','has been']],
 [`If the ${s} had seen the warning, the team ___ the earlier mistake. Choose the completed past counterfactual.`,'would have avoided','A past counterfactual uses if + past perfect and would have + participle.',['would avoid','will have avoided','had avoid']]][d]});
const sites=['Hill','Pine','River','Lake','Maple','Cedar','Oak','Harbour','Valley','Park','Town','Elm','Mill','Garden','Forest','Spring','Market','Meadow','Bridge','West'];
verbal('Reading comprehension and inference',(n,d)=>{const s=sites[n-1]+' Library';return [
 [`${s} lends tablets on Fridays. Laptops may be borrowed on Mondays. Which item is available to borrow on Friday according to the notice?`,'Tablets','The first sentence states this directly.',['Laptops','Both devices','Neither device']],
 [`${s} admits only registered members after 6 pm. A visitor entered at 7 pm under this rule. What must be true?`,'The visitor was registered.','Registration is a necessary condition for entry at that time.',['The visitor entered before 6 pm.','All registered members entered.','Registration guarantees a seat.']],
 [`${s} extended evening hours in June. Visits rose compared with May, while a nearby branch closed for repairs. What conclusion does the evidence support?`,'The increase coincided with both changes.','The comparison cannot isolate the effect of longer hours from the nearby closure.',['Longer hours caused every extra visit.','The closure had no effect.','Visits would have risen equally without either change.']]][d]});
quant('Partnership',(n,d)=>[
 [`Partners share ₹${5*n*100} in a 2:3 ratio. Find the first share in rupees.`,200*n,'The first partner receives two fifths of the profit.'],
 [`A invests ₹${2000*n} for 12 months and B invests ₹${3000*n} for 6 months. From ₹${700*n} profit find B’s share.`,300*n,'Capital × time gives a 4:3 ratio.'],
 [`A invests ₹${1000*n} for a year. B invests ₹${2000*n} for 3 months and ₹${1000*n} for 9 months. B gets a ₹${90*n} fee before sharing the rest of ₹${990*n} by capital-months. Find B’s total.`,590*n,'The ratio is 12:15. B gets five ninths of the remainder plus the fee.']][d]);
quant('Fractions and simplification',(n,d)=>[
 [`Find three eighths of ${8*n}.`,3*n,'Divide by eight and multiply by three.'],
 [`Evaluate (${18*n} ÷ 3 + ${4*n}) × 0.5.`,5*n,'Complete the division, add, then halve.'],
 [`A student spends one third of a budget, then two fifths of the remainder. The balance is ₹${12*n}. Find the original budget.`,30*n,'Two thirds times three fifths leaves two fifths of the original budget.']][d]);
quant('Powers, roots and logarithms',(n,d)=>[
 [`Find the positive square root of ${(n+4)**2}.`,n+4,'Identify the positive integer whose square is the given number.'],
 [`If 2^x × 2^3 = 2^${n+7}, find x.`,n+4,'Add exponents when multiplying powers with the same base.'],
 [`For x > ${n}, log₂(x − ${n}) + log₂(x − ${n}) = 6. Find x.`,n+8,'Each logarithm equals 3, so its argument is 8.']][d]);
quant('Progressions',(n,d)=>[
 [`An arithmetic progression starts at ${n} with difference 4. Find the sixth term.`,n+20,'Add five common differences to the first term.'],
 [`Find the sum of the first ten terms of an arithmetic progression with first term ${n} and difference 3.`,10*n+135,'Use ten times the average of the first and tenth terms.'],
 [`A geometric progression with positive terms has second term ${3*n} and fourth term ${27*n}. Find the sum of its first four terms.`,40*n,'The ratio squared is 9, so the ratio is 3 and the first term is one third of the second.']][d]);
logic('Calendars and clocks',(n,d)=>{const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];return [
 [`Today is Monday. What day will it be in ${n+9} days?`,days[(n+9)%7],'Reduce the elapsed days modulo seven.',[1,2,3].map(k=>days[(n+9+k)%7])],
 [`A clock gains 3 minutes per real hour. It starts exactly right. After ${n+2} real hours, how many minutes fast is it?`,3*(n+2),'Multiply the gain per hour by elapsed real hours.'],
 [`At 3:${String(n+10).padStart(2,'0')}, what is the smaller angle between the hands in degrees?`,Math.abs(90-5.5*(n+10)),'The minute hand advances 6 degrees per minute and the hour hand advances 0.5.']][d]});

export const catalogue=topics.map(({category,name})=>({category,name}));
export function questions(name,level){
 const t=topics.find(t=>t.name===name),d=levels.indexOf(level);
 if(!t||d<0)return null;
 return Array.from({length:20},(_,i)=>{
 const [prompt,value,explanation,alternatives]=t.build(i+1,d);
 const answer=typeof value==='number'?fmt(value):value;
 const offset=Math.max(1,Math.ceil(Math.abs(Number(value)||1)/11));
 const choices=alternatives?[...alternatives]:[1,2,3].map(k=>fmt(value+offset*(i%2?k:-k))).map((v,k)=>Number(v)<0?fmt(value+offset*(k+4)):v);
 const correct=(i*7+d+Math.floor(i/3))%4;
 choices.splice(correct,0,answer);
 return {prompt,choices,correct,explanation};
 });
}
export const practice=Router();
practice.get('/',(_,res)=>res.json(catalogue));
practice.get('/:topic/:level',(req,res)=>{
 const set=questions(req.params.topic,req.params.level);
 if(!set)return res.sendStatus(404);
 res.json(set.map(({prompt,choices})=>({prompt,choices})));
});
practice.post('/:topic/:level',(req,res)=>{
 const set=questions(req.params.topic,req.params.level),a=req.body?.answers;
 if(!set)return res.sendStatus(404);
 if(!Array.isArray(a)||a.length!==20||!a.every(v=>Number.isInteger(v)&&v>=0&&v<4))return res.status(400).json({error:'Answer all 20 questions.'});
 res.json({score:set.filter((q,i)=>q.correct===a[i]).length,review:set.map(({correct,explanation})=>({correct,explanation}))});
});
