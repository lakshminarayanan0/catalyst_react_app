import { useEffect, useState} from "react";
import AdminPage from "./components/Admin/AdminPage";
import Header from "./components/Header";
import UserPage from "./components/User/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUserId } from "./app store/slices/userSlice";
import { BrowserRouter as Router } from "react-router-dom";
import { fetchProducts } from "./app store/slices/productSlice";
import { Container, Spinner } from "react-bootstrap";
import { fetchOrders } from "./app store/slices/orderSlice";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [isLoading,setLoading]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(loginUser());
      await dispatch(fetchProducts());
      if (currentUser.role !== "App Administrator") {
        await dispatch(fetchOrders());
      }
      setLoading(false);
    };
  
    fetchData();
  }, [dispatch]);

  const loginUser = () => dispatch => 
  {
    console.log("checks users login");
    const userManagement = window.catalyst.userManagement;
    const currentUserPromise = userManagement.getCurrentProjectUser();
  
    currentUserPromise
      .then(response => 
      {
        if (response.code === 700) 
        {
          const redirectUrl = '/__catalyst/auth/login';
          window.location.href = redirectUrl;
        } 
        else 
        {
          const userId = response.content.user_id;
          dispatch(getUserByUserId(userId));
  
        }
      })
      .catch(err => 
      {
        console.log(err);
        const redirectUrl = '/__catalyst/auth/login';
        window.location.href = redirectUrl;
      });
  };


  return (
    <div className="App">
     {isLoading ? 
     (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{postion:"absolute",top:0,left:0,width:"100%",height:"100vh"}}>
      <Spinner animation="border" role="status">
      <span className="visually-hidden">...Loding</span>
      </Spinner>
    </Container>
     )
     :
     (
      <Router>
        <Header/>
        {currentUser.userId && currentUser.role === "App Administrator" ? (
          <AdminPage />
        ) : (
          <UserPage currentUser={currentUser} />
        )}
      </Router>
     )}
      
    </div>
  );
}

export default App;
