import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { fetchMovies, searchMoviesByInput } from '../../services/tmdbAPI';
import { useAppContext } from '../../contexts/AppContext';
import 'react-toastify/dist/ReactToastify.css';


function NavegationBar() {

  const navigate = useNavigate();

  const { user, setMovies } = useAppContext();
  const [input, setInput] = useState('');

  const notifyError = () => {
    toast.error("Enter a value into the input to search!", {
      position: "top-right",
      autoClose: 3000
    });
  }


  const searchMovie = async (input) => {
    const data = await searchMoviesByInput(input);
    setMovies(data);
  }

  const resetMovies = async () => {
    const moviesData = await fetchMovies();
    setMovies(moviesData);
  }

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className='fixed-top'>
      <Container fluid>
        <Navbar.Brand><h3>Video Rental Store</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link
              className='text-light'
              onClick={() => {
                navigate(
                  '/home',
                  { replace: true, state: { user: user } }
                );
                window.scrollTo(0, 0);
                resetMovies();
                setInput('');
              }}
            >
              Home
            </Nav.Link>
            <NavDropdown
              title={<span className='text-light'>{user.name}</span>}
              id="navbarScrollingDropdown"
              menuVariant='dark'
            >
              <NavDropdown.Item href="#action3" className="text-white" as={NavLink} to={"/myAccount"}>My Account</NavDropdown.Item>
              <NavDropdown.Item
                as="div"
                role='button'
                onClick={() => {
                  navigate('/favorites');
                  setInput('');
                  window.scrollTo(0, 0);
                }}>
                Favorites

              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                as={NavLink}
                to={"/register"}
                className="text-danger fw-bold d-flex align-items-center gap-2"
                onClick={() => {
                  localStorage.removeItem("user");
                }}>
                Exit
                <LogOut size={18} />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex" onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={input}
              onChange={(e) => { setInput(e.target.value) }}
            />
            <Button variant="outline-success" onClick={() => {
              if (input.trim().length === 0) {
                notifyError();

              } else {
                searchMovie(input);
              }
            }}>Search</Button>
            <ToastContainer />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar >


  );
}

export default NavegationBar;