import useDocumentTitle from "../customHooks/useDocumentTitle"

const Home  = () => {
  useDocumentTitle("Home Page")
  return (
    <>
      <div className="home-container mt-3">
        <p>Đây là một ứng dụng để quản lý người dùng được viết bằng <span className="text-primary">ReactJS</span> và sử dụng <span className="text-danger">API</span>.</p>
        <p>Chức năng chính:</p>
        <ol>
          <li>CURD user.</li>
          <li>Export file chứa thông tin user dưới dạng csv.</li>
          <li>Import file chứa thông tin user dưới dạng csv.</li>
          <li>Login/Logout + phân quyền.</li>
        </ol>
      </div>
    </>
  )
}

export default Home