import { Button } from '@material-ui/core';
import './apply.scss'
export default function () {
    return (
        <section className={'widget'}>
            <h3>Подать заявку</h3>
            Не смогли выбрать компанию?
            Оставьте заявку и мы подберем
            для Вас наиболее выгодные займы!
            <Button variant="outlined"
                color="inherit"
                className={'button'}
            >Подать заявку</Button>
        </section>
    )
}