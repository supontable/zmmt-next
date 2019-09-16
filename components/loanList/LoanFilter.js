import './loanFilter.scss'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  OutlinedInput,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  Select
} from '@material-ui/core';
import theme from '../../lib/theme'
import CalendarToday from '@material-ui/icons/CalendarToday'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import RemoveCircleOutlineIcon from '@material-ui/icons/Remove'
import AddCircleOutlineIcon from '@material-ui/icons/Add'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { getNumEnding } from '../../lib/helpers';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { StyledSlider } from '../common/StyledSlider';

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
  checkboxGroup: {
    color: '#6236ff',
    '.MuiFormControl-root + &': {
      maxHeight: 220
    },
    '& .MuiCheckbox-root': {
      color: '#6236ff',
    },
    '& .tiny-label': {
      fontSize: 14,
      whiteSpace: 'nowrap',
    }
  },
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

function RestHelper(props) {
  const text = props.hideRest ? 'Показать доп. парамерты ' : 'Скрыть доп. парамерты'
  return <div className='rest-helper' onClick={props.handleRestHelper}>
    <span>{text}</span>
    {props.hideRest ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
  </div>
}
const filtersQuery = gql`
  query loanfilters {
    loanfilters {
      sliders
    }
  }
`
export default function ({ handleSliderChange = () => { } }) {
  const classes = useStyles();
  const [hideRest, setHideRest] = React.useState(false);
  const gateLabel = React.useRef(null);
  const methodLabel = React.useRef(null);
  const employmentLabel = React.useRef(null);


  const [amount, setAmount] = React.useState(30000);
  const [term, setTerm] = React.useState(30);


  const [labelWidth, setLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    paymentGate: 'Visa',
    paymentMethod: 'Visa',
    employment: 'Безработный'
  });

  const [date, changeDate] = React.useState(new Date())
  const termDate = date.toLocaleDateString()

  React.useEffect(() => {
    handleSliderChange({ amount, term })
  }, [amount, term])

  React.useEffect(() => {
    setLabelWidth({
      ...labelWidth,
      gateLabel: gateLabel.current ? gateLabel.current.offsetWidth : 0,
      methodLabel: methodLabel.current ? methodLabel.current.offsetWidth : 0,
      employmentLabel: employmentLabel.current ? employmentLabel.current.offsetWidth : 0
    });
  }, [labelWidth]);

  const handleSelectChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleChangeCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

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

  const { loading, error, data } = useQuery(filtersQuery);
  if (loading) return <React.Fragment>Loading</React.Fragment>
  const sliders = !loading && !error ? data.loanfilters[0].sliders : {}

  const handleTermBlur = () => {
    if (term < (sliders.term.min)) {
      setTerm((sliders.term.min));
    } else if (term > (sliders.term.max)) {
      setTerm((sliders.term.max));
    }
  };

  const handleAmountBlur = () => {
    if (amount < (sliders.amount.min)) {
      setAmount((sliders.amount.min));
    } else if (amount > (sliders.amount.max)) {
      setAmount((sliders.amount.max));
    }
  };

  const handleRest = () => {
    setHideRest(!hideRest)
  }
  return <React.Fragment>
    <h1 className='filter-header1'>Онлайн займ на карту без отказа</h1>
    <h2 className='filter-header2'>Для выбора займа без отказа, воспользуйтесь калькулятором <br /> с максимальным количеством кредитных организаций:</h2>
    <form className='filter-form'>
      <Box p={5} className={classes.box}>
        <div className={'ranges'}>
          <Grid container spacing={3} justify={'space-evenly'}>
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
                  <RangeTextField
                    value={amount}
                    margin="dense"
                    onChange={handleInputChange(sliders.amount.step, sliders.amount.min, sliders.amount.max)}
                    onBlur={handleAmountBlur}
                    variant="outlined"
                    inputProps={{
                      slot: "amount",
                      type: "number",
                      'aria-labelledby': 'input-amount-slider',
                    }} />
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
                  <RangeTextField
                    value={term}
                    margin="dense"
                    onChange={handleInputChange(sliders.term.step, sliders.term.min, sliders.term.max)}
                    onBlur={handleTermBlur}
                    variant="outlined"
                    inputProps={{
                      slot: "term",
                      type: "number",
                      'aria-labelledby': 'input-term-slider',
                    }} />
                  <span>{getNumEnding(term, ['день', 'дня', 'дней'])}</span>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <RestHelper handleRestHelper={handleRest} hideRest={hideRest} />
        <div className={hideRest ? 'rest' : 'rest rest_full'}>
          <Grid container spacing={3} justify={'space-evenly'}>
            <Grid xs={12} sm={3} item container>
              <FormGroup className={classes.checkboxGroup}>
                <FormControlLabel
                  control={
                    <Checkbox checked={state.checkedA}
                      onChange={handleChangeCheckbox('checkedA')}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                      checkedIcon={<CheckBoxIcon fontSize="default" />}
                      value="checkedA" />
                  }
                  classes={{ label: 'tiny-label' }}
                  label="Досрочное погашенние"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={state.checkedB}
                      onChange={handleChangeCheckbox('checkedB')}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                      checkedIcon={<CheckBoxIcon fontSize="default" />}
                      value="checkedB" />
                  }
                  classes={{ label: 'tiny-label' }}
                  label="Продление кредита"
                />
              </FormGroup>
            </Grid>
            <Grid xs item container alignItems="flex-end">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={gateLabel} htmlFor="outlined-payment-gate-native-simple">
                  Способ получения
                 </InputLabel>
                <Select
                  native
                  value={state.paymentGate}
                  onChange={handleSelectChange('paymentGate')}
                  input={
                    <OutlinedInput name="paymentGate" labelWidth={labelWidth.gateLabel} id="outlined-payment-gate-native-simple" />
                  }
                >
                  <option value="" />
                  <option value={'Visa'}>Visa</option>
                  <option value={'MasterCard'}>MasterCard</option>
                  <option value={'MIR'}>MIR</option>
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={methodLabel} htmlFor="outlined-payment-gate-native-simple">
                  Способ погашения
                 </InputLabel>
                <Select
                  native
                  value={state.paymentMethod}
                  onChange={handleSelectChange('paymentMethod')}
                  input={
                    <OutlinedInput name="paymentMethod" labelWidth={labelWidth.methodLabel} id="outlined-payment-method-native-simple" />
                  }
                >
                  <option value="" />
                  <option value={'Visa'}>Visa</option>
                  <option value={'MasterCard'}>MasterCard</option>
                  <option value={'MIR'}>MIR</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={employmentLabel} htmlFor="outlined-payment-gate-native-simple">
                  Тип занятности
                 </InputLabel>
                <Select
                  native
                  value={state.employment}
                  onChange={handleSelectChange('employment')}
                  input={
                    <OutlinedInput name="employment" labelWidth={labelWidth.employmentLabel} id="outlined-employment-native-simple" />
                  }
                >
                  <option value="" />
                  <option value={'Безработный'}>Безработный</option>
                  <option value={'Частная фирма'}>Частная фирма</option>
                  <option value={'На пенсии'}>На пенсии</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={3} item>
              <Box py={1} className={classes.boxRow}>
                <Button size="large" variant="contained" color="primary" >Подобрать компании</Button>
              </Box>
            </Grid>
          </Grid>
        </div>
        {hideRest &&
          <div className='rest_full'>
            <Grid container item spacing={3}>
              <Grid xs={12} sm={3} item>
                <Box py={1} className={classes.boxRow}>
                  <Button size="large" variant="contained" color="primary" >Подобрать компании</Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        }
      </Box>
    </form>
  </React.Fragment>
}