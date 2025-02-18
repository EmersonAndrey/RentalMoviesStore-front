import NavegationBar from '../../components/NavBar';
import { Card, Button, Tooltip, OverlayTrigger, Container, Modal, Row, Col } from 'react-bootstrap';
import { CalendarX, CalendarCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/tmdbAPI';
import { useAppContext } from '../../contexts/AppContext';
import { updateUserWithMovie } from '../../services/user-back';
import { toast } from 'react-toastify';
import './index.css';


function HomePage() {

    const { user, setUser, movies, setMovies } = useAppContext();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState(user.movies || []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadMovies() {
            const moviesData = await fetchMovies();
            setMovies(moviesData);
            window.scrollTo(0, 0);
        }
        loadMovies();
    }, [setMovies]);


    const handleShowModal = (movie) => {
        setSelectedMovie(movie);
        setModalShow(true);
    };

    const toggleFavorite = async (movie) => {
        if (isLoading) return;

        setIsLoading(true);
        const loadingToast = toast.loading("Loading...", { position: "top-center" });


        const updatedFavorites = favoriteMovies.some(fav => fav.id === movie.id)
            ? favoriteMovies.filter(fav => fav.id !== movie.id)
            : [...favoriteMovies, movie];

        setFavoriteMovies(updatedFavorites);

        const updatedUser = {
            ...user,
            movies: updatedFavorites.map(fav => ({ ...fav, user: { id: user.id } }))
        };

        await updateUserWithMovie(updatedUser);

        setUser(updatedUser);

        toast.update(loadingToast, { 
            render: "The film has been added to your list!", 
            type: "success", 
            isLoading: false, 
            autoClose: 3000 
        });

        setIsLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#343a40' }}>
            <NavegationBar
                user={user}
                setMovies={setMovies}
            />

            <div className='d-flex flex-column mt-4'>

                {movies?.length !== 0 && (
                    <div>
                        <h1 className='d-flex justify-content-center text-light mt-5 text-center signika-font'>Welcome To The Video Rental Store</h1>
                        <h3 className='d-flex justify-content-center text-light mt-1 text-center signika-font'>Select a movie and add it to your list</h3>
                    </div>
                )}

                {movies?.length === 0 && (
                    <div className="position-fixed top-50 start-50 translate-middle">
                        <h1 className='text-danger text-center'>
                            No movie found
                        </h1>
                    </div>
                )}
                <div className='d-flex flex-column mt-4'>

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
                                        onClick={() => {
                                            toggleFavorite(selectedMovie);
                                        }}
                                    >
                                        <CalendarX size={35} color="red" />
                                    </Button >
                                )}
                            </OverlayTrigger>
                        </Modal.Footer>
                    </Modal>
                )}

            </div>
        </div>
    );
}

export default HomePage;