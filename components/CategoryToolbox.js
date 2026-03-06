import { useMemo, useState } from "react";
import Link from "next/link";

const safetyChecks = [
  "Hallways are clear of loose rugs and cords",
  "Bathroom has a non-slip mat and support bar",
  "Bedroom has easy access to phone and light",
  "Stairs and entryways are well lit",
  "Frequently used items are stored at waist height"
];

const visitPrepItems = [
  "Top symptoms changed in the last 3 months",
  "Medication and supplement list is updated",
  "Recent specialist and emergency visits are listed",
  "Main care goals are written in plain language"
];

function PlannerList({ title, prompt, placeholder, items, onAdd }) {
  const [value, setValue] = useState("");

  function submit(event) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    onAdd(trimmed);
    setValue("");
  }

  return (
    <div className="tool-widget stack">
      <h4>{title}</h4>
      <p className="small-note">{prompt}</p>
      <form className="tool-form-row" onSubmit={submit}>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <button type="submit">Add</button>
      </form>
      <ol className="tool-list-lines">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

function VeteransVisitPlanner() {
  const [selected, setSelected] = useState([
    "What is the top priority before my next appointment?"
  ]);

  const baseQuestions = [
    "What documents should I bring next time?",
    "Which office should I contact if this changes?",
    "What action should happen before the next visit?"
  ];

  function toggle(question) {
    setSelected((current) =>
      current.includes(question)
        ? current.filter((item) => item !== question)
        : [...current, question]
    );
  }

  return (
    <div className="tool-widget stack">
      <h4>VA visit question planner</h4>
      <div className="checklist-grid">
        {baseQuestions.map((question) => (
          <label key={question} className="check-row">
            <input
              type="checkbox"
              checked={selected.includes(question)}
              onChange={() => toggle(question)}
            />
            {question}
          </label>
        ))}
      </div>
      <PlannerList
        title="Add your own question"
        prompt="Keep questions short so staff can answer each one clearly."
        placeholder="Type a question"
        items={selected}
        onAdd={(question) => setSelected((current) => [...current, question])}
      />
    </div>
  );
}

function VeteransRecordsTracker() {
  const [contact, setContact] = useState("");
  const [claim, setClaim] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [entries, setEntries] = useState([]);

  function addEntry(event) {
    event.preventDefault();
    if (!contact.trim() || !claim.trim()) {
      return;
    }

    setEntries((current) => [
      ...current,
      {
        contact: contact.trim(),
        claim: claim.trim(),
        followUpDate: followUpDate || "No date"
      }
    ]);

    setContact("");
    setClaim("");
    setFollowUpDate("");
  }

  return (
    <div className="tool-widget stack">
      <h4>Benefit records tracker</h4>
      <form className="tool-inline-grid" onSubmit={addEntry}>
        <label>
          Contact
          <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="VA office or rep" />
        </label>
        <label>
          Claim or topic
          <input value={claim} onChange={(event) => setClaim(event.target.value)} placeholder="Benefit claim #" />
        </label>
        <label>
          Follow-up date
          <input type="date" value={followUpDate} onChange={(event) => setFollowUpDate(event.target.value)} />
        </label>
        <button type="submit">Add record</button>
      </form>
      <ul className="tool-list-lines">
        {entries.map((entry, index) => (
          <li key={`${entry.contact}-${entry.claim}-${index}`}>
            {entry.contact} | {entry.claim} | Follow up: {entry.followUpDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EssentialSpendingTool() {
  const [income, setIncome] = useState(3200);
  const [housing, setHousing] = useState(1200);
  const [food, setFood] = useState(500);
  const [medications, setMedications] = useState(280);
  const [utilities, setUtilities] = useState(250);

  const totals = useMemo(() => {
    const essentialTotal = housing + food + medications + utilities;
    const remaining = income - essentialTotal;
    const essentialShare = income > 0 ? Math.round((essentialTotal / income) * 100) : 0;

    return { essentialTotal, remaining, essentialShare };
  }, [food, housing, income, medications, utilities]);

  return (
    <div className="tool-widget stack">
      <h4>Essential-spending split tool</h4>
      <div className="tool-inline-grid compact">
        <label>
          Monthly income
          <input type="number" min="0" value={income} onChange={(event) => setIncome(Number(event.target.value || 0))} />
        </label>
        <label>
          Housing
          <input type="number" min="0" value={housing} onChange={(event) => setHousing(Number(event.target.value || 0))} />
        </label>
        <label>
          Food
          <input type="number" min="0" value={food} onChange={(event) => setFood(Number(event.target.value || 0))} />
        </label>
        <label>
          Medications
          <input
            type="number"
            min="0"
            value={medications}
            onChange={(event) => setMedications(Number(event.target.value || 0))}
          />
        </label>
        <label>
          Utilities
          <input type="number" min="0" value={utilities} onChange={(event) => setUtilities(Number(event.target.value || 0))} />
        </label>
      </div>
      <p className="tool-output">
        Essential total: <strong>${totals.essentialTotal}</strong> ({totals.essentialShare}% of income). Remaining: <strong>${totals.remaining}</strong>
      </p>
    </div>
  );
}

function NegotiationStarter() {
  const [billType, setBillType] = useState("medical bill");
  const [hardshipReason, setHardshipReason] = useState("a fixed retirement income");

  const script = `Hello, I am calling about a ${billType}. I want to stay current, but I am managing ${hardshipReason}. Can we set up a hardship plan or temporary reduced payment today?`;

  return (
    <div className="tool-widget stack">
      <h4>Bill negotiation starter</h4>
      <div className="tool-inline-grid compact">
        <label>
          Bill type
          <select value={billType} onChange={(event) => setBillType(event.target.value)}>
            <option value="medical bill">Medical bill</option>
            <option value="credit card bill">Credit card bill</option>
            <option value="utility bill">Utility bill</option>
            <option value="insurance premium">Insurance premium</option>
          </select>
        </label>
        <label>
          Main hardship
          <select value={hardshipReason} onChange={(event) => setHardshipReason(event.target.value)}>
            <option value="a fixed retirement income">Fixed retirement income</option>
            <option value="a recent medical expense">Recent medical expense</option>
            <option value="supporting a family caregiver">Supporting a family caregiver</option>
            <option value="temporary loss of household income">Temporary household income loss</option>
          </select>
        </label>
      </div>
      <textarea readOnly value={script} rows={4} aria-label="Negotiation script" />
    </div>
  );
}

function HomeSafetyScan() {
  const [checks, setChecks] = useState({});

  function toggle(item) {
    setChecks((current) => ({ ...current, [item]: !current[item] }));
  }

  const completeCount = safetyChecks.filter((item) => checks[item]).length;

  return (
    <div className="tool-widget stack">
      <h4>Home safety quick scan</h4>
      <p className="small-note">Complete items this week: {completeCount} / {safetyChecks.length}</p>
      <div className="checklist-grid">
        {safetyChecks.map((item) => (
          <label key={item} className="check-row">
            <input type="checkbox" checked={Boolean(checks[item])} onChange={() => toggle(item)} />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

function RecoveryScheduler() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    event.preventDefault();
    if (!task.trim()) {
      return;
    }

    setTasks((current) => [...current, { task: task.trim(), date: date || "No date set" }]);
    setTask("");
    setDate("");
  }

  return (
    <div className="tool-widget stack">
      <h4>Recovery support scheduler</h4>
      <form className="tool-form-row" onSubmit={addTask}>
        <input
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Ride, meal, pickup, or check-in"
          aria-label="Recovery support task"
        />
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Task date" />
        <button type="submit">Add task</button>
      </form>
      <ul className="tool-list-lines">
        {tasks.map((entry, index) => (
          <li key={`${entry.task}-${index}`}>
            {entry.task} | {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisitPrepChecklist() {
  const [checks, setChecks] = useState({});
  const [goal, setGoal] = useState("");

  function toggle(item) {
    setChecks((current) => ({ ...current, [item]: !current[item] }));
  }

  const selected = visitPrepItems.filter((item) => checks[item]);

  return (
    <div className="tool-widget stack">
      <h4>Visit prep checklist</h4>
      <div className="checklist-grid">
        {visitPrepItems.map((item) => (
          <label key={item} className="check-row">
            <input type="checkbox" checked={Boolean(checks[item])} onChange={() => toggle(item)} />
            {item}
          </label>
        ))}
      </div>
      <label>
        Main goal for this visit
        <input value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Example: improve sleep and balance" />
      </label>
      <p className="tool-output">
        Ready items: <strong>{selected.length}</strong>. Goal: <strong>{goal || "Not set"}</strong>
      </p>
    </div>
  );
}

function MedicationTracker() {
  const [name, setName] = useState("");
  const [change, setChange] = useState("");
  const [effect, setEffect] = useState("");
  const [entries, setEntries] = useState([]);

  function addEntry(event) {
    event.preventDefault();
    if (!name.trim() || !change.trim()) {
      return;
    }

    setEntries((current) => [
      ...current,
      {
        name: name.trim(),
        change: change.trim(),
        effect: effect.trim() || "No effect noted"
      }
    ]);

    setName("");
    setChange("");
    setEffect("");
  }

  return (
    <div className="tool-widget stack">
      <h4>Medication change tracker</h4>
      <form className="tool-inline-grid" onSubmit={addEntry}>
        <label>
          Medication
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Medication name" />
        </label>
        <label>
          Change
          <input value={change} onChange={(event) => setChange(event.target.value)} placeholder="Dose or schedule update" />
        </label>
        <label>
          Side effects
          <input value={effect} onChange={(event) => setEffect(event.target.value)} placeholder="Optional" />
        </label>
        <button type="submit">Add change</button>
      </form>
      <ul className="tool-list-lines">
        {entries.map((entry, index) => (
          <li key={`${entry.name}-${entry.change}-${index}`}>
            {entry.name}: {entry.change} | {entry.effect}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TreatmentQuestionList() {
  const [questions, setQuestions] = useState([
    "What is the treatment goal for this phase?"
  ]);

  return (
    <PlannerList
      title="Treatment question list"
      prompt="Bring this list to each visit and check off what was answered."
      placeholder="Add a treatment question"
      items={questions}
      onAdd={(question) => setQuestions((current) => [...current, question])}
    />
  );
}

function CaregiverUpdateTemplate() {
  const [weekFocus, setWeekFocus] = useState("Stabilize energy and appetite");
  const [wins, setWins] = useState("Completed all scheduled visits");
  const [needs, setNeeds] = useState("Need help with rides next week");

  const message = `Weekly update:\nFocus: ${weekFocus}\nProgress: ${wins}\nSupport needed: ${needs}`;

  return (
    <div className="tool-widget stack">
      <h4>Caregiver update template</h4>
      <div className="tool-inline-grid compact">
        <label>
          Week focus
          <input value={weekFocus} onChange={(event) => setWeekFocus(event.target.value)} />
        </label>
        <label>
          Progress
          <input value={wins} onChange={(event) => setWins(event.target.value)} />
        </label>
        <label>
          Support needed
          <input value={needs} onChange={(event) => setNeeds(event.target.value)} />
        </label>
      </div>
      <textarea readOnly value={message} rows={5} aria-label="Caregiver update message" />
    </div>
  );
}

function renderToolWidget(category, index) {
  if (category === "veterans" && index === 0) {
    return <VeteransVisitPlanner />;
  }

  if (category === "veterans" && index === 1) {
    return <VeteransRecordsTracker />;
  }

  if (category === "sudden-expenses" && index === 0) {
    return <EssentialSpendingTool />;
  }

  if (category === "sudden-expenses" && index === 1) {
    return <NegotiationStarter />;
  }

  if (category === "injuries" && index === 0) {
    return <HomeSafetyScan />;
  }

  if (category === "injuries" && index === 1) {
    return <RecoveryScheduler />;
  }

  if (category === "health" && index === 0) {
    return <VisitPrepChecklist />;
  }

  if (category === "health" && index === 1) {
    return <MedicationTracker />;
  }

  if (category === "cancer" && index === 0) {
    return <TreatmentQuestionList />;
  }

  if (category === "cancer" && index === 1) {
    return <CaregiverUpdateTemplate />;
  }

  return null;
}

export default function CategoryToolbox({ category, tools = [] }) {
  return (
    <div className="tool-list">
      {tools.map((tool, index) => (
        <article key={tool.title} className="tool-item stack">
          <h3>{tool.title}</h3>
          <p>{tool.description}</p>
          {renderToolWidget(category, index)}
          {tool.href ? (
            <p className="small-note">
              Related guide: <Link href={tool.href}>Open article</Link>
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
