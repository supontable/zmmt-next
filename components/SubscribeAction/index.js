import {
    TextField,
    Button
} from '@material-ui/core';
import './styles.scss'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        width: 275,
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        '& .MuiInputLabel': {
            color: '#6236ff',
        },
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
        },
        '@media(min-width: 680px)': {
            width: 375,
        }
    },
    focused: {},
}));
function CustomTextField(props) {
    const classes = useStyles();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}
export default function () {
    return (
        <section className='subscribe'>
            <h1>Подписка на акции</h1>
            <h2>У нас бывают индивидуальные скидки для наших подписчиков!<br />Вы хотите узнать о них первыми?</h2>
            <form>
                <CustomTextField
                    className='subscribe__input'
                    required
                    id="email"
                    type="email"
                    name="email"
                    label="Ваш e-mail"
                    variant="filled"
                />
                <CustomTextField
                    className='subscribe__input'
                    id="email"
                    label="Ваш телефон (необязательно)"
                    variant="filled"
                />
                <Button className='subscribe__button' color="secondary" variant="outlined" >Подписаться</Button>
            </form>
        </section>
    )
}