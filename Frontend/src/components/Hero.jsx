const Hero = () => {
  return (
    <div className="w-full min-h-full bg-slate-950 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          filter: "blur(120px)",
          background:
            "radial-gradient(circle, rgba(45,212,191,0.14), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center pt-28 lg:pt-20 px-6">
        <div className="text-center w-full lg:max-w-3xl">
          <h1
            className="fade-up text-slate-100 text-4xl lg:text-6xl font-semibold tracking-tight mb-4 leading-tight"
            style={{ animationDelay: "0.05s" }}
          >
            From Resume to <br />
            <span className="bg-gradient-to-r from-blue-300 to-teal-200 bg-clip-text text-transparent pr-4">
              Dream Career
            </span>
            , Instantly
          </h1>
          <p
            className="fade-up text-slate-400 text-lg lg:text-xl max-w-xl mx-auto"
            style={{ animationDelay: "0.12s" }}
          >
            Turn your resume into opportunities — discover jobs that perfectly
            match your skills and experience.
          </p>
        </div>

        <div
          className="fade-up w-full max-w-xl mt-12"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;