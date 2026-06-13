export default function Hero() {
  return (
    <section className="container">
      <h1 style={{fontSize:"36px", marginBottom:"10px"}}>Is your rent fair?</h1>
      <p style={{marginBottom:"16px"}}>
        Enter your rental details to compare your rent with the local area average in Bangladesh.
      </p>

      <div>
        <span className="badge">Data-driven estimates</span>
        <span className="badge">Area rent trends</span>
        <span className="badge">Location-based pricing</span>
      </div>
    </section>
  );
}