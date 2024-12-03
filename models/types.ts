export interface FormError {
    field: string;
    message: string;
  }
  
  export interface AuthFormState {
    email: string;
    password: string;
    name?: string;
    isLoading: boolean;
    errors: FormError[];
  }
  