import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles({
    button: {
        '&$focused': {
            color: "#ffffff"
        }
    },
})
const ITEM_HEIGHT = 48;

export default function SimpleMenu({ label, list }) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl)
    if (!list) list = [
        { href: '/', label: 'Займы по пасспорту' },
        { href: '/', label: 'Кредит без поручителей' },
        { href: '/', label: 'Заем без справки о доходах' },
        { href: '/', label: 'Микрокредит без залога' },
        { href: '/', label: 'Микрозайм без расписки' },
        { href: '/', label: 'Кредит для бизнеса' },
        { href: '/', label: 'Краткосрочные займы' },
        { href: '/', label: 'Онлайн кредит наличными без справок' },
        { href: '/', label: 'Онлайн займ без проверок' },
        { href: '/', label: 'Займ онлайн с плохой кредитной историей' },
        { href: '/', label: 'Займы без отказа' },
        { href: '/', label: 'Частный займ без предоплаты' },
        { href: '/', label: 'Онлайн займы с просрочками' },
        { href: '/', label: 'Займы 24 часа' }
    ]
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <Button className={classes.button} color='primary' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {label}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 10,
                        width: 420,
                    },
                }}
            >
            {list.length > 0 && list.map((item, id) => (<MenuItem key={id} onClick={handleClose}>{item.label}</MenuItem>))}
            </Menu>
        </React.Fragment>
    );
}
