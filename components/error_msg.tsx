import { Text } from 'react-native';
import React from 'react';

export const ErrorMessage = ({ message }: { message: string }) => (
  <Text className="text-red-500 text-xs font-medium mt-1 ps-1">{message}</Text>
);