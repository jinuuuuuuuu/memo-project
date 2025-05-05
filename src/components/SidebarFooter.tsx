import { FaPlus } from 'react-icons/fa';

interface SidebarFooterProps {
  onClick: () => void;
}

const SidebarFooter = ({ onClick }: SidebarFooterProps) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={onClick}
        className="flex justify-center items-center cursor-pointer w-24 h-8 px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-full"
      >
        <FaPlus className="text-lg" />
      </button>
    </div>
  );
};

export default SidebarFooter;
