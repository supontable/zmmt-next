import Comparision from '../common/svg/comparison'
export default function(action) {
    return (
        <div className={'header'}>
            <div className={'action'}>
                <div className={'rectangle rectangle_' + action.color}></div>
                {action.actionName}
            </div>
            <div className={'compare'}>
                <Comparision size='s' />
                <a>Сравнить</a>
            </div>
            <style jsx>{`
              .header {
                display: flex;
                align-items: center;
                width: 100%;
                height: 52px;
                position: absolute;
                line-height: 52px;
                top: 0;
                left: 0;
              }
              .action { 
                 text-indent: 47px;
                 letter-spacing: 0.5px;
                 text-transform: uppercase;
                 color: #6d7278;
                 font-size: 11px;
              }
              .rectangle {
                width: 31px;
                height: 8px;
                position: absolute;
                top: 22px;
                border-radius: 0 55px 55px 0;
                border-left: none;
                border-right: 1px solid transparent;
              }
              .rectangle_purple {
                background-color: #b620e0;
              }
              .rectangle_green {
                background-color: #6dd400;
              }
              .compare {
                margin-left: auto;
                margin-right: 24px;
                opacity: .7;
              }
              .compare a {
                cursor: pointer;
                font-size: 12px;
                color: #6236ff;
                margin-left: 8px;ee
              }
              .compare:hover {
                  opacity: 1;
              }
            `}</style>
        </div>
    )
}