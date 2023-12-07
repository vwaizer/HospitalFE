import { createContext, useContext, useEffect, useState } from "react";

const PatientInfoContext = createContext();

export function usePatient() {
    return useContext(PatientInfoContext);
}

export function PatientInfoProvider({ children }) {
    const [patientInfo, setPatientInfo] = useState({
        patientID: '',
        patientFName: '',
        patientLName: '',
        patientPhoneNumber: '',
        patientAddress: '',
        patientGender: '',
        patientBirthDate: '',
        patientIpCode: '',
        patientOpCode: '',
        doctorID: '',
    });

    const value = {
        patientInfo,
        setPatientInfo,
    }

    return (
        <PatientInfoContext.Provider value={value}>
            {children}
        </PatientInfoContext.Provider>
    )
}