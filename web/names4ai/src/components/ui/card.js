/*
  this creates
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
*/

import React from 'react';
// using tailwind to style the card

const Card = ({ children }) => {
    return <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">{children}</div>;
};

const CardHeader = ({ children }) => {
    return <div  class="font-bold text-xl mb-2">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <div  class="font-bold text-xl mb-2">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div class="text-gray-700 text-base">{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };
