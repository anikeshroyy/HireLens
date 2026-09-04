import Hero from "../components/Hero";
import Upload from "../components/Upload";

const Home = () => {
  return (
    <div>
      <Hero />

      <section id="upload">
        <Upload />
      </section>
    </div>
  );
};

export default Home;
