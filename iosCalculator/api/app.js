const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const Decimal = require('decimal.js');


app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded());
const calculate = (n1, operator, n2 = 0, callback) => {
  n1 = new Decimal(n1);
  n2 = new Decimal(n2);

  if (operator === 'add') return { result: n1.plus(n2).toNumber(), calc: `${n1} + ${n2}` };
  if (operator === 'subtract') return { result: n1.sub(n2).toNumber(), calc: `${n1} - ${n2}` };
  if (operator === 'multiply') return { result: n1.mul(n2).toNumber(), calc: `${n1} * ${n2}` };
  if (operator === 'divide') return { result: n1.div(n2).toNumber(), calc: `${n1} / ${n2}` };
  if (operator === 'percent') return { result: n1.div(100).toNumber(), calc: `${n1}/100` };

};

app.post('/', (req, res) => {
  console.log("server post", req.body);
  res.json(calculate(req.body.n1, req.body.operator, req.body.n2, req.nodeActions));
});
app.get('/', (req, res) => {
  console.log("server get");
  res.send('<h1>Calculator Backend - Please make sure to use a post request<h2>')

});

//app.post('/', (req, res) => res.json(calculate(req.body.n1, req.body.operator, req.body.n2, nodeActions)));

// app.get('/', (req, res) => res.send('<h1>Calculator Backend - Please make sure to use a post request<h2>'));


app.listen(port, () => {
  console.log(`Calculator listening on port ${port}`)
})