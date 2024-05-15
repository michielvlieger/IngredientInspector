export interface CheckboxInterface {
  id: string | number;  // Identifier of the checkbox item.
  label?: string;      // Displayable label for the checkbox.
  checked: boolean;   // Boolean to represent if the checkbox is checked.
  onValueChange?: (event: CheckboxInterface) => void; // Function to handle changes in checkbox value (two-way binding).
}

// TODO: make this generic! categoryId, ingredientId, should not be part of the checkboxinterface.