import { getNumEnding, wrapApiUrl } from '../../lib/helpers'
import AccountIcon from '../common/Icon/accountIcon'
import './calc.scss'
import { Box, Slider, Input } from '@material-ui/core';



export default function ({ amountMin, amountMax, termMin, termMax, accounts, rate }) {

    return (
        <div className={'calc'}>
            <div className={'info'}>
                
            </div>
            <Box mt={3} className={'conditions '}>
                <table>
                    <thead>
                        <tr>
                            <th>Ставка в день</th>
                            <th>Сумма</th>
                            <th>На срок</th>
                            <th>Получить</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {`от ${rate * 100} %`}
                            </td>
                            <td>
                                {`от ${amountMin} до ${amountMax} руб`}
                            </td>
                            <td>
                                {`${termMin}-${termMax} ${getNumEnding(termMax, ['день', 'дня', 'дней'])}`}
                            </td>
                            <td>
                                {accounts.length > 0 &&
                                    accounts.map((account, index) => <AccountIcon key={index} url={wrapApiUrl(account.logo.url)} />)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <style jsx>{`
              
            `}</style>
        </div>

    )
}