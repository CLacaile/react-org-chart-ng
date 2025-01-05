import "./App.css";
import Controls from "./components/Controls";
import Department from "./components/Department";
import { DepartmentData } from "./types/department";
import RootSvg from "./components/RootSvg";

const deptAData: DepartmentData = {
  id: 1,
  text: "Département A",
  tree: {
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
  }
};

function App() {
  console.log("Rendering App");
  return (
    <RootSvg>
      <Controls>
        <Department data={deptAData} />
      </Controls>
    </RootSvg>
  );
}

export default App;
