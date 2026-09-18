import { useEffect, useRef, useState } from 'react';

const SpeechRecognitionAPI =
  typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function VoiceInputButton({ onResult, lang = 'hi-IN', title = 'Speak in Hindi' }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!SpeechRecognitionAPI) return;
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.onerror = (event) => {
      setError(event.error === 'not-allowed' ? 'Microphone access denied' : 'Could not hear you, try again');
      setListening(false);
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  if (!SpeechRecognitionAPI) return null;

  const toggleListening = () => {
    setError('');
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={toggleListening}
        title={title}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
          listening ? 'animate-pulse bg-rose-500 text-white' : 'bg-leaf-100 text-leaf-700 hover:bg-leaf-200'
        }`}
      >
        🎤
      </button>
      {listening && <span className="text-xs text-rose-500">Listening (Hindi)...</span>}
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </span>
  );
}
