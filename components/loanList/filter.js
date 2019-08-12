import './loanFilter.scss'
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Slider,
  Input,
  OutlinedInput,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select
} from '@material-ui/core';
import theme from '../../lib/theme'
import CalendarToday from '@material-ui/icons/CalendarToday'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flex: 1,
  },
  box: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
  boxRow: {
    height: '100%',
    display: 'flex',
  }
});


export default function () {
  const classes = useStyles();
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
  React.useEffect(() => {
    setLabelWidth({
      ...labelWidth,
      gateLabel: gateLabel.current.offsetWidth,
      methodLabel: methodLabel.current.offsetWidth,
      employmentLabel: employmentLabel.current.offsetWidth
    });
  }, []);
  const handleSelectChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const handleAmountSliderChange = (event, newValue) => {
    setAmount(newValue);
  };
  const handleChangeCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };


  const handleAmountInputChange = event => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleAmountBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > 100) {
      setAmount(100);
    }
  };

  const handleTermSliderChange = (event, newValue) => {
    setTerm(newValue);
  };

  const handleTermInputChange = event => {
    setTerm(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleTermBlur = () => {
    if (term < 0) {
      setTerm(0);
    } else if (term > 100) {
      setTerm(100);
    }
  };
  const date = new Date()
  date.setDate(date.getDate() + term)
  const termDate = date.toLocaleDateString()
  return (
    <React.Fragment>
      <h1>Онлайн займ на карту без отказа</h1>
      <h2>Для выбора займа без отказа, воспользуйтесь калькулятором <br /> с максимальным количеством кредитных организаций:</h2>
      <form className='filter-form'>
        <Box p={5} className={classes.box}>
          <div className={'ranges'}>
            <Grid container spacing={3} justify={'space-evenly'}>
              <Grid xs item container>
                <Grid xs={12} item>
                  <label className={'range-label'}>
                    <span className={'range-label__main'}>
                      Сумма займа
                      </span>
                    <span className={'range-label__additional'}>
                      (от 3000 до 98 000 руб)
                      </span>
                  </label>
                </Grid>
                <Grid item xs={10}>
                  <Slider
                    value={typeof amount === 'number' ? amount : 0}
                    onChange={handleAmountSliderChange}
                    aria-labelledby="input-amount-slider"
                  />
                </Grid>
                <Grid xs={2} item>
                  <Box ml={3}>
                    <Input
                      className={classes.input}
                      value={amount}
                      margin="dense"
                      onChange={handleAmountInputChange}
                      onBlur={handleAmountBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-amount-slider',
                      }} />
                  </Box>
                </Grid>
              </Grid>
              <Grid xs item container>
                <Grid xs={12} item>
                  <label className={'range-label'}>
                    <span className={'range-label__main'}>
                      срок займа
                      </span>
                    <span className={'range-label__additional'}>
                      (от 3 до 365 дней)
                      </span>
                    <span className={'range-label__supp'}>
                      <CalendarToday color="primary" style={{ fontSize: 16 }} />
                      {termDate}
                    </span>
                  </label>
                </Grid>
                <Grid xs={10} item>
                  <Slider
                    value={typeof term === 'number' ? term : 0}
                    onChange={handleTermSliderChange}
                    aria-labelledby="input-term-slider"
                  />
                </Grid>
                <Grid xs={2} item>
                  <Box ml={3}>
                    <Input
                      className={classes.input}
                      value={term}
                      margin="dense"
                      onChange={handleTermInputChange}
                      onBlur={handleTermBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-term-slider',
                      }} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={'rest'}>
            <Grid container spacing={3} justify={'space-evenly'}>
              <Grid xs={3} item container>
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
              <Grid xs={3} item>
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