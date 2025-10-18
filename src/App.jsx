import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post('https://code-reviewer-np2x.onrender.com/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Highlight without line numbers (CSS will handle them)
  const highlightCode = (code) =>
    prism.highlight(code, prism.languages.javascript, 'javascript');

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={highlightCode}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 16,
                borderRadius: "8px",
                height: "100%",
                width: "100%",
                backgroundColor: "#1e1e2f",
                color: "#f5f5f5",
                overflow: "auto",
              }}
            />
          </div>

          <button
            className={`review ${loading ? 'loading' : ''}`}
            onClick={reviewCode}
            disabled={loading}
          >
            {loading ? 'Reviewing...' : 'Review'}
          </button>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
