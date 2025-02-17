import React from 'react'
import NavegationBar from '../../components/NavBar'
import { useEffect, useState } from 'react';
import { Card, Button, Tooltip, OverlayTrigger, Container, Modal, Row, Col } from 'react-bootstrap';
import { CalendarCheck } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { updateUserWithMovie } from '../../services/user-back';
import { toast } from 'react-toastify';

function Favorites() {

    const { user, setUser } = useAppContext();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState(user.movies || []);

    useEffect(() => {
        if (user.movies) {
            setFavoriteMovies(user.movies);
            window.scrollTo(0, 0);
        }

    }, [user.movies, setFavoriteMovies]);


    const handleShowModal = (movie) => {
        setSelectedMovie(movie);
        setModalShow(true);
    };

    const toggleNotFavorite = (movie) => {

        const updatedFavorites = favoriteMovies.filter(fav => fav.id !== movie.id);

        setFavoriteMovies(updatedFavorites);

        const updatedUser = {
            ...user,
            movies: updatedFavorites.map(fav => ({
                ...fav,
                user: { id: user.id }
            }))
        };

        updateUserWithMovie(updatedUser);
        setUser(updatedUser);
    };

    const notifyRemove = () => {
        toast.success("The film has been removed from your list!", {
            position: "top-right",
            autoClose: 3000
        });
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#343a40' }}>
            <NavegationBar
                user={user}
            />

            <div className='d-flex flex-column mt-4'>

                <div>
                    {favoriteMovies?.length !== 0 && (
                        <h1 className=' d-flex justify-content-center text-light mt-5 text-center'>Your favorites List</h1>
                    )}
                </div>

                {favoriteMovies?.length === 0 && (
                    <div className="position-fixed top-50 start-50 translate-middle">
                        <h1 className='text-danger'>
                            No films added to the list yet!
                        </h1>
                    </div>
                )}

                <div className='mt-4'>
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-0">
                        {favoriteMovies.map((movie, idx) => (
                            <Col key={idx}>
                                <Card
                                    className='card-hover'
                                    style={{
                                        maxWidth: '200px',
                                        margin: '0 auto',
                                        marginTop: '30px',
                                        maxHeight: '500px',
                                        backgroundColor: '#404242',
                                        color: '#ffffff'
                                    }}
                                    onClick={() => handleShowModal(movie)}
                                >

                                    <Card.Img
                                        variant="top"
                                        alt="Capa do Filme"
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    />
                                    <Card.Body style={{ maxHeight: '150px', overflow: 'hidden' }}>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {movie.overview}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {selectedMovie && (
                <Modal show={modalShow} onHide={() => setModalShow(false)} centered size='lg'>
                    <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <Container>
                            <Row className="align-items-center">
                                <Col xs={12} md={4} className="text-center">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                                        alt="Capa do Filme"
                                        className="modal-image"
                                    />
                                </Col>

                                <Col xs={12} md={8} className='d-flex flex-column mb-4'>
                                    <h2 className="modal-title">{selectedMovie.title}</h2>
                                    <p className="modal-overview mt-5">{selectedMovie.overview}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <Button onClick={() => setModalShow(false)}>Close</Button>

                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="tooltip-favorite">
                                    {favoriteMovies.some(fav => fav.id === selectedMovie.id) ? 'Remove from favorites' : ''}
                                </Tooltip>
                            }
                        >

                            <Button
                                className='bg-transparent p-0'
                                onClick={() => {
                                    toggleNotFavorite(selectedMovie);
                                    setModalShow(false);
                                    notifyRemove();
                                }}>

                                <CalendarCheck size={35} color="green" />

                            </Button >

                        </OverlayTrigger>

                    </Modal.Footer>
                </Modal>
            )}

        </div>

    )
}

export default Favorites