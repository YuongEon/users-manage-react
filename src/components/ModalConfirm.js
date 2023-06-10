import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteDeleteUser } from "../services/UserService";
import { toast } from "react-toastify";


const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUpdateConfirmModal } = props;

  const handleDeleteUser =  async() => {
    let res = await deleteDeleteUser(dataUserDelete.id);
    if(res && res.statusCode == 204){
      handleClose();
      toast.success('Delete user success!')
      handleDeleteUpdateConfirmModal(dataUserDelete.id)
    } else {
      handleClose();
      toast.error('Delete user rejected!')
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <h3 className="text-danger">This action can't be undone!</h3>
            <br />
            <p>Do you want to delete this user which email = <b>'{dataUserDelete.email}'</b> ?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
