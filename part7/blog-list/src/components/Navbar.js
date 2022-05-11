import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
const Nav = () => {
    return(
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">blogs</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Nav