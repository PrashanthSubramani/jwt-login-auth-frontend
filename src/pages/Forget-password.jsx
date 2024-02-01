import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export default function ForgetPassword() {

    const navigate = useNavigate();

    const [DisableBtn, setDisableBtn] = useState(false);
    const [values, setValues] = useState({
        email:"",
    });

    const generateError = (err)=>
        toast.error(err,{
        position:'top-right',
    })

    const generateSuccess = (res)=>
        toast.success(res,{
            position:'top-right',
        })


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const { data } = await axios.post("https://jwt-login-auth-backend.onrender.com/forget-password",{
                ...values   
            },{
                withCredentials: true
            });

            if(data){
                if(data.errors){
                    const {email} = data.errors;
                    if(email) generateError(email);
                }else{
                    generateSuccess("Email Verification Send");
                    setDisableBtn(true);
                    setTimeout(() => {
                        navigate('/');
                      }, "2000");
                }
            }
        }catch(err){
            console.log(err.message);
        }
    }
  return (
    <div className='container'>
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Col lg={4} sm={12} md={12}>
            <Card className='shadow p-3 mb-5 bg-white rounded-5'>
                <Card.Header><i className="fa fa-envelope"></i>&nbsp;Verify your Email to reset password</Card.Header>
                <Card.Body>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                        <Form.Label>Email Address &nbsp;<span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="email" name="email" required placeholder="Enter email" onChange={(e)=>setValues({...values,[e.target.name]: e.target.value})} />
                    </Form.Group>

                    <Button variant="primary"  disabled={DisableBtn} type="submit" className='w-100 mt-3'>
                        <i className="fa fa-paper-plane"></i>&nbsp;Submit
                    </Button> &nbsp;
                    </Form>
                    <ToastContainer></ToastContainer>
                </Card.Body>
            </Card>
        </Col>
    </div>
</div>
  )
}
