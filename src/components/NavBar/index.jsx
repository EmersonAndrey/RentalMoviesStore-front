import { LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function NavegationBar({ user }) {

  const [userState, setUserState] = useState(user);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();


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
                navigate('/home', { replace: true, state: { user: userState } }, window.scrollTo(0, 0))
              }}
            >
              Home
            </Nav.Link>
            <NavDropdown
              title={<span className='text-light'>{userState.name}</span>}
              id="navbarScrollingDropdown"
              menuVariant='dark'
            >
              <NavDropdown.Item href="#action3" className="text-white">My Account</NavDropdown.Item>
              <NavDropdown.Item href="#action4" className="text-white">Favorites</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to={"/register"} className="text-danger fw-bold d-flex align-items-center gap-2">
                Exit
                <LogOut size={18} />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar >


  );
}

export default NavegationBar;