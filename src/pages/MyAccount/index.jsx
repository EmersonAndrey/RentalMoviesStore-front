import React from 'react'
import NavegationBar from '../../components/NavBar';
import { useAppContext } from '../../contexts/AppContext';
import { CircleUser } from 'lucide-react';
import { Button, Col, Container, Form, Row, Modal } from 'react-bootstrap';
import { updateUserWithNewDatas, deleteUser } from '../../services/user-back';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MyAccount() {


    const navigate = useNavigate();

    const { user, setUser } = useAppContext();
    const [formData, setFormData] = useState({
        name: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
        email: user.email,
        password: user.password
    });

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [hasChanges, setHasChanges] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);


    useEffect(() => {
        const isChanged =
            formData.name !== user.name.split(' ')[0] ||
            formData.lastName !== user.name.split(' ')[1] ||
            formData.email !== user.email ||
            formData.password !== user.password;

        setHasChanges(isChanged);
    }, [formData, user]);


    const handlerChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToast = toast.loading("Loading...", { position: "top-center" });

        const updatedUser = {
            ...user,
            name: formData.name + " " + formData.lastName,
            email: formData.email,
            password: formData.password.trim(),
            movies: user.movies,
        };

        updatedUser.name = updatedUser.name.trim();
        updatedUser.password = updatedUser.password.trim();


        try {
            await updateUserWithNewDatas(updatedUser);
            setUser(updatedUser);

            toast.update(loadingToast, {
                render: "Your account has been updated!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            setError('')
            setDisabled(true);
            setHasChanges(false);

        } catch (err) {

            toast.update(loadingToast, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            setError(err.message);
        }

    }

    const handleEdit = () => {
        if (disabled) {
            setDisabled(false);

        } else if (hasChanges) {
            console.log(formData.name);
            console.log(user.name);
            if (formData.name.trim().length === 0) {
                setError('The name must be provided!');
                return;

            } else if (formData.lastName.trim().length === 0) {
                setError('The last name must be provided!');
                return;

            } else if (formData.password.trim().length === 0) {
                setError('The password must be provided!');
                return;

            } else if (formData.password.length < 8) {
                setError("Password must be at least 8 digits long");
                return;

            } else {
                setIsConfirming(true);
            }


        } else {
            setDisabled(true);
        }

    }

    const handleDeleteAccount = () => {
        setShowModalDelete(true);
    }

    const handleConfirmDelete = async () => {

        const loadingToast = toast.loading("Loading...", { position: "top-center" });
        setShowModalDelete(false);
        //TESTAR SE TA DELETANDOO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        try {
            await deleteUser(user);
            navigate('/register');
            toast.update(loadingToast, {
                render: "Your account has been deleted!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

        } catch (err) {
            toast.update(loadingToast, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }

    }

    const handleCancelDelete = () => {
        setShowModalDelete(false);
    }

    const handleConfirmSaveChanges = () => {
        setIsConfirming(false);
        handleSubmit(new Event('submit'));
    }

    const handleCancelSaveChanges = () => {
        setIsConfirming(false);
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#343a40' }}>
            <NavegationBar
                user={user}
            />

            <div >
                <Container
                    fluid className="d-flex justify-content-center align-items-center text-white flex-column"
                    style={{ height: '100vh', backgroundColor: '#202b34' }}>

                    <h1 className='mb-4 d-flex align-items-center gap-3 mt-4'>
                        <CircleUser color='white' size={60} />
                        <h1>My Account</h1>
                    </h1>

                    <Form
                        onSubmit={handleSubmit}
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            backgroundColor: '#4d5862',
                            padding: '25px',
                            borderRadius: '7px',
                            boxShadow: '3px 3px 6px #7a7e81',
                            marginTop: '20px'
                        }}
                    >
                        <Row className="mb-4">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    name='name'
                                    onChange={handlerChange}
                                    value={formData.name}
                                    disabled={disabled}
                                    className={disabled ? 'bg-secondary border-secondary' : ''} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name='lastName'
                                    onChange={handlerChange}
                                    value={formData.lastName}
                                    disabled={disabled}
                                    className={disabled ? 'bg-secondary border-secondary' : ''} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                placeholder="name@gmail.com"
                                name='email'
                                onChange={handlerChange}
                                value={formData.email}
                                disabled={true}
                                className='bg-secondary border-secondary' />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    onChange={handlerChange}
                                    value={formData.password}
                                    disabled={disabled}
                                    className={disabled ? 'bg-secondary border-secondary' : ''} />
                            </Form.Group>
                        </Row>

                        {error && <p className="text-danger text-center fs-5" >{error}</p>}

                        <footer className='d-flex flex-row justify-content-between mt-6' >
                            <Button variant='danger' onClick={handleDeleteAccount}>
                                Delete Account
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={handleEdit}
                                className={hasChanges ? "bg-primary" : ''}
                            >
                                {disabled ? "Edit" : hasChanges ? "Save Changes" : "Cancel Edit"}
                            </Button>
                        </footer>
                    </Form>
                </Container>
            </div>

            {isConfirming && (
                <Modal show={isConfirming} onHide={handleCancelSaveChanges} centered>
                    <Modal.Header className='d-flex justify-content-center'>
                        <Modal.Title>Confirm Save Changes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to save the changes?</Modal.Body>
                    <Modal.Footer className='d-flex justify-content-around'>
                        <Button onClick={handleCancelSaveChanges} className='bg-danger'>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmSaveChanges} className='bg-primary'>
                            Yes, Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {showModalDelete && (
                <Modal show={showModalDelete} onHide={handleCancelDelete} centered>
                    <Modal.Header className='d-flex justify-content-center'>
                        <Modal.Title>Delete Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
                    <Modal.Footer className='d-flex justify-content-around'>
                        <Button onClick={handleCancelDelete} className='bg-danger'>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} className='bg-primary'>
                            Yes, Delete Account
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default MyAccount;