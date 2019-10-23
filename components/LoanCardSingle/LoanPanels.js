import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: 'unset',
    marginBottom: 0,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function LoanPanels() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant='button'>о компании</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Молодая микрофинансовая организация KONGA начала свою деятельность в феврале 2016 года. Ее цель направлена на решение любых непредвиденных финансовых проблем. Оформив заявку, получите оперативное решение денежного вопроса самым простым и удобным способом. Работа сервиса полностью автоматизирована, поэтому рассмотрение заявки по многочисленным параметрам осуществляется в течение 1 минуты. Чтобы получить финансовую помощь в этом МФК, от заемщика не требуются отправка документов, поручители, внесение залога и справка о наличии постоянного дохода. Несмотря на то, что деятельность организации осуществляется только в онлайн-режиме, она имеет высокий спрос среди пользователей, поскольку располагает большим процентом одобрения заявок.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant='button'>Способы выдачи</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant='button'>Требования к клиентам</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography variant='button'>Как вернуть кредитные средства</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <ExpansionPanelSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography variant='button'>штрафные сакнции</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <ExpansionPanelSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography variant='button'>условия кредитования</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <ExpansionPanelSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography variant='button'>как оформить микрокредит</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <ExpansionPanelSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography variant='button'>преимущества</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
