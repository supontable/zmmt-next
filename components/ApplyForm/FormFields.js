import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../lib/theme'
import {
    FormGroup,
    TextField,
    Radio,
    FormControlLabel,
    RadioGroup,
    Grid,
    Button,
    Checkbox,
    Container
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
const useStyles = makeStyles({
    button: {
        marginBottom: 24,
        backgroundColor: '#6236ff',
        color: '#fff',
        padding: 0,
        margin: 10,
        height: 80,
        minWidth: 600,
        boxShadow: '0 5px 5px 0 rgba(98, 54, 255, 0.6)',
        '&:hover': {
            boxShadow: '0px 0px 0px 8px rgba(98, 54, 255, 0.16)',
            backgroundColor: '#6222ff'
        },
        '&:active': {
            boxShadow: '0px 0px 0px 8px rgba(98, 54, 255, 0.26)',
        },
        '@media(max-width: 680px)': {
        }
    },
    label: {
        maxWidth: 600,
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)'
    },
    personal: {
        marginBottom: 24,
        width: 600,
        paddingLeft: 30,
        fontSize: 12,
        '& a': {
            textDecoration: 'underline',
            color: '#6236ff'
        }
    }
});
const formFieldsQuery = gql`
query formfields {
  formfields {
      id,
    name,
    type,
    placeholder,
    mask,
    errorsList,
    regExp,
    formSection
  }
}
`

function BaseField({ field }) {
    const { name, type, placeholder, mask, errorsList, regExp } = field
    switch (type) {
        case 'date':
            const [selectedDate, setSelectedDate] = React.useState(new Date());
            function handleDateChange(date) {
                setSelectedDate(date);
            }
            return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label={name}
                        format="yyyy.MM.dd"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        inputVariant="outlined"
                        className='apply-form__datepicker'
                    />
                </MuiPickersUtilsProvider>
            )
        case 'radio':
            const [value, setValue] = React.useState('female');

            function handleChange(event) {
                setValue(event.target.value);
            }
            return (
                <RadioGroup aria-label={name} name={name} value={value} onChange={handleChange} row>
                    <FormControlLabel value="female" control={<Radio />} label="Женский" />
                    <FormControlLabel value="male" control={<Radio />} label="Мужской" />
                </RadioGroup>
            )
        default:
            return (
                <TextField
                    name={name}
                    placeholder={placeholder}
                    margin="normal"
                    variant="outlined"
                />
            )
    }

}

function FieldsList({ fields }) {
    const classes = useStyles();
    const general = fields.filter(field => field.formSection === 'general')
    const contacts = fields.filter(field => field.formSection === 'contacts')
    const [state, setState] = React.useState({
        checkedA: false,
    });
    const handleChangeCheckbox = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    return (
        <Container className='apply-form__fields'>
            <Grid spacing={2} container>
                <Grid xs={6} item>
                    <FormGroup row>
                        <h2>Контактные данные</h2>
                        {contacts.length > 0 && contacts.map(field => {
                            return (
                                <BaseField key={field.id} field={field} />
                            )
                        })}
                    </FormGroup>
                </Grid>
                <Grid xs={6} item>
                    <FormGroup row>
                        <h2>Основные сведения о вас</h2>
                        {general.length > 0 && general.map(field => {
                            return (
                                <BaseField key={field.id} field={field} />
                            )
                        })}
                    </FormGroup>
                </Grid>
                <Grid xs={12} item container alignContent='center' justify='center' className={classes.apply}>
                    <Button className={classes.button}>Отправить заявку</Button>
                    <span className={classes.personal} >Нажимая кнопку «Отправить заявку»,  Вы даёте согласие на обработку <a>персональных данных.</a></span>
                    <FormControlLabel
                        className={classes.label}
                        control={
                            <Checkbox checked={state.checkedA}
                                onChange={handleChangeCheckbox('checkedA')}
                                color="primary"
                                icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                checkedIcon={<CheckBoxIcon fontSize="default" />}
                                value="checkedA" />
                        }
                        classes={{ label: 'tiny-label' }}
                        label="Разрешаю присылать мне специальные предложения и новости по электронной почте или СМС"
                    />
                </Grid>
            </Grid>
        </Container>

    )
}

export default function () {
    const { loading, error, data } = useQuery(formFieldsQuery);
    const formFields = (!loading && !error) ? data.formfields : []
    if (loading) return <React.Fragment>Loading</React.Fragment>
    return (
        <FieldsList fields={formFields} />
    )
}