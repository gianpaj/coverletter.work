import { AI } from '@/lib/chat/actions';
import { generateUUID } from '@/lib/utils';
import Landing from '@/components/landing/Landing';

export default function IndexPage() {
  const id = generateUUID();

  return (
    <div className="px-2 sm:px-0">
      <AI initialAIState={{ coverLetterId: id, messages: [] }}>
        <Landing />
      </AI>
    </div>
  );
}
