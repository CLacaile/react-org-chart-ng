import "./App.css";
import OrgChart from "./components/OrgChart";

const data = {
  text: "Jean-Patrick",
  children: [
    {
      text: "Guy",
      children: [
        { text: "Fabrice", children: [] },
        { text: "Laurent", children: [] },
        { text: "Sylvie", children: [] },
      ],
    },
    {
      text: "Sophie",
      children: [
        { text: "Paul", children: [] },
        { text: "Laura", children: [] },
      ]
    },
    {
      text: "Marie",
      children: [
        { text: "Paul", children: [] },
        { text: "Laura", children: [] },
      ],
    },
  ],
};

function App() {
  return (
    <OrgChart data={data} />
  );
}

export default App;
