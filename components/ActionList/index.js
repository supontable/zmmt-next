import {
    Grid,
    Container,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './styles.scss'
import ActionItem from './ActionItem';
import Link from 'next/link'
const actionsQuery = gql`
  query actions {
    actions {
      actionName,
      start,
      end,
      description,
      banner {
        url
      },
      color
    }
  }
`

const ColorButton = withStyles(theme => ({
    root: {
      color: '#6236ff',
      borderColor: 'currentColor',
      opacity: .8,
      width: '100%',
      height: 70,
      marginTop: 32,
      '&:hover': {
        opacity: 1,
    },
    },
  }))(Button);

export default function ActionList({showButton}) {
    const { loading, error, data } = useQuery(actionsQuery);
    if (loading) return <React.Fragment>Loading</React.Fragment>
    const actionList = data.actions
    return (
        <Container className='action-list'>
            <Grid container spacing={2} >
                {actionList.length > 0 && actionList.map((item, id) => {
                    return (
                        <Grid item xs={12} md={6} key={id} >
                            <ActionItem {...item}/>
                        </Grid>
                    )
                })}
            </Grid>
            {showButton && <Link href="/actions"><ColorButton variant="outlined" >Показать все Акции</ColorButton></Link>}
        </Container>
    )
}