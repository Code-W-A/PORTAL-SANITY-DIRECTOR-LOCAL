type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-[20px] border border-dashed border-gray-3 bg-gray px-6 py-12 text-center">
      <h3 className="mb-3 text-2xl font-semibold text-dark">{title}</h3>
      <p className="mx-auto max-w-[640px]">{description}</p>
    </div>
  );
};

export default EmptyState;
