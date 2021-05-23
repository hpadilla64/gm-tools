import React from 'react';

export default interface GenericProps<T> {
  children: (item: T) => React.ReactNode;
  items: Array<T>;
}
