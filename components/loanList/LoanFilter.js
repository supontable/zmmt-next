import './loanFilter.scss'
import { makeStyles } from '@material-ui/core/styles';
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
  Select
} from '@material-ui/core';
import theme from '../../lib/theme'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Sliders from '../common/Sliders';
import useSliders from '../../hooks/useSliders';

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

function RestHelper(props) {
  const text = props.hideRest ? 'Показать доп. парамерты ' : 'Скрыть доп. парамерты'
  return <div className='rest-helper' onClick={props.handleRestHelper}>
    <span>{text}</span>
    {props.hideRest ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
  </div>
}

const GET_EMPLOYMENTS_TYPES = gql`
    query employments {
      employments {
        type
      }
    }
`

export default function LoanFilter({ handleRefetch = () => { }, slidersScope }) {
  console.log('sliderFilter')
  const [sliders] = useSliders()
  const classes = useStyles();
  const [hideRest, setHideRest] = React.useState(false);
  const gateLabel = React.useRef(null);
  const methodLabel = React.useRef(null);
  const employmentLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const [state, setState] = React.useState({
    earlyRepayment: false,
    loanExtension: false,
    paymentGate: 'Visa',
    paymentMethod: 'Visa',
    employment: 'Безработный'
  });

  React.useEffect(() => {
    setLabelWidth({
      ...labelWidth,
      gateLabel: gateLabel.current ? gateLabel.current.offsetWidth : 0,
      methodLabel: methodLabel.current ? methodLabel.current.offsetWidth : 0,
      employmentLabel: employmentLabel.current ? employmentLabel.current.offsetWidth : 0
    });
  }, []);

  const handleSelectChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleChangeCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { loading, error, data } = useQuery(GET_EMPLOYMENTS_TYPES);
  if (loading && !slidersScope) return <React.Fragment>Loading</React.Fragment>

  const employmentTypes = data.employments
  console.log(employmentTypes)
  const slidersProps = {
    scope: { ...slidersScope },
    disableInput: false
  }

  const refetchVars = {
    amountMin_lte: sliders.amount,
    amountMax_gte: sliders.amount,
    termMin_lte: sliders.term,
    termMax_gte: sliders.term
  }

  const handleRest = () => {
    setHideRest(!hideRest)
  }
  return <React.Fragment>
    <h1 className='filter-header1'>Онлайн займ на карту без отказа</h1>
    <h2 className='filter-header2'>Для выбора займа без отказа, воспользуйтесь калькулятором <br /> с максимальным количеством кредитных организаций:</h2>
    <form className='filter-form'>
      <Box p={5} className={classes.box}>
        <div className={'ranges'}>
          <Sliders {...slidersProps} />
        </div>
        <RestHelper handleRestHelper={handleRest} hideRest={hideRest} />
        <div className={hideRest ? 'rest' : 'rest rest_full'}>
          <Grid container spacing={3} justify={'space-evenly'}>
            <Grid xs={12} sm={3} item container>
              <FormGroup className={classes.checkboxGroup}>
                <FormControlLabel
                  control={
                    <Checkbox checked={state.earlyRepayment}
                      onChange={handleChangeCheckbox('earlyRepayment')}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                      checkedIcon={<CheckBoxIcon fontSize="default" />}
                      value="earlyRepayment" />
                  }
                  classes={{ label: 'tiny-label' }}
                  label="Досрочное погашенние"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={state.loanExtension}
                      onChange={handleChangeCheckbox('loanExtension')}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                      checkedIcon={<CheckBoxIcon fontSize="default" />}
                      value="loanExtension" />
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
                  {employmentTypes && employmentTypes.map((item, id) => <option key={id} value={item.type}>{item.type}</option>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={3} item>
              <Box py={1} className={classes.boxRow}>
                <Button size="large" variant="contained" color="primary" onClick={() => handleRefetch({where: {...refetchVars}})}>Подобрать компании</Button>
              </Box>
            </Grid>
          </Grid>
        </div>
        {hideRest &&
          <div className='rest_full'>
            <Grid container item spacing={3}>
              <Grid xs={12} sm={3} item>
                <Box py={1} className={classes.boxRow}>
                  <Button size="large" variant="contained" color="primary" onClick={() => handleRefetch()}>Подобрать компании</Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        }
      </Box>
    </form>
  </React.Fragment>
}