import './styles.scss'
var showdown = require('showdown'),
    converter = new showdown.Converter();

function createMarkup(text) {
    const html = converter.makeHtml(text)
    return { __html: html };
}

function SubContentItem(props) {
    const { item } = props
    const showImg = item.listImg && item.listImg.length > 0
    const showSubHeader = item.subHeader && item.subHeader.length > 0
    return (
        <div className='info-page__more-item'>
            {showImg && <img src={item.listImg} alt={'seo-alt'} />}
            <h1 dangerouslySetInnerHTML={createMarkup(item.contentHeader)} />
            {showSubHeader && <h2 dangerouslySetInnerHTML={createMarkup(item.subHeader)} />}
            <p>{item.content}</p>
        </div>
    )
}

function ContentFromJson(props) {
    const jsonContent = props.json
    const list = Object.keys(jsonContent)
    const classNames = `info-page__more info-page__more-${props.direction}`
    return (
        <div className={classNames}>
            {list.length > 0 && list.map((name, id) => {
                return (
                    <SubContentItem
                        key={id}
                        type={name}
                        item={jsonContent[name]}
                    />
                )
            })}
        </div>
    )
}

const InfoSection = (props) => {
    const moreContent = props.moreContent
    switch (props.type) {
        case 'returnGate':
            return (
                <section className='info-page info-page_returnGates'>
                    <h2 className='info-page__headless'>{props.sectionName}</h2>
                    <div
                        className='info-page__content info-page__content-row'
                        dangerouslySetInnerHTML={createMarkup(props.content)}
                    />
                    <h2 className='info-page__headless'>{props.subHeader}</h2>
                    {moreContent && <ContentFromJson json={moreContent} direction='column' />}
                </section>
            )
        case 'paymentGates':
            return (
                <section className='info-page info-page_paymentGates'>
                    <div
                        className='info-page__content info-page__content-row'
                        dangerouslySetInnerHTML={createMarkup(props.content)}
                    />
                    <h2 className='info-page__headless'>{props.subHeader}</h2>
                    {moreContent && <ContentFromJson json={moreContent} direction='row' />}
                </section>
            )
        case 'requirements':
            return (
                <section className='info-page info-page_requirements'>
                    <h2 className='info-page__headless'>{props.sectionName}</h2>
                    {moreContent && <ContentFromJson json={moreContent} direction='row' />}
                </section>
            )
        case 'how':
            return (
                <section className='info-page info-page_reverse info-page_how'>
                    <h2 className='info-page__headless'>{props.sectionName}</h2>
                    <div
                        className='info-page__content info-page__content-row'
                        dangerouslySetInnerHTML={createMarkup(props.content)}
                    />
                    {props.subHeader && <h2 className='info-page__headless'>{props.subHeader}</h2>}
                    {moreContent && <ContentFromJson json={moreContent} direction='row' />}
                </section>
            )
        case 'advantages':
            return (
                <React.Fragment>
                    <section className='info-page info-page_advantages'>
                        <div
                            className='info-page__content info-page__content-row'
                            dangerouslySetInnerHTML={createMarkup(props.content)}
                        />
                    </section>
                    <section className='info-page info-page_reverse info-page_advantages'>
                        {moreContent && <ContentFromJson json={moreContent} direction='column' />}
                    </section>
                </React.Fragment>
            )
        default:
            return (
                <section className='info-page'>
                    <div
                        className='info-page__content info-page__content-column'
                        dangerouslySetInnerHTML={createMarkup(props.content)}
                    />
                </section>
            )
    }

}
export default InfoSection