import Comparision from '../common/svg/comparison'
import './header.scss'
export default function(action) {
    return (
        <div className={'loan-card__header'}>
            <div className={'loan-card__action'}>
                <div className={'rectangle rectangle_' + action.color}></div>
                <span className={'loan-card__action-name'}>{action.actionName}</span>
                <div className={'rectangle rectangle-mobile rectangle_' + action.color}></div>
            </div>
            <div className={'loan-card__compare'}>
                <Comparision size='s' />
                <a>Сравнить</a>
            </div>
        </div>
    )
}