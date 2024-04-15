import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import { GeneralCtx } from "../../contextos/GeneralContext";
import React, { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Home } from "@mui/icons-material";
import { Grid, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import Drawer from "@mui/material/Drawer";
import { leerVersion } from '../../servicios/ApiLib';
import logo from '../../images/Huella.jpg';
import Avatar from '@mui/material/Avatar';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const drawerWidth = 230;
export const MenuLateral = (props) => {
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
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AppBar
                        position="fixed"
                        sx={{
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            height: 90,
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleDrOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Avatar alt="Logo" src={logo} sx={{
                                width: 80,
                                height: 80, m: 1
                            }} />
                            <Typography variant="h6" component="div"
                                sx={{ flexGrow: 1 }}>
                                vers.: {version}
                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <PersonIcon />
                                <Typography ml={1}>
                                    {sesion ? sesion.usuario.nombre : ""}
                                </Typography>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                title="cerrar sesión"
                                onClick={handleLoginClick}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant={drVariant}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: drawerWidth,
                                boxSizing: "border-box",
                            },
                        }}
                        open={drOpen}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: "auto" }} mt={3}>
                            {verMenuAdmin ? (
                                <List>
                                    <ListItem
                                        key="Inicio"
                                        disablePadding
                                        onClick={() => {
                                            navigate("/inicio");
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Home />
                                            </ListItemIcon>
                                            <ListItemText> Inicio </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem
                                        key="Administradores"
                                        disablePadding
                                        onClick={() => {
                                            navigate("/administradores");
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <SupervisorAccountIcon />
                                            </ListItemIcon>
                                            <ListItemText> Administradores </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem
                                        key="trabajadores"
                                        disablePadding
                                        onClick={() => {
                                            navigate("/trabajadores");
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <EngineeringIcon />
                                            </ListItemIcon>
                                            <ListItemText> Trabajadores </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem
                                        key="grupos"
                                        disablePadding
                                        onClick={() => {
                                            navigate("/grupos");
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <GroupsIcon />
                                            </ListItemIcon>
                                            <ListItemText> Grupos </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem
                                        key="fichajes"
                                        disablePadding
                                        onClick={() => {
                                            navigate("/fichajes");
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccessTimeIcon />
                                            </ListItemIcon>
                                            <ListItemText> Fichajes </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            ) : (
                                <List>
                                    <ListItem
                                        key="fichajes"
                                        disablePadding
                                        onClick={() => {
                                            navigate("/fichajes");
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccessTimeIcon />
                                            </ListItemIcon>
                                            <ListItemText> Fichajes </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            )}

                        </Box>
                    </Drawer>
                </Grid>
                <Grid item xs={12}>
                    <Box component="main" sx={{ flexGrow: 1, p: 5 }} marginTop={5}>
                        {props.children}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
