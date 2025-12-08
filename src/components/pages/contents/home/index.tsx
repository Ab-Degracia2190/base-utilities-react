import { Link } from 'react-router-dom';
import PrimaryButton from "@/components/partials/buttons/default/primary";
import { MousePointer, Loader, Square, Type } from "lucide-react";

const HomeSelection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
        UI Asset Library
      </h1>
      <p className="text-xs md:text-sm text-center text-gray-700 dark:text-gray-300">
        Browse and preview different UI components
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        <Link to="/buttons" className="w-full">
          <PrimaryButton className="text-xs md:text-sm w-full">
            <MousePointer className="w-5 h-5" />
            Buttons
          </PrimaryButton>
        </Link>
        
        <Link to="/loaders" className="w-full">
          <PrimaryButton className="text-xs md:text-sm w-full">
            <Loader className="w-5 h-5" />
            Loaders
          </PrimaryButton>
        </Link>
        
        <Link to="/formatters" className="w-full">
          <PrimaryButton className="text-xs md:text-sm w-full">
            <Square className="w-5 h-5" />
            Formatters
          </PrimaryButton>
        </Link>
        
        <Link to="/inputs" className="w-full">
          <PrimaryButton className="text-xs md:text-sm w-full">
            <Type className="w-5 h-5" />
            Inputs
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default HomeSelection;