import useSliders from '../../../hooks/useSliders'
import { StyledSlider } from '../StyledSlider';
import { getNumEnding } from '../../../lib/helpers';
import { makeStyles, withStyles } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday'
import RemoveCircleOutlineIcon from '@material-ui/icons/Remove'
import AddCircleOutlineIcon from '@material-ui/icons/Add'
import {
    Grid,
    Box,
    Button,
    TextField,
    Container
} from '@material-ui/core';

const useStyles = makeStyles({
    sliderControl: {
        transform: 'scale(.8)',
        padding: 0,
        margin: 10,
        height: 24,
        minWidth: 24,
        borderRadius: '50%',
        border: '2px solid currentColor',
        boxSizing: 'content-box',
        boxShadow: '0 5px 5px 0 rgba(98, 54, 255, 0.6)',
        '&:hover': {
            boxShadow: '0px 0px 0px 8px rgba(98, 54, 255, 0.16)',
        },
        '&:active': {
            boxShadow: '0px 0px 0px 8px rgba(98, 54, 255, 0.26)',
        },
        '@media(max-width: 680px)': {
            backgroundColor: '#fff',
            height: 44,
            minWidth: 44,
            border: '3px solid currentColor',
            '& .MuiSvgIcon-root': {
                width: 44,
                height: '100%',
                flexShrink: 'unset'
            }
        }
    }
});
const RangeTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            padding: 12,
            textAlign: "center",
        },
        '& .MuiOutlinedInput-input': {
            fontSize: 26,
            fontWeight: 900,
            height: 20,
            padding: 0,
            textAlign: 'center',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(98, 54, 255, .4)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(98, 54, 255, .6)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(98, 54, 255, .8)',
            },
        },
    },
})(TextField)

export default function Sliders(props) {
    console.log('Sliders')
    const classes = useStyles();
    const { scope, disableInput } = props

    const [sliders, slidersScope, setSlidersContext] = useSliders(scope)
    const { amount, term } = sliders

    const termDate = (new Date()).toLocaleDateString()

    const handleInputChange = (step, min, max) => event => {
        const newValue = event.currentTarget.name === '-'
            ? (parseInt(event.currentTarget.value) - step > min ? parseInt(event.currentTarget.value) - step : min)
            : (parseInt(event.currentTarget.value) - step < max ? parseInt(event.currentTarget.value) + step : max)
        event.currentTarget.slot === 'amount'
            ? setSlidersContext('amount')(!event.target.value ? newValue : Number(event.target.value))
            : setSlidersContext('term')(!event.target.value ? newValue : Number(event.target.value));
    };

    const handleBlur = name => () => {
        if (sliders[name] < sliders[name].min) {
            setSlidersContext(name)(sliders[name].min)
        } else if (sliders[name] > sliders[name].max) {
            setSlidersContext(name)(sliders[name].max);
        }
    };


    return (
        <Container className={props.className + '__ranges'}>
            <Grid container>
                <Grid container spacing={2} justify={'space-evenly'}>
                    <Grid xs item container>
                        <label className={'range-label'}>
                            <span className={'range-label__main'}>
                                Сумма займа
                        </span>
                            <span className={'range-label__additional'}>
                                (от {slidersScope.amount.min} до {slidersScope.amount.max} руб)
                        </span>
                        </label>
                        <Grid item xs={12} container spacing={3} direction='row' wrap='nowrap' alignItems='center'>
                            <Button color="primary" aria-label="remove" className={classes.sliderControl} slot="amount" name="-" value={amount} onClick={handleInputChange(slidersScope.amount.step, slidersScope.amount.min, slidersScope.amount.max)}>
                                <RemoveCircleOutlineIcon />
                            </Button>
                            <StyledSlider
                                value={typeof amount === 'number' ? amount : 0}
                                onChange={setSlidersContext('amount')}
                                aria-labelledby="input-amount-slider"
                                min={slidersScope.amount.min}
                                max={slidersScope.amount.max}
                                step={slidersScope.amount.step}
                            />
                            <Button color="primary" aria-label="add" className={classes.sliderControl} slot="amount" name="+" value={amount} onClick={handleInputChange(slidersScope.amount.step, slidersScope.amount.min, slidersScope.amount.max)}>
                                <AddCircleOutlineIcon />
                            </Button>
                            {disableInput
                                ? <Box mx={3} className='range-helper'>
                                    <span className='amount'>{amount}</span>
                                    <span>руб.</span>
                                </Box>
                                : <Box mx={3} className='range-helper'>
                                    <RangeTextField
                                        value={amount}
                                        margin="dense"
                                        onChange={handleInputChange(slidersScope.amount.step, slidersScope.amount.min, slidersScope.amount.max)}
                                        onBlur={handleBlur('amount')}
                                        variant="outlined"
                                        inputProps={{
                                            slot: "amount",
                                            type: "number",
                                            'aria-labelledby': 'input-amount-slider',
                                        }} />
                                    <span>руб.</span>
                                </Box>
                            }
                        </Grid>
                    </Grid>
                    <Grid xs item container>
                        <label className={'range-label'}>
                            <span className={'range-label__main'}>
                                Срок займа
                        </span>
                            <span className={'range-label__additional'}>
                                (от {slidersScope.term.min} до {slidersScope.term.max} дней)
                        </span>
                            <span className={'range-label__supp'}>
                                <CalendarToday color="primary" style={{ fontSize: 16 }} />
                                {termDate}
                            </span>
                        </label>
                        <Grid xs={12} item container spacing={3} direction='row' wrap='nowrap' alignItems='center'>
                            <Button color="primary" aria-label="remove" className={classes.sliderControl} slot="term" name="-" value={term} onClick={handleInputChange(slidersScope.term.step, slidersScope.term.min, slidersScope.term.max)}>
                                <RemoveCircleOutlineIcon />
                            </Button>
                            <StyledSlider
                                value={typeof term === 'number' ? term : 0}
                                onChange={setSlidersContext('term')}
                                aria-labelledby="input-term-slider"
                                min={slidersScope.term.min} max={slidersScope.term.max}
                                step={slidersScope.term.step}
                            />
                            <Button color="primary" aria-label="add" className={classes.sliderControl} slot="term" name="+" value={term} onClick={handleInputChange(slidersScope.term.step, slidersScope.term.min, slidersScope.term.max)}>
                                <AddCircleOutlineIcon />
                            </Button>
                            {disableInput
                                ? <Box mx={3} className='range-helper'>
                                    <span className='term'>{term}</span>
                                    <span>{getNumEnding(term, ['день', 'дня', 'дней'])}</span>
                                </Box>
                                : <Box mx={3} className='range-helper'>
                                    <RangeTextField
                                        value={term}
                                        margin="dense"
                                        onChange={handleInputChange(slidersScope.term.step, slidersScope.term.min, slidersScope.term.max)}
                                        onBlur={handleBlur('term')}
                                        variant="outlined"
                                        inputProps={{
                                            slot: "term",
                                            type: "number",
                                            'aria-labelledby': 'input-term-slider',
                                        }} />
                                    <span>{getNumEnding(term, ['день', 'дня', 'дней'])}</span>
                                </Box>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}