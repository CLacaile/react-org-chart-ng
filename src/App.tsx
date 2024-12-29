import "./App.css";
import Controls from "./components/Controls";
import OrgChart from "./components/OrgChart";

const data = {
  id: 1,
  text: "Jean-Patrick",
  children: [
    {
      id: 2,
      text: "Guy",
      children: [
        { id: 5, text: "Fabrice", children: [] },
        { id: 6, text: "Laurent", children: [] },
        { id: 7, text: "Sylvie", children: [] },
      ],
    },
    {
      id: 3,
      text: "Sophie",
      children: [],
    },
    {
      id: 4,
      text: "Marie",
      children: [
        { id: 8, text: "Paul", children: [] },
        { id: 9, text: "Laura", children: [] },
      ],
    },
  ],
};

function App() {
  return (
    <svg width="100%" height="100%" style={{ overflow: "hidden" }}>
      <Controls>
        <OrgChart data={data} />
      </Controls>
    </svg>
  );
}

export default App;
