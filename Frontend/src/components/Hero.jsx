import  { useCallback, useRef, useState } from "react";
import { ArrowRight, FileText, UploadCloud, X } from "lucide-react";

const Hero = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    if (files && files[0]) setFile(files[0]);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div className="w-full min-h-screen bg-slate-950 relative overflow-hidden">
  
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          filter: "blur(120px)",
          background: "radial-gradient(circle, rgba(45,212,191,0.14), transparent 70%)",
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
            Turn your resume into opportunities — discover jobs that
            perfectly match your skills and experience.
          </p>
        </div>

        <div
          className="fade-up w-full max-w-xl mt-12"
          style={{ animationDelay: "0.2s" }}
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            role="button"
            tabIndex={0}
            aria-label="Upload your resume"
            className={`relative rounded-2xl border border-dashed transition-colors cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
              isDragging
                ? "border-blue-400 bg-blue-950"
                : "border-slate-700 bg-slate-900 hover:border-slate-600"
            }`}
          >

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <div className="relative flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
              {file ? (
                <>
                  <FileText className="w-8 h-8 text-teal-300" strokeWidth={1.5} />
                  <div className="flex items-center gap-2 text-slate-200 text-sm font-mono">
                    {file.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="text-slate-500 cursor-pointer hover:text-slate-300"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 text-slate-500" strokeWidth={1.5} />
                  <p className="text-slate-300 text-sm">
                    Drop your resume here, or{" "}
                    <span className="text-teal-300 underline underline-offset-4">
                      browse
                    </span>
                  </p>
                  <p className="text-slate-600 text-xs font-mono">
                    PDF or DOCX, up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={!file}
            className={`group w-full mt-4 flex items-center justify-center gap-2 text-base font-medium px-6 py-3.5 rounded-xl transition-all ${
              file
                ? "bg-blue-600 text-slate-200 cursor-pointer"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            Analyze Resume
            <ArrowRight
              className={`w-4 h-4 transition-transform ${
                file ? "group-hover:translate-x-0.5" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;