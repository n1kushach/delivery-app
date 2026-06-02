const SKELETON_ROWS = 50;
const SKELETON_COLS = 7;

const Shimmer = ({ className = '' }: { className?: string }) => (
  <div
    className={`relative overflow-hidden rounded bg-gray-200 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-linear-to-r before:from-transparent before:via-white/60 before:to-transparent ${className}`}
  />
);

const colWidths = ['w-36', 'w-20', 'w-28', 'w-40', 'w-24', 'w-16', 'w-16'];

const OrdersSkeleton = () => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="min-w-full border-collapse text-sm">
      <thead className="border-b border-gray-200 bg-gray-50">
        <tr>
          {Array.from({ length: SKELETON_COLS }).map((_, i) => (
            <th key={i} className="px-4 py-3">
              <Shimmer className="h-3 w-20" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: SKELETON_COLS }).map((_, colIdx) => (
              <td key={colIdx} className="px-4 py-3.5">
                <Shimmer className={`h-3 ${colWidths[colIdx]}`} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrdersSkeleton;
