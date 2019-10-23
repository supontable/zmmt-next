import React from 'react'
import './index.scss'

const links = [
  {href: '', label: 'Политика конфиденциальности'},
  {href: '', label: 'О сайте'},
  {href: '', label: 'Публичная оферта'},
  {href: '', label: 'Вакансии'},
  {href: '', label: 'Контакты'},
  {href: '', label: 'Политика обработки информации'}
].map(link => {
  link.key = `nav-link-${(Math.random() * 2e+10).toFixed()}`
  return link
})

const Footer = () => (
  <footer className='footer'>
    <div className='footer__info'>
      <p>© Zaimomat.ru 2019. <br/> Все права защищены</p>

      <a className='footer__phone' href="tel:84996579635">+7 499 657-96-35</a>

      <p>Содержание сайта носит исключительно информационно-справочный характер. Сервис Zaimomat.ru не является
        кредитной организацией и не выдает кредиты</p>
    </div>
    <div className="footer__sub-info">
      <p>Все представленные компании имеют лицензии на соответствующую деятельность.</p>
      <p>При использовании материалов активная гиперссылка на Zaimomat.ru обязательна.</p>
    </div>
    <ul className='footer__list'>
      {links.map(({key, href, label}) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
    <div className="footer__social">
      <p>Мы в социальных сетях</p>
      <div className='social-links'>
        <a href="" className="facebook" dangerouslySetInnerHTML={{__html: require('!raw-loader!../../../static/facebook.svg').default}} />
        <a href="" className="youtube" dangerouslySetInnerHTML={{__html: require('!raw-loader!../../../static/youtube.svg').default}}/>
        <a href="" className="instagram" dangerouslySetInnerHTML={{__html: require('!raw-loader!../../../static/instagram.svg').default}}/>
      </div>
      <a href="" className="logo" dangerouslySetInnerHTML={{__html: require('!raw-loader!../../../static/logo.svg').default}} />
    </div>
  </footer>
)

export default Footer
