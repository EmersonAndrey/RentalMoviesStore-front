import { useLocation } from 'react-router-dom';
import NavegationBar from '../../components/NavBar';
import { Card, Button, Tooltip, OverlayTrigger, Container, Modal, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { fetchMovies, searchMoviesByInput } from '../../services/tmdbAPI';
import { CalendarX, CalendarCheck } from 'lucide-react';
import './index.css';
import { updateUserWithMovie } from '../../services/user';

function HomePage() {

    const location = useLocation();
    const user = location.state.user;

    const [movies, setMovies] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState(user.movies || []);


    useEffect(() => {
        async function loadMovies() {
            const moviesData = await fetchMovies();
            setMovies(moviesData);
        }
        loadMovies();
    }, []);

    const handleShowModal = (movie) => {
        setSelectedMovie(movie);
        setModalShow(true);
    };

    const toggleFavorite = (movie) => {
        const updatedFavorites = favoriteMovies.some(fav => fav.id === movie.id)
            ? favoriteMovies.filter(fav => fav.id !== movie.id)
            : [...favoriteMovies, movie];

        setFavoriteMovies(updatedFavorites);

        const updatedUser = {
            ...user,
            movies: updatedFavorites.map(fav => ({
                ...fav,
                user: { id: user.id }
            }))
        };
        updateUserWithMovie(updatedUser);
    };

    const searchMovie = async (input) => {
        const data = await searchMoviesByInput(input);
        setMovies(data);
    }

    const resetMovies = async () => {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#343a40' }}>
            <NavegationBar
                user={user}
                searchMovie={searchMovie}
                resetMovies={resetMovies} />

            <div className='d-flex flex-column mt-4'>
                <h1 className='d-flex justify-content-center text-light mt-5 text-center'>Welcome To The Video Rental Store</h1>
                <h3 className='d-flex justify-content-center text-light mt-1 text-center'>Select a movie and add it to your list</h3>

                <div className='mt-4'>
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-0">
                        {movies.map((movie, idx) => (
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
                                    {favoriteMovies.some(fav => fav.id === selectedMovie.id) ? '' : 'Add to Favorites'}
                                </Tooltip>
                            }
                        >

                            {favoriteMovies.some(fav => fav.id === selectedMovie.id) ? (
                                <CalendarCheck size={35} color="green" />
                            ) : (
                                <Button
                                    className='bg-transparent p-0'
                                    onClick={() => toggleFavorite(selectedMovie)}
                                >
                                    <CalendarX size={35} color="red" />
                                </Button >

                            )}
                        </OverlayTrigger>

                    </Modal.Footer>
                </Modal>
            )}

        </div>
    );
}

export default HomePage;