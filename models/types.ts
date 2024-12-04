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
  
  export interface FormPickerProps {
    title: string;
    value: string;
    onValueChange: (value: string) => void;
    items: Array<{ label: string; value: string }>;
    errorMsg?: string;
  }
  
  export interface ProfileFormState {
    fullName: string;
    location: string;
    userType: 'business_owner' | 'entrepreneur';
    businessType: string;
    bio: string;
    profileImage : string;
    isLoading: boolean;
    errors: Array<{ field: string; message: string }>;
  }
  