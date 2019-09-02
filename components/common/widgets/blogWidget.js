import './blog.scss'
export default function({title, expanderTitle, widgetList = []}) {
    return (
        <section className={'widget widget__blog'}>
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
        </section>
    )
}