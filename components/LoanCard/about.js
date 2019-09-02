import { wrapApiUrl } from '../../lib/helpers'
import Link from 'next/link'
import './about.scss'
import { Hidden, Box } from '@material-ui/core';

export default function ({ loanName, logoUrl }) {
    return (
        <div className='about'>
            <div className={'logo'}>
                <img src={logoUrl} alt={loanName} />
            </div>
            <Hidden implementation="css" only={['xs', 'sm']}>
                <Box my={1}>
                    <Link href='/about'><a className={'link'}>Подробнее о компании</a></Link>
                </Box>
            </Hidden>
            <div className={'reviews'}>
                <img src='/static/reviews.png' alt='В разработке' />
            </div>
            <style jsx>{`
              
            `}</style>
        </div>
    )
}
