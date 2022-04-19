import { ToastContainer, Toast } from 'react-bootstrap';
import { useContext } from 'react'
import { AppContext } from "../../App"

const ErrorToast = () => {
  const { errorToast, setErrorToast, fiveLetters, wordCheck } = useContext(AppContext)

  return (
    <ToastContainer 
      position="top-center"
      className="top-50"
    >
      <Toast 
        onClose={() => setErrorToast(false)} 
        show={errorToast} 
        bg="light"
        className="fw-bold d-flex align-items-center justify-content-center w-auto fs-6"
        delay={2000} 
        autohide
      >
        <Toast.Body 
        >
          {fiveLetters && !wordCheck ? "Not in word list" : "Not enough letters"}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ErrorToast;