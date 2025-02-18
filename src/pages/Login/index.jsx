import { useState } from 'react';
import { Button, Col, Container, Form, Row, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../../services/user-back';
import { useAppContext } from '../../contexts/AppContext';


function LoginPage() {

    const { setUser } = useAppContext();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => {
        setShow(false);
        setError('');
        setFormData({
            email: '',
            password: '',
        });
    }

    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }


    const handlerEmailModalChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email.trim()) {
            setError("The email must be provided");
            setLoading(false);
            return;
        }

        if (!formData.password.trim()) {
            setError("The password must be provided");
            setLoading(false);
            return;
        }

        try {
            const user = await getUserByEmail(formData.email);

            if (!user || !user.password) {
                setError("User not found or invalid user data");
                setLoading(false);
                return;
            }

            if (formData.password !== String(user.password)) {
                setError("The password is incorrect");
                setLoading(false);
                return;
            }

            setError('');
            setUser(user);
            navigate('/home', { state: { user } });
        } catch (err) {
            setError("An error occurred. Please try again.");
        }

        setLoading(false);
    };





    const handlerSubmitModal = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.email.trim()) {
            setError("The email must be provided");
            setLoading(false);
            return;
        }

        try {
            const user = await getUserByEmail(formData.email);

            if (!user || !user.password) {
                setError("User not found");
                setLoading(false);
                return;
            }

            setFormData((prev) => ({
                ...prev, password: user.password
            }));

        } catch (err) {
            setError("Error retrieving password");
        }

        setLoading(false);
    };


    return (
        <Container
            fluid className="d-flex justify-content-center align-items-center text-white flex-column "
            style={{ height: '100vh', backgroundColor: '#202b34' }}>
            <h1 className='mb-4'>User Login</h1>
            <Form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: '#4d5862',
                    padding: '40px',
                    borderRadius: '7px',
                    boxShadow: '3px 3px 6px #7a7e81',
                    marginBottom: '95px'
                }}
            >

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder="name@gmail.com" name='email' onChange={handlerChange} value={formData.email} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name='password' onChange={handlerChange} value={formData.password} />
                    </Form.Group>
                </Row>

                {error && <p className="text-danger text-center fs-5" >{error}</p>}

                <footer className='d-flex justify-content-between' >
                    <Button variant="link" onClick={() => {
                        setShow(true);
                        setError('');
                        setFormData({ email: '', password: '' });
                    }}>Forgot your password?</Button>

                    <Button variant="primary" type="submit" className='w-25' disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>

                    <Modal show={show} onHide={handleClose} centered
                        className='no-border' backdropClassName='opacity-70'>
                        <Modal.Header className='bg-dark text-light'>
                            <Modal.Title>Use your email</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='bg-dark text-light'>
                            <Form onSubmit={handlerSubmitModal}>
                                <Form.Group className="mb-3 text-start" controlId="exampleForm.ControlInput1">
                                    <Form.Label >Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        autoFocus
                                        name='email'
                                        onChange={handlerEmailModalChange}
                                        value={formData.email || ""}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className='bg-dark flex-column'>

                            {error && <p className="text-danger text-center fs-5 flex-column" >{error}</p>}

                            {formData.password && <p className="text-danger text-center fs-5 flex-column" >Your password is: {formData.password}</p>}

                            <div className='d-flex justify-content-between w-100 mt-3'>
                                <Button className='bg-danger' onClick={() => {
                                    handleClose();
                                    setError('');
                                    setLoading(false);
                                    setFormData({ email: '', password: '' });
                                }}>
                                    Close
                                </Button>
                                <Button className='bg-primary' disabled={loading} onClick={(e) => {
                                    handlerSubmitModal(e);
                                }}>

                                    {loading ? "Submitting..." : "Check"}
                                </Button>
                            </div>

                        </Modal.Footer>
                    </Modal>
                </footer>
            </Form>
        </Container>
    );
}

export default LoginPage;