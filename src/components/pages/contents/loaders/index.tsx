import { PrimaryLoader, SecondaryLoader, TertiaryLoader} from '@/components/partials/loaders';

const Loaders = () => {
  return (
    <div className="min-h-screen p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white">
            Loader Component Variants
          </h1>
        </div>

        <div className="mb-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900">
          <p className="text-[10px] md:text-sm text-blue-800 dark:text-blue-200">
            <strong>File Structure:</strong><br/>
            📁 loaders/<br/>
            ├── primary.tsx<br/>
            ├── secondary.tsx<br/>
            ├── tertiary.tsx<br/>
            └── index.tsx (exports all components)
          </p>
        </div>

        {/* Primary Loaders */}
        <section className="mb-12">
          <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Primary Loader <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">(primary.tsx - Spinning Circle)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Default
              </p>
              <div className="flex justify-center">
                <PrimaryLoader />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Blue Color
              </p>
              <div className="flex justify-center">
                <PrimaryLoader color="#3b82f6" />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Red Color
              </p>
              <div className="flex justify-center">
                <PrimaryLoader color="#ef4444" />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Green Color
              </p>
              <div className="flex justify-center">
                <PrimaryLoader color="#10b981" />
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Loaders */}
        <section className="mb-12">
          <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Secondary Loader <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">(secondary.tsx - Bouncing Dots)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Default
              </p>
              <div className="flex justify-center">
                <SecondaryLoader />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Blue Color
              </p>
              <div className="flex justify-center">
                <SecondaryLoader color="bg-blue-500" />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Purple Color
              </p>
              <div className="flex justify-center">
                <SecondaryLoader color="bg-purple-500" />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Pink Color
              </p>
              <div className="flex justify-center">
                <SecondaryLoader color="bg-pink-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Tertiary Loaders */}
        <section className="mb-12">
          <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Tertiary Loader <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">(tertiary.tsx - Scaling Bars)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Default
              </p>
              <div className="flex justify-center">
                <TertiaryLoader />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Orange Color
              </p>
              <div className="flex justify-center">
                <TertiaryLoader color="bg-orange-500" />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Cyan Color
              </p>
              <div className="flex justify-center">
                <TertiaryLoader color="bg-cyan-500" />
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-[10px] md:text-sm mb-4 text-gray-600 dark:text-gray-400">
                Yellow Color
              </p>
              <div className="flex justify-center">
                <TertiaryLoader color="bg-yellow-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Overlay Examples */}
        <section className="mb-12">
          <h2 className="text-sm md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            With Overlay <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">(overlay prop)</span>
          </h2>
          <div className="p-4 rounded-lg border border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20">
            <p className="text-[10px] md:text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> The overlay versions create a full-screen overlay with animated background. 
              To see them in action, you would trigger them programmatically in your app (e.g., during data loading).
              They use <code className="px-1 py-0.5 rounded bg-black/10">overlay=true</code> prop.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <code className="text-[10px] md:text-xs text-gray-700 dark:text-gray-300">
                &lt;PrimaryLoader overlay /&gt;
              </code>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <code className="text-[10px] md:text-xs text-gray-700 dark:text-gray-300">
                &lt;SecondaryLoader overlay /&gt;
              </code>
            </div>
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <code className="text-[10px] md:text-xs text-gray-700 dark:text-gray-300">
                &lt;TertiaryLoader overlay /&gt;
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Loaders;