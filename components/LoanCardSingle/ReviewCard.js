import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function ReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            Захар
          </Typography>
          <Typography  gutterBottom variant="body2" color="textSecondary" component="p">
            Вот когда написали “дождитесь смс” - сказали правду. Все шло гладко до того момента, как мне не выслали сообщение. Я уже и домой успел доехать с работы, и только потом мне пришло сообщение. К сожалению, все настройки уже сбились, сайт был закрыт, поэтому процедуру пришлось повторить.
          </Typography>
          <Typography gutterBottom color={'primary'} style={{color: 'green'}} variant='overline'>Плюсы</Typography>
          <Typography gutterBottom>Высокий рейтинг от клиентов; Понятная информация и условия; Соответствие описанию; Вернуть деньги можно через приложение любого банка. </Typography>
          <Typography gutterBottom color={'error'} variant='overline'>Минусы</Typography>
          <Typography gutterBottom>При повторном кредитовании есть скидка, но из-за ежедневного начисления % она практически не ощущается. </Typography>

        </CardContent>
    </Card>
  );
}
