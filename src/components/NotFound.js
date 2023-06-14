import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  let navigate = useNavigate();

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>404</Alert.Heading>
        <p>
          Opps! Not found page :(
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => navigate("/")} variant="outline-success">
            Go back to home page
          </Button>
        </div>
      </Alert>
    </>
  )
}

export default NotFound;