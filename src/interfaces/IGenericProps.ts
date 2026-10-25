import React from 'react';

export interface GenericProps<T> {
  children: (item: T) => React.ReactNode;
  items: Array<T>;
}
