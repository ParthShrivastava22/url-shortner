import { useState } from "react";
import { createShortUrl } from "../../features/shorturl/shorturl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shortUrl } = await createShortUrl(url);
    setShortUrl(shortUrl);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="https://example.com/very/long/url"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          value={url}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="p-4 border border-gray-300 rounded-xl flex items-center justify-between gap-4">
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline break-all"
          >
            {shortUrl}
          </a>

          <button
            onClick={handleCopy}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
