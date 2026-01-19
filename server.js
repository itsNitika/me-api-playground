const exp = require('express');
const mng = require('mongoose');
const bp = require('body-parser');
const pth = require('path');

const app = exp();
const prt = 3000;
const uri = 'mongodb://127.0.0.1:27017/portfolioDB';

app.use(bp.json());
app.use(exp.static(__dirname));

const sch = new mng.Schema({
  nm: String,
  edu: [{ ins: String, dt: String, deg: String, scr: String }],
  skl: [String],
  prj: [{ tit: String, stk: String, dsc: [String], lnk: { git: String, dmo: String } }],
  ach: [{ tit: String, val: String }],
  pos: [{ role: String, dtl: String }]
});

const Pro = mng.model('Profile', sch);

const sdd = {
  nm: "Nitika Pandey",
  edu: [
    { ins: "NIT Delhi", dt: "Aug 2023 - Jun 2027", deg: "B.Tech EE", scr: "" },
    { ins: "SKV Mahipalpur", dt: "2022 - 2023", deg: "12th", scr: "92%" }
  ],
  skl: ["C/C++", "Python", "SQL", "JavaScript", "React", "Node", "MongoDB", "Arduino"],
  prj: [
    { tit: "Baker’s Nest", stk: "MERN Stack", dsc: ["E-commerce", "RazorPay"], lnk: { git: "#", dmo: "#" } },
    { tit: "Prep Code Beacon", stk: "React, Firebase", dsc: ["DSA Platform"], lnk: { git: "#", dmo: "#" } },
    { tit: "Self-Balancing Robot", stk: "Arduino", dsc: ["PID Control"], lnk: { git: "#", dmo: "#" } }
  ],
  ach: [{ tit: "Leetcode", val: "600+ Qs" }],
  pos: [{ role: "Cultural Club", dtl: "Exec Member" }]
};

const cn = async () => {
  try {
    await mng.connect(uri);
    if ((await Pro.countDocuments()) === 0) await Pro.create(sdd);
  } catch (e) { console.log(e); }
};
cn();

app.get('/', (req, res) => {
  res.sendFile(pth.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => res.status(200).send('OK'));

app.get('/profile', async (req, res) => {
  const d = await Pro.findOne();
  res.json(d);
});

app.post('/profile', async (req, res) => {
  const d = await Pro.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(d);
});

app.get('/projects', async (req, res) => {
  const d = await Pro.findOne();
  let p = d.prj;
  if (req.query.skill) p = p.filter(x => x.stk.toLowerCase().includes(req.query.skill.toLowerCase()));
  res.json(p);
});

app.get('/search', async (req, res) => {
  const d = await Pro.findOne();
  const q = (req.query.q || '').toLowerCase();
  const r = {
    prj: d.prj.filter(x => x.tit.toLowerCase().includes(q)),
    skl: d.skl.filter(x => x.toLowerCase().includes(q))
  };
  res.json(r);
});

app.listen(prt, () => console.log(`Run: http://localhost:${prt}`));
