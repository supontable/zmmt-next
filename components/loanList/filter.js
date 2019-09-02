import './loanFilter.scss'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Slider,
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

function StyledSlider(props) {
  useSliderStyles()
  return <Slider {...props} />
}

function RestHelper(props) {
  const text = props.hideRest ? 'Показать доп. парамерты ' : 'Скрыть доп. парамерты'
  return <div className='rest-helper' onClick={props.handleRestHelper}>
    <span>{text}</span>
    {props.hideRest ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
  </div>
}

export default function () {
  const classes = useStyles();
  const [hideRest, setHideRest] = React.useState(false);
  const [amount, setAmount] = React.useState(30);
  const [term, setTerm] = React.useState(30);
  const gateLabel = React.useRef(null);
  const methodLabel = React.useRef(null);
  const employmentLabel = React.useRef(null);

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
    setLabelWidth({
      ...labelWidth,
      gateLabel: gateLabel.current.offsetWidth,
      methodLabel: methodLabel.current.offsetWidth,
      employmentLabel: employmentLabel.current.offsetWidth
    });
  }, []);

  React.useEffect(() => {
    changeDate(date => {
      date.setTime((new Date()).getTime() + term * 86400 * 1000)
      return date
    })
  }, [term])

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

  const handleInputChange = event => {
    const newValue = event.currentTarget.name === '-'
      ? parseInt(event.currentTarget.value) - 1
      : parseInt(event.currentTarget.value) + 1
    console.log('1')
    event.currentTarget.slot === 'amount'
      ? setAmount(!event.target.value ? newValue : Number(event.target.value))
      : setTerm(!event.target.value ? newValue : Number(event.target.value));
  };


  const handleTermSliderChange = (event, newValue) => {
    setTerm(newValue);
  };

  const handleTermBlur = () => {
    if (term < 0) {
      setTerm(0);
    } else if (term > 100) {
      setTerm(100);
    }
  };

  const handleAmountBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > 100) {
      setAmount(100);
    }
  };

  const handleRest = () => {
    setHideRest(!hideRest)
  }


  return (
    <React.Fragment>
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
                    (от 3000 до 98 000 руб)
                      </span>
                </label>
                <Grid item xs={12} container spacing={3} direction='row' wrap='nowrap' alignItems='center'>
                  <Button color="primary" aria-label="remove" className={classes.Button} slot="amount" name="-" value={amount} onClick={handleInputChange}>
                    <RemoveCircleOutlineIcon />
                  </Button>
                  <StyledSlider
                    value={typeof amount === 'number' ? amount : 0}
                    onChange={handleAmountSliderChange}
                    aria-labelledby="input-amount-slider"
                  />
                  <Button color="primary" aria-label="add" className={classes.Button} slot="amount" name="+" value={amount} onClick={handleInputChange}>
                    <AddCircleOutlineIcon />
                  </Button>
                  <Box mx={3} className='range-helper'>
                    <RangeTextField
                      value={amount}
                      margin="dense"
                      onChange={handleInputChange}
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
                    (от 3 до 365 дней)
                      </span>
                  <span className={'range-label__supp'}>
                    <CalendarToday color="primary" style={{ fontSize: 16 }} />
                    {termDate}
                  </span>
                </label>
                <Grid xs={12} item container spacing={3} direction='row' wrap='nowrap' alignItems='center'>
                  <Button color="primary" aria-label="remove" className={classes.Button} slot="term" name="-" value={term} onClick={handleInputChange}>
                    <RemoveCircleOutlineIcon />
                  </Button>
                  <Slider
                    value={typeof term === 'number' ? term : 0}
                    onChange={handleTermSliderChange}
                    aria-labelledby="input-term-slider"
                  />
                  <Button color="primary" aria-label="add" className={classes.Button} slot="term" name="+" value={term} onClick={handleInputChange}>
                    <AddCircleOutlineIcon />
                  </Button>
                  <Box mx={3} className='range-helper'>
                    <RangeTextField
                      value={term}
                      margin="dense"
                      onChange={handleInputChange}
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
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={state.checkedA}
                        onChange={handleChangeCheckbox('checkedA')}
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
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
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        value="checkedB" />
                    }
                    classes={{ label: 'tiny-label' }}
                    label="Продление (пролонгация) кредита"
                  />
                </FormGroup>
              </Grid>
              <Grid xs item container>
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
        </Box>
      </form>
    </React.Fragment>
  )
}