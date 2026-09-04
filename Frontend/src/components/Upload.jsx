import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseResume, clearResume } from "../redux/features/resume/resumeSlice";
import { ArrowRight, FileText, UploadCloud, X } from "lucide-react";
import ResumeResult from "./resume/ResumeResult";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.resume);

  const handleFiles = useCallback((files) => {
    if (files && files[0]) setFile(files[0]);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const handleExtract = () => {
    if (file) dispatch(parseResume(file));
  };

  const handleReset = () => {
    setFile(null);
    dispatch(clearResume());
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="flex flex-col justify-center items-center min-h-[50vh] lg:min-h-[70vh] pt-20 lg:pt-10 pb-16 px-4">
        {data ? (
          <ResumeResult data={data} onReset={handleReset} />
        ) : (
          <div className="w-full max-w-80 lg:max-w-3xl">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  inputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload your resume"
              className={`relative rounded-2xl border border-dashed transition-colors cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                isDragging
                  ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <div className="relative flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
                {file ? (
                  <>
                    <FileText
                      className="w-8 h-8 text-indigo-600 dark:text-indigo-300"
                      strokeWidth={1.5}
                    />
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 text-sm font-mono">
                      {file.name}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-slate-400 dark:text-slate-500 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud
                      className="w-8 h-8 text-slate-400 dark:text-slate-500"
                      strokeWidth={1.5}
                    />
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Drop your resume here, or{" "}
                      <span className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4">
                        browse
                      </span>
                    </p>
                    <p className="text-slate-400 dark:text-slate-600 text-xs font-mono">
                      PDF only, up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleExtract}
              disabled={!file || loading}
              className={`group w-full mt-4 flex items-center justify-center gap-2 text-base font-medium px-6 py-3.5 rounded-xl transition-all ${
                file && !loading
                  ? "bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 active:scale-95"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  Extract Resume
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${file ? "group-hover:translate-x-0.5" : ""}`}
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
