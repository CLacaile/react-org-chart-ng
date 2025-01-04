export interface PersonData {
  id: number;
  firstname: string;
  lastname: string;
  text: string;
  children: PersonData[];
}