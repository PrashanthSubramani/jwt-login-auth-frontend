import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Secret() {
  
  const navigate = useNavigate();

  const [cookies,setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    console.log('useEffect is running');
    console.log(cookies.Jwt);
    const verifyUser = async () => {
      if (!cookies.Jwt) {
        navigate('/login');
      } else {
        try {
          const response = await axios.post("http://localhost:4000", {}, {
            credentials: 'include' // Corrected typo
          });
  
          const { data } = response;
  
          if (!data.status) {
            removeCookie("Jwt");
            navigate('/login');
          } else {
            toast(`Hello ${data.user}`, { theme: "dark" });
          }
        } catch (error) {
          console.error("Error verifying user:", error);
        }
      }
    };
  
    verifyUser();
  }, [cookies, navigate, removeCookie]);


  const logout = ()=>{
    removeCookie('Jwt');
    navigate('/login');
  }

  return (
  <>
      <Navbar className="bg-body-tertiary justify-content-between">
        <h5 className='ms-3'>AUTH LOGIN USING JWT</h5>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Button variant="danger" className='me-4' onClick={logout}><i className="fa fa-sign-out"></i>&nbsp; Logout</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
    <ToastContainer></ToastContainer>
  </>
  )
}
