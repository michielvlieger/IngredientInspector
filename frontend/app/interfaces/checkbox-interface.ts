export interface CheckboxInterface {
  categoryId: string;         // Used to identify the checkbox (compound key).
  ingredientId: string;         // Used to identify the checkbox (compound key).
  label: string;      // Descriptive label for the checkbox.
  checked: boolean;   // Boolean to represent if the checkbox is checked.
  onValueChange?: (event: CheckboxInterface) => void; // Function to handle changes in checkbox value (two-way binding).
}

// TODO: make this generic! categoryId, ingredientId, should not be part of the checkboxinterface.