import Hero from "../components/Hero";
import Upload from "../components/Upload";
import SEO from "../components/common/SEO";

const Home = () => {
  return (
    <div>
      <SEO
        title="Smart AI Resume Parser & Job Discovery Platform"
        description="HireLens is an intelligent hiring platform powered by AI resume parsing and candidate-to-job matching. Upload your resume and discover your next opportunity."
        path="/"
      />
      <Hero />

      <section id="upload">
        <Upload />
      </section>
    </div>
  );
};

export default Home;

