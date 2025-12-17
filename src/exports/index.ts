import '../index.css';

// Buttons from partials
export {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  ThemeToggle
} from '../components/partials/buttons';

// Loaders from partials
export {
  PrimaryLoader,
  SecondaryLoader,
  TertiaryLoader
} from '../components/partials/loaders';

// Inputs from partials
export {
  Text,
  Email,
  Password,
  Number,
  TextArea,
  AutoSuggest,
  Dropdown,
  Checkbox,
  DatePicker,
  DateRangePicker,
  Search
} from '../components/partials/inputs';

// Background from partials
export {
  AnimatedBackground
} from '../components/partials/background';

// Paginations from partials
export {
  PrimaryPagination,
  SecondaryPagination,
  TertiaryPagination
} from '../components/partials/paginations';

// Tables from partials
export {
  PrimaryTable,
  SecondaryTable,
  TertiaryTable
} from '../components/partials/tables';

// Formatters from base
export * from '../base/formatters';

// Validators from base
export { validateForm } from '../base/validators/form-validator';

// Theme from base
export { useTheme } from '../base/hooks/themes/use-theme';
export type { Theme } from '../base/types/themes/theme.types';

// Hooks from base
export { useClickOutside } from '../base/hooks/use-click-outside';

// Modals from components
export * from '../components/modals';

