import { useLocation } from 'react-router-dom';
import NavegationBar from '../../components/NavBar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { fetchMoveis } from '../../services';
import './index.css';

function HomePage() {
    const location = useLocation();
    const user = location.state.user;

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        async function loadMovies() {
            const moviesData = await fetchMoveis();
            setMovies(moviesData);
        }

        loadMovies();
    }, [])


    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#343a40' }}>
            <NavegationBar user={user} />

            <div className='d-flex flex-column mt-4'>
                <h1 className='d-flex justify-content-center text-light mt-5'>Welcome To The Video Rental Store</h1>
                <h3 className='d-flex justify-content-center text-light mt-1'>Select a movie and add it to your list</h3>

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
                                    onClick={() => console.log("Abrir modal mais detalhado")}
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

        </div>
    );
}

export default HomePage;