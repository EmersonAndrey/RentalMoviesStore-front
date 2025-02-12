import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser } from '../../services/user';

function RegisterPage() {

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
            <h1 className='mb-4'>User Register</h1>
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

                <footer className='d-flex flex-column align-items-center mt-4' >
                    <Button variant="primary" type="submit" className='w-25' disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>

                    <Link to={"/login"} className='mt-3'>Is already registered?</Link>
                </footer>
            </Form>
        </Container>
    );
}

export default RegisterPage;