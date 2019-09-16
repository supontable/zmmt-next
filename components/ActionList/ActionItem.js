import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { API_HOST } from '../../lib/const'

const useStyles = makeStyles({
    card: {
        minHeight: 420,
        '@media(min-width: 960px)': {
        },
        '@media(min-width: 1280px)': {
        }
    },
    media: {
        height: 250,
        backgroundPosition: 'left',
    },
});
function getDateString(dateString) {
    const date = new Date(dateString)
    const string = date.toLocaleDateString()
    return string
}
export default function ActionItem(props) {
    const classes = useStyles();
    const term = `с ${getDateString(props.start)} по ${getDateString(props.end)}`
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={API_HOST + props.banner.url}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                    {term}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.description}
                    <Button size="small" color="primary">
                        Подробнее
                        </Button>
                </Typography>
            </CardContent>
        </Card>
    );
}