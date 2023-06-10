import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import _ from 'lodash';
import ModalConfirm from "./ModalConfirm";

const TableUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  const handleClose = () => {
    setShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false)
  };

  // fetch user

  const getUserData = (data) => {
    setDataUserEdit(data);
    setIsShowModalEdit(true);
  }

  const handleDeleteUser = (user) => {
    setDataUserDelete(user)
    setIsShowModalDelete(true);
  }

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };


  // paginate
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
    //  Thêm dấu '+' ở đầu để convert sang kiểu number
  };


  // update table
  const handleUpdateTable = (user) => {
    setUsers([user, ...users]);
  };

  const handleEditUpdateFormModal = (user) => {
    let cloneUsers = _.cloneDeep(users)
    let index = users.findIndex(item => item.id == user.id);
    cloneUsers[index].first_name = user.first_name;
    setUsers(cloneUsers);
  }

  const handleDeleteUpdateConfirmModal = (id) => {
    let cloneUsers = _.cloneDeep(users).filter(item => item.id != id)
    setUsers(cloneUsers);
  }

  return (
    <>
      <div className="my-3 table-top-header">
        <span>
          <b>List Users</b>
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setShowModalAddNew(true)}
        >
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => getUserData(item)}>Edit</button>
                    <button className="btn btn-danger mx-3" onClick={() => handleDeleteUser(item)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable}/>
      <ModalEdit show={isShowModalEdit} dataUserEdit={dataUserEdit} handleClose={handleClose} handleEditUpdateFormModal={handleEditUpdateFormModal}/>
      <ModalConfirm show={isShowModalDelete} handleClose={handleClose} dataUserDelete={dataUserDelete} handleDeleteUpdateConfirmModal={handleDeleteUpdateConfirmModal}/>
    </>
  );
};

export default TableUsers;
