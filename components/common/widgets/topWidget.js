import './top.scss'
export default function({ widgetList = []}) {
    return (
        <section className={'widget widget__top'}>
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
               
            `}</style>
        </section>
    )
}