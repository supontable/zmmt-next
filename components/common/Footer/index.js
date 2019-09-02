import React from 'react'
import Link from 'next/link'
import './index.scss'

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
    </footer>
)

export default Footer
