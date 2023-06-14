import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import _, { clone, debounce, initial } from "lodash";
import ModalConfirm from "./ModalConfirm";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
import useDocumentTitle from "../customHooks/useDocumentTitle";

const TableUsers = (props) => {
  useDocumentTitle("Manage Users");

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [filterUsers, setfilterUsers] = useState([]);
  const [userDataExport, setUserDataExport] = useState([]);

  const handleClose = () => {
    setShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  // fetch user

  const getUserData = (data) => {
    setDataUserEdit(data);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
    setIsShowModalDelete(true);
  };

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
    let cloneUsers = _.cloneDeep(users);
    let index = users.findIndex((item) => item.id == user.id);
    cloneUsers[index].first_name = user.first_name;
    setUsers(cloneUsers);
  };

  const handleDeleteUpdateConfirmModal = (id) => {
    let cloneUsers = _.cloneDeep(users).filter((item) => item.id != id);
    setUsers(cloneUsers);
  };

  // sort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneUsers = _.orderBy(_.cloneDeep(users), [sortField], [sortBy]);
    setUsers(cloneUsers);
  };

  // search
  const handleSearch = debounce((event) => {
    let term = event.target.value;
    let cloneUsers = _.cloneDeep(users);
    if (term !== "") {
      setUsers(cloneUsers.filter((item) => item.email.includes(`${term}`)));
    } else {
      getUsers(1);
    }
  }, 300);

  // export data
  const getUsersExport = (event, done) => {
    let results = [["#", "Email", "First Name", "Last name"]];
    if (users && users.length > 0) {
      users.map((item, index) => {
        let arr = [];
        arr[0] = index;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;

        results.push(arr);
      });

      setUserDataExport(results);
      done(true);
    }
  };

  const handleImportCsv = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Only can import csv file!");
        return;
      }

      Papa.parse(file, {
        complete: function (results) {
          let rawCsv = results.data;

          if (rawCsv.length > 0) {
            if (rawCsv[0] && rawCsv[0].length === 3) {
              if (
                rawCsv[0][0] === "email" &&
                rawCsv[0][1] === "first_name" &&
                rawCsv[0][2] === "last_name"
              ) {
                let result = [];
                rawCsv.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                toast.success("Import data success!");
                setUsers((oldData) => [...result, ...oldData]);
              } else {
                toast.error("The header of your file is wrong format!");
              }
            } else {
              toast.error("Your file is wrong format!");
            }
          } else {
            toast.error("Not found csv file!");
          }
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 table-top-header d-sm-flex flex-column flex-sm-row">
        <span>
          <b>List Users</b>
        </span>
        <div className="group-buttons mt-sm-0 mt-2 d-flex flex-row">
          <input
            type="file"
            id="test"
            hidden={true}
            onChange={(event) => handleImportCsv(event)}
          />
          <label className="btn btn-success" htmlFor="test">
            <i className="fa-solid fa-file-arrow-up"></i>
            <span className="mrl-4">Import file</span>
          </label>

          <CSVLink
            data={userDataExport}
            filename={"users.csv"}
            className="btn btn-warning"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i>
            <span className="mrl-4">Export file</span>
          </CSVLink>

          <button
            className="btn btn-primary"
            onClick={() => setShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <span className="mrl-4">Add new</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-4 my-sm-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by email..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="sort-header">
                <span>ID</span>
                <span className="sort-header-icon">
                  <i
                    className="fa fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </th>
              <th>Email</th>
              <th className="sort-header">
                <span>First Name</span>
                <span className="sort-header-icon">
                  <i
                    className="fa fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa fa-arrow-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </th>
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
                    <td className="d-flex flex-column flex-sm-row gap-2 gap-sm-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => getUserData(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      <div className="paginate-bar d-flex justify-content-center justify-content-sm-end mb-4 mt-2 my-md-0">
        <ReactPaginate
          className="pagination mb-0"
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
      </div>
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUpdateFormModal={handleEditUpdateFormModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUpdateConfirmModal={handleDeleteUpdateConfirmModal}
      />
    </>
  );
};

export default TableUsers;
