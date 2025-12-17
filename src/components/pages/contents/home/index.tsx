import { Link } from 'react-router-dom';
import PrimaryButton from "@/components/partials/buttons/default/primary";
import { MousePointer, Loader, Square, Type, Layers, ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react";

const HomeSelection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
        UI Asset Library
      </h1>
      <p className="text-xs md:text-sm text-center text-gray-700 dark:text-gray-300">
        Browse and preview different UI components
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full max-w-6xl">
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
        
        <Link to="/modals" className="w-full">
          <PrimaryButton className="text-xs md:text-sm w-full">
            <Layers className="w-5 h-5" />
            Modals
          </PrimaryButton>
        </Link>
        
        <Link to="/paginations" className="w-full">
          <PrimaryButton className="text-xs md:text-sm w-full flex items-center justify-center gap-2">
            <div className="flex items-center gap-0">
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </div>
            <span>Paginations</span>
          </PrimaryButton>
        </Link>
        
        <Link to="/tables" className="w-full">
          <PrimaryButton className="text-xs md:text-sm w-full">
            <Grid3x3 className="w-5 h-5" />
            Tables
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default HomeSelection;