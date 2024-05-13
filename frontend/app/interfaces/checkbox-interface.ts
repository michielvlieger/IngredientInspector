export interface CheckboxInterface {
  label: string;      // Descriptive label for the checkbox.
  id: string;         // Used to identify the checkbox.
  checked: boolean;   // Boolean to represent if the checkbox is checked.
  onValueChange?: (newValue: { key: string, checked: boolean }) => void; // Function to handle changes in checkbox value (two-way binding).
}