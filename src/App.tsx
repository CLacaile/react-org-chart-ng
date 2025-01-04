import "./App.css";
import Controls from "./components/Controls";
import SoftShadow from "./components/filters/SoftShadow";
import OrgChart from "./components/OrgChart";

const data = {
  id: 1,
  text: "Jean-Patrick MARTIN",
  firstname: "Jean-Patrick",
  lastname: "MARTIN",
  children: [
    {
      id: 2,
      text: "Guy DRUT",
      firstname: "Guy",
      lastname: "DRUT",
      children: [
        {
          id: 5,
          text: "Fabrice LAURENT",
          firstname: "Fabrice",
          lastname: "LAURENT",
          children: [],
        },
        {
          id: 6,
          text: "Laurent GOUPIX",
          firstname: "Laurent",
          lastname: "GOUPIX",
          children: [],
        },
        {
          id: 7,
          text: "Sylvie TESUS",
          firstname: "Sylvie",
          lastname: "TESUS",
          children: [],
        },
      ],
    },
    {
      id: 3,
      text: "Sophie BETHUNE",
      firstname: "Sophie",
      lastname: "BETHUNE",
      children: [],
    },
    {
      id: 4,
      text: "Marie JURIEN",
      firstname: "Marie",
      lastname: "JURIEN",
      children: [
        {
          id: 8,
          text: "Paul MOUTARDE",
          firstname: "Paul",
          lastname: "MOUTARDE",
          children: [],
        },
        {
          id: 9,
          text: "Laura GRIGNON",
          firstname: "Laura",
          lastname: "GRIGNON",
          children: [],
        },
      ],
    },
  ],
};

function App() {
  console.log("Rendering App");
  return (
    <svg
      className="app-root-svg"
      width="100%"
      height="100%"
      style={{ overflow: "hidden" }}
    >
      <defs id="fonts">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap');
        </style>
      </defs>
      <defs id="filters">
        <SoftShadow />
      </defs>
      <Controls>
        <OrgChart data={data} />
      </Controls>
    </svg>
  );
}

export default App;
