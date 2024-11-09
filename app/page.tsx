import Landing from '@/components/landing/Landing';
import CLCounter from '@/components/CLCounter';
// import { Banner } from '@/components/ui/banner';

export default function IndexPage() {
  return (
    <>
      {/* <Banner /> */}
      <div className="px-2 sm:px-0">
        <Landing counter={<CLCounter />} />
      </div>
    </>
  );
}
