export default function({ widgetList = []}) {
    return (
        <section className={'widget'}>
            <h3>Топ 5 заемщиков</h3>
            {widgetList.length > 0 && widgetList.map((item, index) => {
                return (
                    <div key={index} className={'widget__item'}>
                        <img src='/static/sample.png' alt='В разработке' width='50%' />
                        <img src='/static/reviews.png' alt='В разработке' width='50%' />                        
                    </div>
                )
            })}
            <style jsx>{`
                .widget {
                    max-height: 420px;
                    background-color: #ffffff;
                }
                h3 {
                    color: rgba(0, 0, 0, 0.85);
                }
                .widget__item {
                    display: flex;
                    margin-bottom: 16px;
                }
            `}</style>
        </section>
    )
}