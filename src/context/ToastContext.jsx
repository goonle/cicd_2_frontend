import React, { createContext, useContext, useState, useCallback } from "react";
import ToastMessage from "../components/ToastMessage";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [showToast, setShowToast] = useState(false);

  const handleToast = useCallback((message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide after 3 seconds
  }, []);

  return (
    <ToastContext.Provider value={{handleToast : handleToast}}>
      {children}
      <ToastMessage message={toastMessage} type={toastType} show={showToast} />
    </ToastContext.Provider>
  );
};