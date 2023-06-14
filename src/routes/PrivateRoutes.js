import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const PrivateRoutes = (props) => {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user || (!user && !user.auth)){
    return (
      <>
        <Alert variant="danger" onClose={() => navigate("/")} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>You don't have permission to access this route</p>
      </Alert>
      </>
    )
  }

  return (
    <>
      {props.children}
    </>
  );
};

export default PrivateRoutes;
