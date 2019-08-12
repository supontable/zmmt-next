import './offer.scss'
const Offer = ({ offerApproval, offerTime }) => (
    <React.Fragment>
        <table>
            <thead>
                <tr>
                    <th>Одобрение</th>
                    <th>Рассмотрение</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {`${offerApproval * 100} %`}
                    </td>
                    <td>
                        {`${offerTime} мин`}
                    </td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>
)
export default Offer