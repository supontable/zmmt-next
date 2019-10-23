import Link from "next/link"
import {Typography} from "@material-ui/core"
import {API_HOST} from "../../lib/const"
import './loan-head.scss'

const LoanHead = (props) => {
  const {withLogo,logo,loanName,offerApproval, ...conditions} = props
  return (
    <div className="loan-head">
      {withLogo && <Link href={'/loans' + conditions.href + `?id=${conditions.id}`}>
          <div className={'loan-head__logo'}>
            <img src={logo ? API_HOST + logo.url : "default.png"} alt={loanName} />
            <Typography>Одобрение {offerApproval * 100}%</Typography>
          </div>
      </Link>}
      <div className='loan-head__reviews'>
        <img src='/static/reviews.png' alt='В разработке' />
        <a>Официальный сайт</a>
      </div>
    </div>
  )
}
export default LoanHead
