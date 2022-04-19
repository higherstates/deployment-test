import { ToastContainer, Toast } from 'react-bootstrap';
import { useContext } from 'react'
import { AppContext } from "../../App"

const CopyToast = () => {
  const { copyToast, setCopyToast } = useContext(AppContext)

  return (
    <ToastContainer 
      position="top-center"
      className="top-0"
    >
      <Toast 
        onClose={() => setCopyToast(false)} 
        show={copyToast} 
        style={{ backgroundColor: "#c9b458"}}
        className="fw-bold d-flex align-items-center justify-content-center w-auto fs-2"
        delay={1500} 
        autohide
      >
        <Toast.Body>
          Result copied
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CopyToast;
