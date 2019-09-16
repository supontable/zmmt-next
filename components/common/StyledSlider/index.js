import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
const useSliderStyles = makeStyles({
    root: {
        color: '#6236ff',
        height: 8,
        '@media(max-width: 680px)': {
            display: 'none',
        }
    },
    thumb: {
        height: 24,
        width: 24,
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        boxShadow: '0 5px 5px 0 rgba(98, 54, 255, 0.6)',
        "&::after": {
            content: "''",
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '4px solid white',
            marginLeft: 2
        },
        "&::before": {
            content: "''",
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderRight: '4px solid white',
            marginRight: 2
        }
    },
    track: {
        opacity: .7,
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
}, { name: 'MuiSlider' });
export function StyledSlider(props) {
    useSliderStyles()
    return <Slider {...props} />
}