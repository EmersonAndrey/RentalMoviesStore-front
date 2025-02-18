import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser } from '../../services/user-back';
import { useAppContext } from '../../contexts/AppContext';
import { toast, ToastContainer } from "react-toastify";

function RegisterPage() {

    const { setUser } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        checkEmail: '',
        password: '',
        checkPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        console.log(localStorage.getItem("accountDeleted"));
        if(localStorage.getItem("accountDeleted") === 'true'){
            toast.success("Your account has been deleted!", { position: "top-center" });
            console.log('entrou');

            setTimeout(() => {
                localStorage.removeItem("accountDeleted");
            }, 500);
        }
    }, [])



    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        if (formData.email !== formData.checkEmail) {
            setError("Both emails must be the same");
            setLoading(false);
            return;

        } else if (formData.password !== formData.checkPassword) {
            setError("Both passwords must be the same");
            setLoading(false);
            return;

        } else if (formData.password.length < 8) {
            setError("Password must be at least 8 digits long");
            setLoading(false);
            return;

        } else {

            const user = {
                name: formData.name + " " + formData.lastName,
                email: formData.email,
                password: formData.password
            }

            user.name = user.name.trim();
            user.password = user.password.trim();


            try {
                setUser(user);
                await saveUser(user);
                setError('')
                navigate('/login')

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }




    }

    return (
        <Container
            fluid className="d-flex justify-content-center align-items-center text-white flex-column"
            style={{ height: '100vh', backgroundColor: '#202b34' }}>
            <h1 className='mb-4 signika-font'>User Register</h1>
            <Form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: '#4d5862',
                    padding: '25px',
                    borderRadius: '7px',
                    boxShadow: '3px 3px 6px #7a7e81',
                    marginTop: '26px'
                }}
            >
                <Row className="mb-4">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name='name' onChange={handlerChange} value={formData.name} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" name='lastName' onChange={handlerChange} value={formData.lastName} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="name@gmail.com" name='email' onChange={handlerChange} value={formData.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridCheckEmail">
                    <Form.Label>Check Email</Form.Label>
                    <Form.Control placeholder="name@gmail.com" name='checkEmail' onChange={handlerChange} value={formData.checkEmail} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name='password' onChange={handlerChange} value={formData.password} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip" >
                        <Form.Label>Check Password</Form.Label>
                        <Form.Control type='password' name='checkPassword' onChange={handlerChange} value={formData.checkPassword} />
                    </Form.Group>
                </Row>

                {error && <p className="text-danger text-center fs-5" >{error}</p>}

                <footer className='d-flex justify-content-around align-items-center mt-4' >
                    <Link to={"/login"} className='d-flex mt-1 align-self-center'>Is already registered?</Link>

                    <Button variant="primary" type="submit" className='w-25' disabled={loading} >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </footer>
            </Form>
            <ToastContainer/>
        </Container>
    );
}

export default RegisterPage;