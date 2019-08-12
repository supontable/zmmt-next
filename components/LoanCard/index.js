import Header from './header'
import About from './about'
import Calc from './calc'
import Offer from './offer'
import './loanCard.scss'
import { Grid, Hidden, Box, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const LoanCard = ({
    offerApproval,
    offerTime,
    logo,
    action,
    ...conditions
}) => {
    const theme = useTheme()
    const mdMatches = useMediaQuery(theme.breakpoints.up('md'));
    const lgMatches = useMediaQuery(theme.breakpoints.up('lg'));
    const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    const cardDireciton = mdMatches ? 'row' : 'column'
    const offerDireciton = mdMatches ? lgMatches ? 'column' : 'row' : 'row'
    const aboutCols = mdMatches ? lgMatches ? 2 : 3 : 12
    const asideCols = mdMatches ? lgMatches ? 3 : 12 : 12
    const justify = xsMatches ? 'space-between' : 'space-around'
    return (
        <Box mb={3}>
            <Grid container direction={cardDireciton} className={'loan-card'}>
                <Header {...action} />
                <Grid xs={aboutCols} item className={'loan-card__about'}>
                    <About logoUrl={'./static/sample.png'} />
                </Grid>
                <Grid xs item className={'loan-card__calc'}>
                    <Calc {...conditions} />
                </Grid>
                <Grid justify={justify} direction={offerDireciton} container xs={asideCols} item className={'loan-card__aside'}>
                    <Hidden only={['xs']} implementation="css" className={'loan-card__offer'}>
                        <Offer {...{ offerApproval, offerTime }} />
                    </Hidden>
                    <Button variant="contained" color="primary" className={'button__take'}>Получить деньги</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
export default LoanCard
