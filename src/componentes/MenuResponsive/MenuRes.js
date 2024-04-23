import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralCtx } from "../../contextos/GeneralContext";
import { leerVersion } from '../../servicios/ApiLib';
import logo from '../../images/Huella.jpg';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from "@mui/icons-material/Person";

const pages = ['Inicio', 'Administradores', 'Trabajadores', 'Grupos', 'Fichajes'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const MenuRes = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
 
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    const [verMenuAdmin, setverMenuAdmin] = useState(false);

    const { getSession } = useContext(GeneralCtx);
    const [drVariant, setDrVariant] = useState("temporary");
    const [drOpen, setDrOpen] = useState(false);
    const [sesion, setSesion] = useState()
    const [version, setVersion] = useState('0.0.0');
    const consultarVersion = async () => {
        const { data: versionData } = await leerVersion()
        setVersion(versionData.version)
    };
    const handleDrOpen = () => {
        if (drOpen) {
            // ya está abierto y lo cerramos
            setDrVariant("temporary");
            setDrOpen(false);
        } else {
            // no está abierto, lo abrimos
            setDrVariant("permanent");
            setDrOpen(true);
        }
    };

    const handleLoginClick = () => {
        // Navegar a la página de login
        navigate("/");
    };

    useEffect(() => {
        // Comprobación de que hay una sesión activa
        let session = getSession();
        if (!session) navigate("/");
        setSesion(session)
        if (session.usuario.tipo === 'ADMINISTRADOR') setverMenuAdmin(true)
        if (session.usuario.tipo === 'TRABAJADOR') setverMenuAdmin(false)
        consultarVersion();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar alt="Logo" src={logo} sx={{
                        width: 80,
                        height: 80,
                         m: 1,
                        display: {
                            xs: 'none', md: 'flex'},
                        mr: 1 
                    }}/>
                    <Typography variant="h6" component="a"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none' }}>
                        vers.: {version}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Avatar alt="Logo" src={logo} sx={{
                        width: 80,
                        height: 80,
                        m: 1, 
                        display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                       v.: {version}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ 
                        display: 'flex', alignItems: 'right', gap: 1,
                        marginTop: 0
                         }}>
                        <PersonIcon />
                        <Typography 
                        >
                            {sesion ? sesion.usuario.nombre : ""}
                        </Typography>
                            <IconButton
                                sx={{marginTop: 0.1 }}
                                size="small"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleLoginClick}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

