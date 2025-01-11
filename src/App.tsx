import "./App.css";
import Controls from "./components/Controls";
import { DepartmentData } from "./types/department";
import RootSvg from "./components/RootSvg";
import { PersonData } from "./types/person";
import Organization from "./components/Organization";

const person1: PersonData = {
  id: 1,
  text: "Jean-Patrick MARTIN",
  firstname: "Jean-Patrick",
  lastname: "MARTIN",
  children: [],
};

const person2: PersonData = {
  id: 2,
  text: "Guy DRUT",
  firstname: "Guy",
  lastname: "DRUT",
  children: [],
};

const person3: PersonData = {
  id: 3,
  text: "Sophie BETHUNE",
  firstname: "Sophie",
  lastname: "BETHUNE",
  children: [],
};

const person4: PersonData = {
  id: 4,
  text: "Marie JURIEN",
  firstname: "Marie",
  lastname: "JURIEN",
  children: [],
};

const person5: PersonData = {
  id: 4,
  text: "Marie JURIEN",
  firstname: "Marie",
  lastname: "JURIEN",
  children: [],
};

const person6: PersonData = {
  id: 6,
  text: "Laurent GOUPIX",
  firstname: "Laurent",
  lastname: "GOUPIX",
  children: [],
};

const person7: PersonData = {
  id: 7,
  text: "Sylvie TESUS",
  firstname: "Sylvie",
  lastname: "TESUS",
  children: [],
};

const person8: PersonData = {
  id: 8,
  text: "Paul MOUTARDE",
  firstname: "Paul",
  lastname: "MOUTARDE",
  children: [],
};

const person9: PersonData = {
  id: 9,
  text: "Laura GRIGNON",
  firstname: "Laura",
  lastname: "GRIGNON",
  children: [],
};

person1.children.push(...[person2, person3, person4]);
person2.children.push(...[person5, person6, person7]);
person4.children.push(...[person8, person9]);

const dept1: DepartmentData = {
  id: 1,
  text: "Département 1",
  teamRootNode: person1,
  children: []
}

const dept2: DepartmentData = {
  id: 2,
  text: "Département 2",
  teamRootNode: person1,
  children: []
}

const dept3: DepartmentData = {
  id: 3,
  text: "Département 3",
  teamRootNode: person1,
  children: []
}

dept1.children.push(...[dept2, dept3])

function App() {
  console.log("Rendering App");
  return (
    <RootSvg>
      <Controls>
        <Organization rootNode={dept1} />
      </Controls>
    </RootSvg>
  );
}

export default App;
