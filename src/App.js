import Container from "react-bootstrap/Container";
import "./App.scss";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes/>
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
