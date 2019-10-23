import { getNumEnding, wrapApiUrl } from '../../lib/helpers'
import AccountIcon from '../common/Icon/accountIcon'
import './calc.scss'
import { Box, Slider, Input } from '@material-ui/core';
import { SlidersContext } from '../../SlidersContext';



export default function ({ amountMin, amountMax, termMin, termMax, accounts, rate }) {
    const [slidersContext] = React.useContext(SlidersContext);
    let {amount, term} = slidersContext
    if (!amount || !term) {
        amount = amountMax
        term = termMax
    }
    return (
        <div className={'calc'}>
            <div className={'info'}>
                <table>
                    <thead>
                        <tr>
                            <th>Сумма займа</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {amount}&nbsp;
                    </td>
                        </tr>
                    </tbody>
                </table>
                <span>+</span>
                <table>
                    <thead>
                        <tr>
                            <th>Комиссия {term} {getNumEnding(term, ['день', 'дня', 'дней'])}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {amount * rate * term}&nbsp;
                    </td>
                        </tr>
                    </tbody>
                </table>
                <span>=</span>
                <table>
                    <thead>
                        <tr>
                            <th>Возвращаете</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {amount * rate * term + amount}&nbsp;
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div >
            <Box mt={3} className={'conditions '}>
                <table>
                    <thead>
                        <tr>
                            <th>Ставка в день</th>
                            <th>Сумма</th>
                            <th>На срок</th>
                            <th className='conditions__account'>Получить</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                от {rate * 100} %
                            </td>
                            <td className='conditions__amount'>
                                <span>от {amountMin}</span><span> до {amountMax} руб</span>
                            </td>
                            <td>
                                {termMin}-{termMax} {getNumEnding(termMax, ['день', 'дня', 'дней'])}
                            </td>
                            <td className='conditions__account'>
                                {accounts.length > 0 &&
                                    accounts.map((account, index) => <AccountIcon key={index} url={wrapApiUrl(account.logo.url)} />)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <style jsx>{`
              
            `}</style>
        </div >

    )
}
