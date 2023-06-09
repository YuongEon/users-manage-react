import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";


const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  

  const handleSaveUser = async() => {
    let res = await postCreateUser(name, job);
    if(res && res.id && res.name && res.job){
      handleClose();
      setName('');
      setJob('');
      toast.success('Add user success!');
      handleUpdateTable({
        id: res.id,
        first_name: name
      })
    } else {
      handleClose();
      setName('');
      setJob('');
      toast.error('Add user rejected!');
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
