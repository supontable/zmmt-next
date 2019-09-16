/* eslint-disable no-nested-ternary */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useRouter } from 'next/router'
import Link from 'next/link';
const breadcrumbNameMap = {
    '/actions': 'Все акции',
    '/loans': 'МФО',
    '/trash': 'Trash',
    '/spam': 'Spam',
    '/drafts': 'Drafts',
};
const useStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      '& a, & .MuiTypography-root': {
          textDecoration: 'none',
          color: '#6236ff',
      }
    },
  }));
export default function CBCrummb({currentPageName = '404'}) {
    const router = useRouter()
    const classes = useStyles();
    const pathnames = router.pathname.split('/').filter(x => x);
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.root}>
            <Link href="/">
                <a>Займы онлайн</a> 
            </Link>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                    <Typography color="textPrimary" key={to}>
                        {breadcrumbNameMap[to] || currentPageName}
                    </Typography>
                ) : (
                        <Link href={to} key={to}>
                            <a>{breadcrumbNameMap[to]}</a> 
                        </Link>
                    );
            })}
        </Breadcrumbs>
    )
}