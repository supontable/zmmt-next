import React from 'react'
import Link from 'next/link'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Logo from "../svg/logo"
import Profile from "../svg/profile"
import Find from "../svg/find"
import Comparison from "../svg/comparison"
//appbar
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { List, Hidden, CssBaseline, Drawer, ListItem, ListItemText, Divider } from '@material-ui/core';
//
import SimpleMenu from './SimpleMenu'
import './header.scss'
const drawerWidth = 290;
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginBottom: 'auto',
        backgroundImage: "url('/static/layout@2x.png'), linear-gradient(to bottom, rgba(0, 0, 0, 0), #6236ff)",
        backgroundBlendMode: 'multiply',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        height: 'calc(100vw*0.499)',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        '&.collapsed': {
            height: 182,
        },
        '@media(max-width: 680px)': {
            height: 'calc(100vh)',
            backgroundSize: 'auto 75%',
            backgroundPositionX: '35%'
        }
    },
    menuButton: {
        color: '#6236ff'
    },
    title: {
        flexGrow: 1,
    },
    header: {
        background: '#fff'
    },
    drawerPaper: {
        width: drawerWidth,
    },
})

const links = [
    { href: '/loan_types', label: 'Вид кредита онлайн' },
    { href: '/payment_gate', label: 'Способ получения' },
    { href: '/payment_accounts', label: 'Способ погащения' },
    { href: '/employee_type', label: 'Тип занятости' },
    { href: '/loan_term', label: 'Срок займа' },
    { href: '/feed', label: 'Ещё' },
    { href: '/contacts', label: '8-800-333-47-88' },
].map(link => {
    link.key = `nav-link-${link.href}`
    return link
})

const Header = (props) => {
    const classes = useStyles()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { container } = props
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <Divider />
                {links.map((link, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={link.label} />
                    </ListItem>
                ))}
                <Divider />
            </List>
        </div>
    );

    return (
        <div className={!props.collapsed ? classes.root : classes.root + ' collapsed'}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Hidden smDown implementation="css">
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
                    <Hidden mdUp implementation="css" className='logo_mobile'><Logo color={'#1e4883'} /></Hidden>
                    <Hidden mdUp implementation="css">
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
                    <Hidden smDown implementation="css" className='fluid'>
                        <nav className="link-nav">
                            <Container maxWidth="lg">
                                <List>
                                    {links.map(({ key, label }) => (
                                        <li key={key}>
                                            <SimpleMenu label={label} />
                                        </li>
                                    ))}
                                </List>
                            </Container>
                        </nav>
                    </Hidden>
                    <Hidden mdUp implementation="css">
                        <IconButton edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Hidden mdUp implementation="css">
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
                >{drawer}
                </Drawer>

            </Hidden>
        </div>
    )
}

export default Header
