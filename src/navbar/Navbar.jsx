import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Alert,
  createTheme,
  Dialog,
  DialogContentText,
  Menu,
  Stack,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../useAuth/UseAuth";
import { CartContext } from "../context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import "./navbar.scss";
import { useMutation } from "@apollo/client";
import { UPDATE_ROLE_USER } from "../graphql/mutation";


const pages = [
  { name: "Productos", path: "/home" },
  { name: "Blog", path: "/blog" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("ADMIN" || "USER" || "");
  const { logout } = UseAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [updateRole, { data }] = useMutation(UPDATE_ROLE_USER);

  useEffect(() => {
    if (data) {
      localStorage.removeItem("data");
      navigate("/");
    }
  }, [data]);

  const authLocal = localStorage.getItem("data");
  const isAuthenticated = JSON.parse(authLocal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role)
      return toast.error("Completar campos", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });

    try {
      const result = await updateRole({
        variables: {
          updateRoleId: isAuthenticated?.loginUser?.id,
          role: role,
        },
      });

      if (result)
        return toast.success("Excelente, vuelva a iniciar sesión", {
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorElUser(null);
  };
  const settings = [
      <>
        <Button
          sx={{
            borderRadius: 3,
            border: 0,
            color: "black",
            fontSize: 14,
            marginLeft: 1,
          }}
          onClick={handleClickOpen}
        >
          Ajustes
        </Button>
        <Dialog
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          open={open}
          onClose={handleClose}
        >
          <h1 style={{ color: "gray", padding: 8, fontFamily: "monospace" }}>
            Actualizar rol de usuario
          </h1>
          <DialogContentText sx={{ padding: 4, fontFamily: "monospace" }}>
            Por favor ingrese sus datos aquí.
          </DialogContentText>
          <form
            style={{ display: "flex", justifyContent: "center" }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                style={{
                  padding: 8,
                  width: 180,
                  borderRadius: 8,
                  border: 0,
                  backgroundColor: "aliceblue",
                  marginTop: 10,
                }}
                type="role"
                placeholder="Ingrese su rol"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <br />
              <div style={{ padding: 8, marginBottom: 6 }}>
                <button
                  style={{
                    borderRadius: 4,
                    padding: 8,
                    border: 0,
                    marginTop: 4,
                    fontFamily: "monospace",
                    color: "white",
                    backgroundColor: "black",
                  }}
                  onClick={handleClose}
                >
                  Actualizar
                </button>
              </div>
            </div>
            <Toaster />
          </form>
        </Dialog>
        <Toaster />
      </>,
    "CERRAR SESIÓN",
    
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    logout();
    navigate("/");
  };


  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" color="primary" style={{ borderRadius: 2 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div className="div-image-navbar">
              <img
                src="https://static.nike.com/a/images/63f92881-8607-44b9-a4f8-e6b491c23702/white-light-grey-cobalt.png"
                alt="png-sneaker"
              />
            </div>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                padding: 2,
              }}
            >
              SNKRS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {authLocal &&
                pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "monospace",
                      fontSize: 12,
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "#BDBDBD" }}
                      to={page.path}
                    >
                      {page.name}
                    </Link>
                  </Button>
                ))}
            </Box>
            <Box sx={{ flexGrow: 0.1 }}>
              <Link to={"/cart"}>
                <ShoppingCartIcon className="shopping-cart" />
                {cart.length > 0 && (
                  <span
                    style={{
                      color: "black",
                      padding: 1,
                      fontSize: 12,
                      fontWeigth: 10,
                      fontFamily: "monospace",
                    }}
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated && (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        authLocal
                          ? isAuthenticated?.loginUser?.avatar
                          : "/static/images/avatar/2.jpg"
                      }
                    />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  // console.log(setting === 'Cerrar sesión')
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "CERRAR SESIÓN"
                        ? handleCloseUserMenu
                        : null
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;