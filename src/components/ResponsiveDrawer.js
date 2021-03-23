/* eslint-disable */ 
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Home from './Home'
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { Project } from './Project';
import { Exam } from './Exam';
import { Book } from './Book';
import { Job } from './Job';
import { Todo } from './Todo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState({});

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleLogout = () => {
        console.log('logout')
        setUser({});
    }
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
                    <ListItem button key='home'>

                        <ListItemText primary='Home' />

                    </ListItem>
                </Link>
                {Object.keys(user).length > 0 ?

                    <Link to="/" style={{ textDecoration: "none", color: "gray" }} onClick={(e) => handleLogout(e)}>
                        <ListItem button key='logout' >

                            <ListItemText primary='Logout' />

                        </ListItem>
                    </Link>
                    :
                    <Link to="/login" style={{ textDecoration: "none", color: "gray" }}>
                        <ListItem button key='login'>

                            <ListItemText primary='Login' />

                        </ListItem>
                    </Link>

                }
            </List>
            <Divider />

            <List>
                <Link to="/dashboard" style={{ textDecoration: "none", color: "gray" }}>
                    <ListItem button key='dashboard'>

                        <ListItemText primary='Dashboard' />

                    </ListItem>
                </Link>
                <Link to="/project" style={{ textDecoration: "none", color: "gray" }}>
                    <ListItem button key='project'>

                        <ListItemText primary='Project Tracking' />

                    </ListItem>
                </Link>
                <Link to="/book" style={{ textDecoration: "none", color: "gray" }}>
                    <ListItem button key='book'>

                        <ListItemText primary='Book Tracking' />

                    </ListItem>
                </Link>
                <Link to="/exam" style={{ textDecoration: "none", color: "gray" }}>
                    <ListItem button key='exam'>

                        <ListItemText primary='Exam Tracking' />
                    </ListItem>
                </Link>
                <Link to="/job" style={{ textDecoration: "none", color: "gray" }}>
                    <ListItem button key='job'>

                        <ListItemText primary='Job Application Tracking' />
                    </ListItem>
                </Link>
                <Link to="/todo" style={{ textDecoration: "none", color: "gray" }}>
                    <ListItem button key='todo'>

                        <ListItemText primary='Todo - Task Management' />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {Object.keys(user).length > 0 ? 'Welcome ' + user.user.username + '(' + user.user.email + ')' : 'Welcome to Dashboard App'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <BrowserRouter >
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Route path='/' exact component={Home} />
                    <Route path='/login' component={() => <Login setUser={setUser} />} />
                    <Route path='/dashboard' component={() => <Dashboard user={user} />} />
                    <Route path='/project' component={() => <Project user={user} />} />
                    <Route path='/exam' component={() => <Exam user={user} />} />
                    <Route path='/book' component={() => <Book user={user} />} />
                    <Route path='/job' component={() => <Job user={user} />} />
                    <Route path='/todo' component={() => <Todo user={user} />} />
                </main>
            </BrowserRouter>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
