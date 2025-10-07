import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4"
      data-oid="0i6_sd5"
    >
      <div className="text-center" data-oid="pb7x:e6">
        <div
          className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
          data-oid="2x_.cbl"
        >
          404
        </div>
        <h1 className="text-3xl font-bold text-white mb-4" data-oid="7rh-cde">
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-8" data-oid="x5_k.og">
          Looks like you've wandered off the training path.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          data-oid="m_-nr7l"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-oid="yprcaoy"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              data-oid="fkumd4a"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
