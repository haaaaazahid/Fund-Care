'use client';

import { useState, useEffect, ReactNode } from 'react';
import * as calc from '@/lib/calculators';
import { formatINR as inr } from '@/lib/calculators';

interface SliderProps {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; prefix?: string; suffix?: string;
}
function Slider({ label, value, min, max, step, onChange, prefix = '', suffix = '' }: SliderProps) {
  return (
    <div className="mb-5.5">
      <label className="flex justify-between text-[13.5px] text-muted mb-2">
        <span>{label}</span>
        <b className="text-navy dark:text-ink font-semibold">{prefix}{value}{suffix}</b>
      </label>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[13.5px] py-1.5 text-muted">
      <span>{label}</span><b className="text-[var(--ink)]">{value}</b>
    </div>
  );
}

function Panel({ title, inputs, output, disclaimerExtra }: { title: string; inputs: ReactNode; output: ReactNode; disclaimerExtra?: string }) {
  return (
    <div className="grid md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]">
      <div className="bg-[var(--surface)] p-8">
        <h3 className="mb-5.5 text-navy dark:text-ink text-lg font-serif">{title}</h3>
        {inputs}
      </div>
      <div className="bg-[var(--surface)] p-8 flex flex-col justify-center">
        {output}
      </div>
      <div className="md:col-span-2 bg-[var(--surface)] px-8 pb-6 -mt-2">
        <p className="text-xs text-muted italic border-t border-[var(--line)] pt-3.5">
          Illustrative calculations only. Actual returns may vary and are not guaranteed. {disclaimerExtra}
        </p>
      </div>
    </div>
  );
}

function SaveButton({ kind, value }: { kind: string; value: number }) {
  return (
    <button
      className="text-[13px] px-4 py-2 border border-[var(--line)] hover:border-gold"
      onClick={() => {
        try {
          const key = 'fc-calc-history';
          const list = JSON.parse(localStorage.getItem(key) || '[]');
          list.unshift({ kind, value: Math.round(value), date: new Date().toISOString() });
          localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
          alert('Saved to your browser. (Demo storage — connect the backend API for real persistence.)');
        } catch {}
      }}
    >
      Save calculation
    </button>
  );
}

const TABS = [
  ['sip', 'SIP'], ['stepup', 'Step-Up SIP'], ['lumpsum', 'Lumpsum'], ['cagr', 'CAGR'],
  ['swp', 'SWP'], ['retirement', 'Retirement'], ['goal', 'Goal Planner'], ['emi', 'EMI'],
  ['ppf', 'PPF'], ['fd', 'FD'], ['inflation', 'Inflation Impact'],
] as const;

export default function Calculators({ initialTab = 'sip' }: { initialTab?: string }) {
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && TABS.some(([slug]) => slug === hash)) setTab(hash);
  }, []);

  return (
    <div>
      <div className="flex gap-2.5 flex-wrap mb-10">
        {TABS.map(([slug, name]) => (
          <button
            key={slug}
            onClick={() => setTab(slug)}
            className={`text-[13.5px] px-4 py-2.5 border ${tab === slug ? 'border-gold-dark dark:border-gold text-gold-dark dark:text-gold bg-gold-pale' : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]'}`}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === 'sip' && <SipPanel />}
      {tab === 'stepup' && <StepUpPanel />}
      {tab === 'lumpsum' && <LumpsumPanel />}
      {tab === 'cagr' && <CagrPanel />}
      {tab === 'swp' && <SwpPanel />}
      {tab === 'retirement' && <RetirementPanel />}
      {tab === 'goal' && <GoalPanel />}
      {tab === 'emi' && <EmiPanel />}
      {tab === 'ppf' && <PpfPanel />}
      {tab === 'fd' && <FdPanel />}
      {tab === 'inflation' && <InflationPanel />}
    </div>
  );
}

function SipPanel() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const r = calc.sip(amount, rate, years);
  return (
    <Panel
      title="SIP Calculator"
      inputs={<>
        <Slider label="Monthly investment (₹)" value={amount} min={500} max={200000} step={500} onChange={setAmount} prefix="₹" />
        <Slider label="Expected annual return" value={rate} min={1} max={30} step={0.5} onChange={setRate} suffix="%" />
        <Slider label="Investment period" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Maturity value</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.futureValue)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Total invested" value={inr(r.invested)} />
          <Row label="Estimated returns" value={inr(r.gain)} />
          <Row label="Investment period" value={`${years} years`} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="sip" value={r.futureValue} /></div>
      </>}
    />
  );
}

function StepUpPanel() {
  const [amount, setAmount] = useState(10000);
  const [step, setStep] = useState(10);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const r = calc.stepUpSip(amount, step, rate, years);
  return (
    <Panel
      title="Step-Up SIP Calculator"
      inputs={<>
        <Slider label="Starting monthly investment (₹)" value={amount} min={500} max={200000} step={500} onChange={setAmount} prefix="₹" />
        <Slider label="Annual step-up" value={step} min={0} max={50} step={1} onChange={setStep} suffix="%" />
        <Slider label="Expected annual return" value={rate} min={1} max={30} step={0.5} onChange={setRate} suffix="%" />
        <Slider label="Investment period" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Maturity value</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.futureValue)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Total invested" value={inr(r.invested)} />
          <Row label="Estimated returns" value={inr(r.gain)} />
          <Row label="Final monthly instalment" value={inr(r.finalMonthly)} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="stepup" value={r.futureValue} /></div>
      </>}
    />
  );
}

function LumpsumPanel() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const r = calc.lumpsum(amount, rate, years);
  return (
    <Panel
      title="Lumpsum Calculator"
      inputs={<>
        <Slider label="Investment amount (₹)" value={amount} min={1000} max={10000000} step={1000} onChange={setAmount} prefix="₹" />
        <Slider label="Expected annual return" value={rate} min={1} max={30} step={0.5} onChange={setRate} suffix="%" />
        <Slider label="Investment period" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Maturity value</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.futureValue)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Principal invested" value={inr(r.invested)} />
          <Row label="Estimated returns" value={inr(r.gain)} />
          <Row label="Investment period" value={`${years} years`} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="lumpsum" value={r.futureValue} /></div>
      </>}
    />
  );
}

function CagrPanel() {
  const [start, setStart] = useState(100000);
  const [end, setEnd] = useState(250000);
  const [years, setYears] = useState(5);
  const rate = calc.cagr(start, end, years);
  return (
    <Panel
      title="CAGR Calculator"
      inputs={<>
        <Slider label="Starting value (₹)" value={start} min={1000} max={10000000} step={1000} onChange={setStart} prefix="₹" />
        <Slider label="Ending value (₹)" value={end} min={1000} max={20000000} step={1000} onChange={setEnd} prefix="₹" />
        <Slider label="Duration" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Compound annual growth rate</div>
        <div className="font-serif text-[34px] text-gold-dark dark:text-gold">{rate.toFixed(1)}%</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Starting value" value={inr(start)} />
          <Row label="Ending value" value={inr(end)} />
          <Row label="Duration" value={`${years} years`} />
        </div>
      </>}
    />
  );
}

function SwpPanel() {
  const [corpus, setCorpus] = useState(2000000);
  const [withdraw, setWithdraw] = useState(15000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(15);
  const r = calc.swp(corpus, withdraw, rate, years);
  return (
    <Panel
      title="SWP Calculator"
      inputs={<>
        <Slider label="Starting corpus (₹)" value={corpus} min={100000} max={50000000} step={10000} onChange={setCorpus} prefix="₹" />
        <Slider label="Monthly withdrawal (₹)" value={withdraw} min={500} max={500000} step={500} onChange={setWithdraw} prefix="₹" />
        <Slider label="Expected annual return" value={rate} min={1} max={25} step={0.5} onChange={setRate} suffix="%" />
        <Slider label="Withdrawal period" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">{r.lasted ? 'Corpus remaining after period' : 'Corpus lasts for'}</div>
        <div className={`font-serif text-[34px] ${r.lasted ? 'text-navy dark:text-ink' : 'text-gold-dark dark:text-gold'}`}>
          {r.lasted ? inr(r.endingCorpus) : `${Math.floor(r.monthsLasted / 12)} yrs ${r.monthsLasted % 12} mo`}
        </div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Starting corpus" value={inr(corpus)} />
          <Row label="Total withdrawn" value={inr(r.totalWithdrawn)} />
          <Row label="Monthly withdrawal" value={inr(withdraw)} />
        </div>
      </>}
      disclaimerExtra="Simulation depletes the corpus month by month; results show whether it lasts the full period."
    />
  );
}

function RetirementPanel() {
  const [age, setAge] = useState(30);
  const [retAge, setRetAge] = useState(60);
  const [expense, setExpense] = useState(40000);
  const [inflation, setInflation] = useState(6);
  const [postReturn, setPostReturn] = useState(7);
  const [preReturn, setPreReturn] = useState(11);
  const [lifeExp, setLifeExp] = useState(85);
  const r = calc.retirement({
    currentAge: age, retirementAge: retAge, monthlyExpenseToday: expense,
    inflationPct: inflation, postRetirementReturnPct: postReturn, preRetirementReturnPct: preReturn, lifeExpectancy: lifeExp,
  });
  return (
    <Panel
      title="Retirement Calculator"
      inputs={<>
        <Slider label="Current age" value={age} min={18} max={60} step={1} onChange={setAge} suffix=" yrs" />
        <Slider label="Retirement age" value={retAge} min={45} max={75} step={1} onChange={setRetAge} suffix=" yrs" />
        <Slider label="Current monthly expense (₹)" value={expense} min={5000} max={1000000} step={1000} onChange={setExpense} prefix="₹" />
        <Slider label="Expected inflation" value={inflation} min={1} max={12} step={0.5} onChange={setInflation} suffix="%" />
        <Slider label="Expected post-retirement return" value={postReturn} min={1} max={15} step={0.5} onChange={setPostReturn} suffix="%" />
        <Slider label="Expected pre-retirement return" value={preReturn} min={1} max={20} step={0.5} onChange={setPreReturn} suffix="%" />
        <Slider label="Life expectancy" value={lifeExp} min={65} max={100} step={1} onChange={setLifeExp} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Retirement corpus needed</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.corpusNeeded)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Monthly SIP needed till retirement" value={inr(r.monthlySIP)} />
          <Row label="Monthly expense at retirement (future value)" value={inr(r.futureMonthlyExpense)} />
          <Row label="Years to retirement" value={`${r.yearsToRetire} years`} />
          <Row label="Years in retirement" value={`${r.yearsInRetirement} years`} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="retirement" value={r.corpusNeeded} /></div>
      </>}
    />
  );
}

function GoalPanel() {
  const [cost, setCost] = useState(1000000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [rate, setRate] = useState(12);
  const r = calc.goalPlanner(cost, years, inflation, rate);
  return (
    <Panel
      title="Goal Planner"
      inputs={<>
        <Slider label="Goal cost today (₹)" value={cost} min={10000} max={20000000} step={10000} onChange={setCost} prefix="₹" />
        <Slider label="Years to goal" value={years} min={1} max={30} step={1} onChange={setYears} suffix=" yrs" />
        <Slider label="Expected inflation" value={inflation} min={0} max={12} step={0.5} onChange={setInflation} suffix="%" />
        <Slider label="Expected annual return" value={rate} min={1} max={25} step={0.5} onChange={setRate} suffix="%" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Monthly SIP needed</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.monthlySIP)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Goal cost today" value={inr(cost)} />
          <Row label={`Goal cost in ${years} yrs (inflation-adjusted)`} value={inr(r.futureCost)} />
          <Row label="Assumed return" value={`${rate}%`} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="goal" value={r.monthlySIP} /></div>
      </>}
    />
  );
}

function EmiPanel() {
  const [amount, setAmount] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const r = calc.emi(amount, rate, years);
  return (
    <Panel
      title="EMI Calculator"
      inputs={<>
        <Slider label="Loan amount (₹)" value={amount} min={100000} max={50000000} step={10000} onChange={setAmount} prefix="₹" />
        <Slider label="Interest rate (annual)" value={rate} min={4} max={20} step={0.05} onChange={setRate} suffix="%" />
        <Slider label="Loan tenure" value={years} min={1} max={30} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Monthly EMI</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.emi)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Principal" value={inr(amount)} />
          <Row label="Total interest" value={inr(r.totalInterest)} />
          <Row label="Total payment" value={inr(r.totalPayment)} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="emi" value={r.emi} /></div>
      </>}
    />
  );
}

function PpfPanel() {
  const [amount, setAmount] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);
  const r = calc.ppf(amount, rate, years);
  return (
    <Panel
      title="PPF Calculator"
      inputs={<>
        <Slider label="Yearly contribution (₹)" value={amount} min={500} max={150000} step={500} onChange={setAmount} prefix="₹" />
        <Slider label="PPF interest rate" value={rate} min={5} max={9} step={0.1} onChange={setRate} suffix="%" />
        <Slider label="Duration" value={years} min={5} max={40} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Maturity value</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.maturityValue)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Total contribution" value={inr(r.invested)} />
          <Row label="Interest earned" value={inr(r.gain)} />
          <Row label="Rate assumed" value={`${rate}%`} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="ppf" value={r.maturityValue} /></div>
      </>}
      disclaimerExtra="PPF rate is set by the government each quarter — the default reflects a recent historical rate; update as needed."
    />
  );
}

function FdPanel() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(4);
  const r = calc.fixedDeposit(amount, rate, years, freq);
  return (
    <Panel
      title="FD Calculator"
      inputs={<>
        <Slider label="Principal (₹)" value={amount} min={5000} max={10000000} step={5000} onChange={setAmount} prefix="₹" />
        <Slider label="Interest rate (annual)" value={rate} min={3} max={12} step={0.1} onChange={setRate} suffix="%" />
        <Slider label="Tenure" value={years} min={1} max={20} step={1} onChange={setYears} suffix=" yrs" />
        <Slider label="Compounding frequency (per yr)" value={freq} min={1} max={12} step={1} onChange={setFreq} />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Maturity value</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.maturityValue)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Principal" value={inr(amount)} />
          <Row label="Interest earned" value={inr(r.gain)} />
          <Row label="Compounding" value={`${freq}x per year`} />
        </div>
        <div className="flex gap-2.5 mt-5"><SaveButton kind="fd" value={r.maturityValue} /></div>
      </>}
    />
  );
}

function InflationPanel() {
  const [cost, setCost] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(15);
  const r = calc.inflationImpact(cost, rate, years);
  return (
    <Panel
      title="Inflation Impact Calculator"
      inputs={<>
        <Slider label="Current cost (₹)" value={cost} min={1000} max={10000000} step={1000} onChange={setCost} prefix="₹" />
        <Slider label="Expected inflation" value={rate} min={1} max={12} step={0.5} onChange={setRate} suffix="%" />
        <Slider label="Years" value={years} min={1} max={40} step={1} onChange={setYears} suffix=" yrs" />
      </>}
      output={<>
        <div className="text-[13px] text-muted mb-1">Future cost in {years} years</div>
        <div className="font-serif text-[34px] text-navy dark:text-ink">{inr(r.futureCost)}</div>
        <div className="mt-4.5 border-t border-[var(--line)] pt-4">
          <Row label="Cost today" value={inr(cost)} />
          <Row label="Increase" value={inr(r.increase)} />
          <Row label="Assumed inflation" value={`${rate}%`} />
        </div>
      </>}
    />
  );
}
