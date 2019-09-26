import {
    IconButton,
    AppBar,
    Tabs,
    Tab
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const StyledTabs = withStyles({
    root: {
        backgroundColor: 'transparent',
        minHeight: 'unset',
    },
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
})(props => <Tabs {...props} />);

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        color: '#000000',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        height: 35,
        borderRadius: 30,
        transition: 'background 1s, border-radius 1ms',
        '&:focus': {
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#fff',
            borderRadius: 24,
            backgroundColor: '#6236ff',
        }
    },
}))(props => <Tab {...props} />);

const StyledBar = withStyles(theme => ({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        marginBottom: 32,
    },
}))(props => <AppBar {...props} />);

export default function FastFiler({ handleLinkClick = () => { }, linkList }) {

    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
        handleLinkClick(newValue)
    }
    if (!linkList) return <React.Fragment>Loading</React.Fragment>
    function CustomScrollButtonComponent(props) {
        if (props.direction === 'right') return (
            <IconButton aria-label="right" onClick={props.onClick}>
                <KeyboardArrowRightIcon fontSize="inherit" />
            </IconButton>
        )
        return (
            <IconButton aria-label="left" onClick={props.onClick}>
                <KeyboardArrowLeftIcon fontSize="inherit" />
            </IconButton>
        )
    }
    return (
        <StyledBar position="static" color="default">
            <StyledTabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                ScrollButtonComponent={CustomScrollButtonComponent}
                aria-label="scrollable auto tabs example"
            >
                {linkList.length > 0 && linkList.map((item, id) => {
                    return (
                        <StyledTab label={item.label} key={id} />
                    )
                })}
            </StyledTabs>
        </StyledBar>
    )
}