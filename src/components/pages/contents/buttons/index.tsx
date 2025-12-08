import { PrimaryButton, SecondaryButton, TertiaryButton } from "@/components/partials/buttons";

const Buttons = () => {
  return (
    <div className="min-h-screen p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white">
            Button Component Variants
          </h1>
        </div>

        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-[10px] md:text-sm text-blue-800 dark:text-blue-200">
            <strong>File Structure:</strong><br/>
            📁 buttons/<br/>
            ├── primary.tsx<br/>
            ├── secondary.tsx<br/>
            ├── tertiary.tsx<br/>
            └── index.tsx (exports all components)
          </p>
        </div>

        {/* Primary Buttons */}
        <section className="mb-12">
          <h2 className="text-sm md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Primary Button <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">(primary.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Default
              </p>
              <PrimaryButton>Click me</PrimaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                With Loader
              </p>
              <PrimaryButton loading>Loading...</PrimaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Disabled
              </p>
              <PrimaryButton disabled>Disabled</PrimaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Custom (Black bg)
              </p>
              <PrimaryButton className="bg-black text-white hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-800">Custom Style</PrimaryButton>
            </div>
          </div>
        </section>

        {/* Secondary Buttons */}
        <section className="mb-12">
          <h2 className="text-sm md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Secondary Button <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">(secondary.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Default
              </p>
              <SecondaryButton>Click me</SecondaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                With Loader
              </p>
              <SecondaryButton loading>Loading...</SecondaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Disabled
              </p>
              <SecondaryButton disabled>Disabled</SecondaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Custom (Blue)
              </p>
              <SecondaryButton className="border-blue-500 text-blue-600 hover:bg-blue-50">Custom Style</SecondaryButton>
            </div>
          </div>
        </section>

        {/* Tertiary Buttons */}
        <section>
          <h2 className="text-sm md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Tertiary Button <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">(tertiary.tsx)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Default
              </p>
              <TertiaryButton>Click me</TertiaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                With Loader
              </p>
              <TertiaryButton loading>Loading...</TertiaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Disabled
              </p>
              <TertiaryButton disabled>Disabled</TertiaryButton>
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Custom (Green)
              </p>
              <TertiaryButton className="text-green-600 hover:bg-green-50">Custom Style</TertiaryButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Buttons;