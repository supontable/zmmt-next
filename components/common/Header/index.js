import React from 'react'
import Link from 'next/link'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Logo from "../svg/logo"
import Profile from "../svg/profile"
import Find from "../svg/find"
import Comparison from "../svg/comparison"
import theme from "../../../lib/theme"
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//appbar
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Collapse, ListSubheader, List, Hidden, CssBaseline, Drawer, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import SimpleMenu from './SimpleMenu'
import './header.scss'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
const headerQuery = gql`
  query headers {
    headers {
      label
      href
      list
    }
  }
`
const drawerWidth = 290;
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginBottom: 'auto',
        backgroundImage: "url('/static/layout@2x.png'), linear-gradient(to bottom, rgba(0, 0, 0, 0), #6236ff)",
        backgroundBlendMode: 'multiply',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '101% auto',
        height: 'calc(100vw*0.499)',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        maxHeight: 650,
        '&.collapsed': {
            height: 182,
        },
        '@media(max-width: 680px)': {
            '&.collapsed': {
                height: 56,
            },
            height: '100vh',
            backgroundSize: 'auto 70%',
            backgroundPositionX: '35%'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#6236ff',
    },
    title: {
        flexGrow: 1,
    },
    header: {
        background: '#fff',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },

})
const Header = (props) => {
    const { container } = props
    const { loading, error, data } = useQuery(headerQuery);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { headers } = !loading && !error ? data : {headers:[]}
    const classes = useStyles()
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }
    const AsideDrawer = () => {
        const [openState, setOpen] = React.useState();
        React.useEffect(() => {
            setOpen({ ...headers.map(() => false) })
        }, [])
        const handleClick = (index, item) => () => {
            setOpen(state => {
                return ({ ...state, [index]: !state[index.toString()] })
            });
        }

        return (
                <List component="nav"
                    aria-labelledby="nested-list-subheader"
                    >

                    <Divider />
                    {headers && openState && headers.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem button onClick={handleClick(index, item)}>
                                <ListItemText primary={item.label} />
                                {headers.length !== index + 1 && (openState[index.toString()] ? <ExpandLess /> : <ExpandMore />)}
                            </ListItem>
                            <Collapse in={openState[index.toString()]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {headers.length !== index + 1 && item.list.map((sub, _index) => {
                                        return (
                                            <ListItem key={_index} button className={classes.nested}>
                                                <ListItemText primary={sub.label} />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                    <Divider />
                </List>
        )
    };

    return (
        <div className={!props.collapsed ? classes.root : classes.root + ' collapsed'}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Hidden mdDown implementation="css">
                    <Box component="nav" className="user-nav" my={3}>
                        <Logo />
                        <div className='user-nav__links'>
                            <Link href='/'>
                                <a className='user-nav__link'><Find /><span>Поиск</span></a>
                            </Link>
                            <Link href='/'>
                                <a className='user-nav__link'><Profile /><span>Личный кабинет</span></a>
                            </Link>
                            <Link href='/'>
                                <a className='user-nav__link'><Comparison /><span>Сравнить</span></a>
                            </Link>
                        </div>
                    </Box>
                </Hidden>
            </Container>
            <AppBar className={classes.header} position="static">
                <Toolbar className='toolbar' disableGutters>
                    <Hidden lgUp implementation="css" className='logo_mobile'><Logo color={'#1e4883'} /></Hidden>
                    <Hidden lgUp implementation="css">
                        <Box component="nav" className="user-nav user-nav_mobile">
                            <div className='user-nav__links'>
                                <Link href='/'>
                                    <a className='user-nav__link'><Find /></a>
                                </Link>
                                <Link href='/'>
                                    <a className='user-nav__link'><Profile /></a>
                                </Link>
                                <Link href='/'>
                                    <a className='user-nav__link'><Comparison /></a>
                                </Link>
                            </div>
                        </Box>
                    </Hidden>
                    <Hidden mdDown implementation="css" className='fluid'>
                        <nav className="link-nav">
                            <Container maxWidth="lg">
                                <List>
                                    {headers && headers.map((item, key) => (
                                        <li className="link-nav__li" key={Math.random().toString(36).substr(5, 3)}>
                                            {headers.length === key + 1
                                                ? <Button сolor='primary' aria-haspopup="true">
                                                    {item.label}
                                                </Button>
                                                : <SimpleMenu {...item} />}
                                        </li>
                                    ))}
                                </List>
                            </Container>
                        </nav>
                    </Hidden>
                    <Hidden lgUp implementation="css">
                        <IconButton edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Hidden lgUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor='right'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                ><AsideDrawer />
                </Drawer>

            </Hidden>
        </div>
    )
}

export default Header
