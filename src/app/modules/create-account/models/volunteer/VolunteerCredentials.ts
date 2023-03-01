import {VolunteerDataFromCnp} from "./VolunteerDataFromCNP";

export interface VolunteerCredentials {
  email: string;
  cnp : string
  cnpData: VolunteerDataFromCnp;
  password: string;
}
