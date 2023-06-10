import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser, putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";


const ModalEdit = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUpdateFormModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  
  const handleEditUser  = async() => {
    let res = await putUpdateUser( dataUserEdit.id, name, job);
    if(res && res.updatedAt){
      handleClose();
      toast.success('Edit user success!');
      handleEditUpdateFormModal({
        first_name: name,
        id: dataUserEdit.id
      })
    } else {
      handleClose();
      toast.error('Edit user rejected!');
    }
  }

  useEffect(() => {
    if(show){
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]) 

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userjob" className="form-label">
                Job
              </label>
              <input
                type="text"
                className="form-control"
                id="userjob"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
