import { AI } from '@/lib/chat/actions';
import { generateUUID } from '@/lib/utils';
import { LandingForm } from '@/components/landing/LandingForm';

export default function IndexPage() {
  const id = generateUUID();

  return (
    <AI initialAIState={{ coverLetterId: id, messages: [] }}>
      <div className="px-2 py-24 sm:px-0 sm:py-36">
        {/* {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      {isLoading && (
        <div className="mt-4 text-gray-500">
          <div>Loading...</div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={stop}
          >
            Stop
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <div className="text-red-500">An error occurred.</div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={() => reload()}
          >
            Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={isLoading || error != null}
        />
      </form> */}
        <LandingForm />
      </div>
    </AI>
  );
}
