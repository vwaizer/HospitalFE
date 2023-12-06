import { createContext, useContext, useEffect, useState } from "react";

const PatientSearchContext = createContext();

export function usePatientSearch() {
  return useContext(PatientSearchContext);
}

export function PatientSearchProvider({ children }) {
  const [patientSearch, setPatientSearch] = useState([]);

  const value = {
    patientSearch,
    setPatientSearch,
  }

  return (
    <PatientSearchContext.Provider value={value}>
      {children}
    </PatientSearchContext.Provider>
  )
}