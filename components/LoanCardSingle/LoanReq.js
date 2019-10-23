import {Typography} from "@material-ui/core"

export default function LoanReq() {
  return (
    <React.Fragment>
      <Typography className='loan-req' variant='button' component='h2'>Реквизиты компании</Typography>
      <ul>
        <li>
          <Typography color='textSecondary'>Юридическое название:</Typography>
          <Typography >ООО МФК «КОНГА»</Typography>
        </li>
        <li>
          <Typography color='textSecondary'>ИНН:</Typography>
          <Typography >5407264020</Typography>
        </li>
        <li>
          <Typography color='textSecondary'>КПП:</Typography>
          <Typography >381101001</Typography>
        </li>
        <li>
          <Typography color='textSecondary'>ОГРН:</Typography>
          <Typography >1155476135110</Typography>
        </li>
        <li>
          <Typography color='textSecondary'>ОКПО:</Typography>
          <Typography >33430862</Typography>
        </li>
        <li>
          <Typography color='textSecondary'>ОКТМО:</Typography>
          <Typography >25701000001</Typography>
        </li>
        <li>
          <Typography color='textSecondary'>Банк:</Typography>
          <Typography >«Промсвязьбанк»  г. Новосибирск</Typography>
        </li>
        <li>
          <Typography color='textSecondary'>Юридический адрес:</Typography>
          <Typography >664047, г. Иркутск, ул. Карла Либкнехта, д. 121, оф. 507.</Typography>
        </li>
      </ul>
    </React.Fragment>
  )
}
