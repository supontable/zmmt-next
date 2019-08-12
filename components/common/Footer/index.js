import React from 'react'
import Link from 'next/link'

const links = [
    {href: 'https://zeit.co/now', label: 'ZEIT'},
    {href: 'https://github.com/zeit/next.js', label: 'GitHub'}
].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`
    return link
})

const Footer = () => (
    <footer className={'footer'}>
        <ul>
            <li>
                <Link href='/'>
                    <a>Home</a>
                </Link>
            </li>
            {links.map(({key, href, label}) => (
                <li key={key}>
                    <a href={href}>{label}</a>
                </li>
            ))}
        </ul>

        <style jsx>{`
      .footer {
        text-align: center;
        margin-top: auto;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      footer > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
      @media (max-width: 360px) {
          .footer {
            background: black;
          }
      }
    `}</style>
    </footer>
)

export default Footer
