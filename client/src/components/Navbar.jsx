import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6">Gestion de produits</Typography>
          </Link>
          <div style={{ marginLeft: "auto" }}>
            {localStorage.getItem("token") ? (
              <>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Button color="inherit">Home</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button color="inherit">Login</Button>
                </Link>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
