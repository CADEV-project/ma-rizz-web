'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <html>
      <body>
        <h2>ERROR PAGE :: {error.message}</h2>
        <button onClick={() => reset()}>Try Again</button>
      </body>
    </html>
  );
};

export default Error;
