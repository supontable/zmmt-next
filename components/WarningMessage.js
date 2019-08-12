export default ({ message }) => (
    <section>
      {message}
      <style jsx>{`
        section {
          padding: 1.5em;
          font-size: 24px;
          color: white;
          background-image:  linear-gradient(to bottom, rgba(0, 0, 0, 0), #6236ff);
        }
      `}</style>
    </section>
  )
  