export default function({title, expanderTitle, widgetList = []}) {
    return (
        <section className={'widget'}>
            <h3>{title}</h3>
            {widgetList.length > 0 && widgetList.map((item, index) => {
                return (
                    <div key={index} className={'widget__item'}>
                        <time dateTime={item.createdAt}></time>
                        <p>{item.title}</p>
                    </div>
                )
            })}
            <a>{expanderTitle}</a>
            <style global jsx>{`
                .widget {
                    border-radius: 8px;
                    border: solid 1px #d8d8d8;
                    margin-bottom:24px;
                    padding: 24px;
                }
                .widget > h3 {
                    text-transform: uppercase;
                    font-size: 20px;
                    font-weight: 900;
                    line-height: normal;
                    letter-spacing: .9px;
                    margin-top: 0;
                }
            `}</style>
            <style jsx>{`
                .widget {
                    max-height: 420px;
                    background-color: #ffffff;
                }
                h3 {
                    color: rgba(0, 0, 0, 0.85);
                }
                .widget__item p {
                    font-size: 14px;
                    line-height: 1.57;
                    color: #6236ff;
                }
                .widget__item time {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </section>
    )
}