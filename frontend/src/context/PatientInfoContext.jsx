import { createContext, useContext, useEffect, useState } from "react";

const PatientInfoContext = createContext();

export function usePatient() {
    return useContext(PatientInfoContext);
}

export function PatientInfoProvider({ children }) {
    const [patientID, setPatientID] = useState(0);
    const value = {
        patientID,
        setPatientID,
    }

    return (
        <PatientInfoContext.Provider value={value}>
            {children}
        </PatientInfoContext.Provider>
    )
}