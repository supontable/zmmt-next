import {
    Checkbox,
    FormGroup,
    FormControlLabel,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import intl from '../../lib/intl.json'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import { keysToObject } from '../../lib/helpers'

const useStyles = makeStyles({
    checkboxGroup: {
        color: '#6236ff',
        '.MuiFormControl-root + &': {
            maxHeight: 220
        },
        '& .MuiCheckbox-root': {
            color: '#6236ff',
        },
        '& .tiny-label': {
            fontSize: 14,
            whiteSpace: 'nowrap',
        }
    },
    widgetHeader: {
        margin: '16px 0 0',
        '& + .MuiFormControl-root > .MuiInputBase-root': {
            color: '#6236ff',
        }
    }
});
export default function AsideFilter (props) {
    const labels = intl.filterLabels
    const placeholders = labels.placeholders

    const classes = useStyles()
    const loanAmoutKeys = [1000, 5000, 10000, 15000, 20000, 25000, 30000]
    const [filterState, setFilterState] = React.useState({
        checkedA: false,
        checkedB: false,
        loanAmout: keysToObject(loanAmoutKeys),
        loanRate: keysToObject(Object.keys(placeholders.loanRateCheckboxes)),
        takeGate: keysToObject(Object.keys(placeholders.takeGateCheckboxes)),
        loanTypes: keysToObject(Object.keys(placeholders.loanTypesCheckboxes)),
        loanTerm: keysToObject(Object.keys(placeholders.loanTermCheckboxes)),
        refoundGate: keysToObject(Object.keys(placeholders.refoundGateCheckboxes)),
        job: keysToObject(Object.keys(placeholders.jobCheckboxes)),
        city: keysToObject(Object.keys(placeholders.cityCheckboxes)),
    })
    const handleChangeCheckbox = type => name => event => {
        setFilterState({
            ...filterState,
            [type]: {
                ...filterState[type],
                [name]: event.target.checked
            }
        });
    };

    return (
        <section className='widget widget_filter'>
            <FormGroup>
                <h3 className={classes.widgetHeader}>{labels.loanName}</h3>
                <TextField
                    id="outlined-bare"
                    placeholder={placeholders.loanName}
                    margin="normal"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                />
                <h3 className={classes.widgetHeader}>{labels.loanAmout}</h3>
                <TextField
                    id="outlined-bare"
                    placeholder={placeholders.loanAmout}
                    margin="normal"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                />
                <FormGroup className={classes.checkboxGroup}>
                    {loanAmoutKeys.map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.loanAmout[label]}
                                    onChange={handleChangeCheckbox('loanAmout')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={label}
                        />)}
                </FormGroup>
                <h3 className={classes.widgetHeader}>{labels.loanRate}</h3>
                <FormGroup className={classes.checkboxGroup}>
                    {Object.keys(placeholders.loanRateCheckboxes).map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.loanRate[label]}
                                    onChange={handleChangeCheckbox('loanRate')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={placeholders.loanRateCheckboxes[label]}
                        />)}
                </FormGroup>
                <h3 className={classes.widgetHeader}>{labels.takeGate}</h3>
                <FormGroup className={classes.checkboxGroup}>
                    {Object.keys(placeholders.takeGateCheckboxes).map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.takeGate[label]}
                                    onChange={handleChangeCheckbox('takeGate')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={placeholders.takeGateCheckboxes[label]}
                        />)}
                </FormGroup>
                <h3 className={classes.widgetHeader}>{labels.loanTypes}</h3>
                <FormGroup className={classes.checkboxGroup}>
                    {Object.keys(placeholders.loanTypesCheckboxes).map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.loanTypes[label]}
                                    onChange={handleChangeCheckbox('loanTypes')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={placeholders.loanTypesCheckboxes[label]}
                        />)}
                </FormGroup>
                <h3 className={classes.widgetHeader}>{labels.loanTerm}</h3>
                <TextField
                    id="outlined-bare"
                    placeholder={placeholders.loanTerm}
                    margin="normal"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                />
                <FormGroup className={classes.checkboxGroup}>
                    {Object.keys(placeholders.loanTermCheckboxes).map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.loanTerm[label]}
                                    onChange={handleChangeCheckbox('loanTerm')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={placeholders.loanTermCheckboxes[label]}
                        />)}
                </FormGroup>
                <h3 className={classes.widgetHeader}>{labels.refoundGate}</h3>
                <FormGroup className={classes.checkboxGroup}>
                    {Object.keys(placeholders.refoundGateCheckboxes).map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.refoundGate[label]}
                                    onChange={handleChangeCheckbox('refoundGate')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={placeholders.refoundGateCheckboxes[label]}
                        />)}
                </FormGroup>
                <h3 className={classes.widgetHeader}>{labels.job}</h3>
                <FormGroup className={classes.checkboxGroup}>
                    {Object.keys(placeholders.jobCheckboxes).map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.job[label]}
                                    onChange={handleChangeCheckbox('job')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={placeholders.jobCheckboxes[label]}
                        />)}
                </FormGroup>
                <h3 className={classes.widgetHeader}>{labels.age}</h3>
                <TextField
                    id="outlined-bare"
                    placeholder={placeholders.age}
                    margin="normal"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                />
                <h3 className={classes.widgetHeader}>{labels.city}</h3>
                <TextField
                    id="outlined-bare"
                    placeholder={placeholders.city}
                    margin="normal"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                />
                 <FormGroup className={classes.checkboxGroup}>
                    {Object.keys(placeholders.cityCheckboxes).map((label, id) =>
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox checked={filterState.city[label]}
                                    onChange={handleChangeCheckbox('city')(label)}
                                    color="primary"
                                    icon={<CheckBoxOutlineBlankIcon fontSize="default" />}
                                    checkedIcon={<CheckBoxIcon fontSize="default" />}
                                    value={label} />
                            }
                            classes={{ label: 'tiny-label' }}
                            label={placeholders.cityCheckboxes[label]}
                        />)}
                </FormGroup>
            </FormGroup>
        </section >
    )
}