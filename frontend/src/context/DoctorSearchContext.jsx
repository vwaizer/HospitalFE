import { createContext, useContext, useEffect, useState } from "react";

const DoctorSearchContext = createContext();

export function useDoctorSearch() {
  return useContext(DoctorSearchContext);
}

export function DoctorSearchProvider({ children }) {
  const [doctorSearch, setDoctorSearch] = useState([]);

  const value = {
    doctorSearch,
    setDoctorSearch,
  }

  return (
    <DoctorSearchContext.Provider value={value}>
      {children}
    </DoctorSearchContext.Provider>
  )
}