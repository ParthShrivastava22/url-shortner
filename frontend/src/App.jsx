import UrlForm from "./shared/components/UrlForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-2">URL Shortener</h1>

        <p className="text-gray-500 text-center mb-6">
          Paste your long URL below
        </p>

        <UrlForm />
      </div>
    </div>
  );
}

export default App;
