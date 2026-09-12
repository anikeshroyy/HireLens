import Hero from "../components/Hero";
import Upload from "../components/Upload";
import SEO from "../components/common/SEO";

const Home = () => {
  return (
    <div>
      <SEO path="/" />
      <Hero />

      <section id="upload">
        <Upload />
      </section>
    </div>
  );
};

export default Home;

