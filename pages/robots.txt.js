import React, { Component } from "react";

export default class Robots extends Component {
  static getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/plain");
    res.write(`User-agent: *
    Disallow: /
    Sitemap: YOUR_ROOT_HERE/sitemap.xml`);
    res.end();
  }
}