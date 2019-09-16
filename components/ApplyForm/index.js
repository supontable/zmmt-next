import {
    Grid,
    Box,
    Container,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../lib/theme'

import { StyledSlider } from '../common/StyledSlider';
import RemoveCircleOutlineIcon from '@material-ui/icons/Remove'
import CalendarToday from '@material-ui/icons/CalendarToday'
import AddCircleOutlineIcon from '@material-ui/icons/Add'
import { getNumEnding } from '../../lib/helpers';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import FormFields from './FormFields'
import './styles.scss'

const useStyles = makeStyles({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        flex: 1,
        '@media(max-width: 680px)': {
            minWidth: 240,
        }
    },
    box: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        '@media(max-width: 680px)': {
            padding: 24
        }
    },
    boxRow: {
        height: '100%',
        display: 'flex',
        paddingTop: 16,
        '@media(max-width: 680px)': {
            margin: 8,
            '& button': {
                width: '100%',
                padding: '14px 24px',
                textTransform: 'unset',
                fontWeight: 'normal',
                fontSize: '16px',
            }
        }
    },
    Button: {
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
    },
});
const filtersQuery = gql`
  query loanfilters {
    loanfilters {
      sliders
    }
  }
`

const ApplyForm = ({ handleSliderChange = () => { } }) => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(filtersQuery);
    const [amount, setAmount] = React.useState(30000);
    const [term, setTerm] = React.useState(30);

    const [date, changeDate] = React.useState(new Date())
    const termDate = date.toLocaleDateString()

    const sliders = (!loading && !error) ? data.loanfilters[0].sliders : {}

    const handleAmountSliderChange = (event, newValue) => {
        setAmount(newValue);
    };

    const handleTermSliderChange = (event, newValue) => {
        setTerm(newValue);
    };
    const handleInputChange = (step, min, max) => event => {
        const newValue = event.currentTarget.name === '-'
            ? (parseInt(event.currentTarget.value) - step > min ? parseInt(event.currentTarget.value) - step : min)
            : (parseInt(event.currentTarget.value) - step < max ? parseInt(event.currentTarget.value) + step : max)
        event.currentTarget.slot === 'amount'
            ? setAmount(!event.target.value ? newValue : Number(event.target.value))
            : setTerm(!event.target.value ? newValue : Number(event.target.value));
    };

    React.useEffect(() => {
        handleSliderChange({ amount, term })
    }, [amount, term])

    if (loading) return <React.Fragment>Loading</React.Fragment>
    return (
        <div className='apply-form'>
            <section className='apply-form__header'>
                <h2 className='apply-form__header-label'>Подать заявку на микрозайм</h2>
                <p className='apply-form__header-info'>Внимание! Все поля в форме являются обязательными к заполнению.</p>
            </section>
            <form className={classes.container} noValidate autoComplete="off">
                <Container className={'apply-form__ranges'}>
                    <Grid container>
                        <Grid container spacing={2} justify={'space-evenly'}>
                            <Grid xs item container>
                                <label className={'range-label'}>
                                    <span className={'range-label__main'}>
                                        Сумма займа
                                    </span>
                                    <span className={'range-label__additional'}>
                                        (от {sliders.amount.min} до {sliders.amount.max} руб)
                                    </span>
                                </label>
                                <Grid item xs={12} container spacing={3} direction='row' wrap='nowrap' alignItems='center'>
                                    <Button color="primary" aria-label="remove" className={classes.Button} slot="amount" name="-" value={amount} onClick={handleInputChange(sliders.amount.step, sliders.amount.min, sliders.amount.max)}>
                                        <RemoveCircleOutlineIcon />
                                    </Button>
                                    <StyledSlider
                                        value={typeof amount === 'number' ? amount : 0}
                                        onChange={handleAmountSliderChange}
                                        aria-labelledby="input-amount-slider"
                                        min={sliders.amount.min}
                                        max={sliders.amount.max}
                                        step={sliders.amount.step}
                                    />
                                    <Button color="primary" aria-label="add" className={classes.Button} slot="amount" name="+" value={amount} onClick={handleInputChange(sliders.amount.step, sliders.amount.min, sliders.amount.max)}>
                                        <AddCircleOutlineIcon />
                                    </Button>
                                    <Box mx={3} className='range-helper'>
                                        <span className='amount'>{amount}</span>
                                        <span>руб.</span>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid xs item container>
                                <label className={'range-label'}>
                                    <span className={'range-label__main'}>
                                        Срок займа
                                    </span>
                                    <span className={'range-label__additional'}>
                                        (от {sliders.term.min} до {sliders.term.max} дней)
                                    </span>
                                    <span className={'range-label__supp'}>
                                        <CalendarToday color="primary" style={{ fontSize: 16 }} />
                                        {termDate}
                                    </span>
                                </label>
                                <Grid xs={12} item container spacing={3} direction='row' wrap='nowrap' alignItems='center'>
                                    <Button color="primary" aria-label="remove" className={classes.Button} slot="term" name="-" value={term} onClick={handleInputChange(sliders.term.step, sliders.term.min, sliders.term.max)}>
                                        <RemoveCircleOutlineIcon />
                                    </Button>
                                    <StyledSlider
                                        value={typeof term === 'number' ? term : 0}
                                        onChange={handleTermSliderChange}
                                        aria-labelledby="input-term-slider"
                                        min={sliders.term.min} max={sliders.term.max}
                                        step={sliders.term.step}
                                    />
                                    <Button color="primary" aria-label="add" className={classes.Button} slot="term" name="+" value={term} onClick={handleInputChange(sliders.term.step, sliders.term.min, sliders.term.max)}>
                                        <AddCircleOutlineIcon />
                                    </Button>
                                    <Box mx={3} className='range-helper'>
                                        <span className='term'>{term}</span>
                                        <span>{getNumEnding(term, ['день', 'дня', 'дней'])}</span>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <FormFields />
            </form>
        </div>
    )
}
export default ApplyForm