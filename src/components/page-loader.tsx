import Spinner from '@/components/spinner';

const PageLoader = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      <Spinner />
    </div>
  );
};

export default PageLoader;
