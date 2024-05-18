export interface CheckboxInterface {
  id: string;  // Identifier of the checkbox item.
  label?: string;      // Displayable label for the checkbox.
  checked: boolean;   // Boolean to represent if the checkbox is checked.
  onValueChange?: (event: CheckboxInterface) => void; // Function to handle changes in checkbox value (two-way binding).
}
