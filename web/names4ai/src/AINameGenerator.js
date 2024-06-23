import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

// Expanded fallback data
import fallbackChain from './chain.json';


const BetaTag = () => {
    return (
        <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold rounded-full px-2 py-1 uppercase tracking-wide text-center">
        Beta
        </span>
    );
};

const AINameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState([]);
  const [numNames, setNumNames] = useState(5);
  const [chain, setChain] = useState(fallbackChain);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/velocitatem/733529fd0ac2862306fb1ed623ba7729/raw/19530eda24c3bfc302b2d675e04d04976c31083d/chain.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched chain data:', data);
        setChain(data);
      })
      .catch(error => {
        console.error('Error fetching Markov chain data:', error);
        // Silently fall back to the fallback data
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const calculatePronunciationDiff = (name) => {
    let score = 0;
    const vowels = 'aeiou';

    if (name.replace(/[aeiou]/gi, '').length > 3) score += 1;
    if (name.toLowerCase().split('').filter(char => vowels.includes(char)).length < 2) score += 1;
    if (name.replace(/[aeiou]/gi, '').length > name.length / 2) score += 1;
    if (/[qxyzjkw]/i.test(name)) score += 1;
    if (name.length > 10) score += 1;

    return score / 5;
  };

  const getName = () => {
    let name = Object.keys(chain)[Math.floor(Math.random() * Object.keys(chain).length)];
    let newName = name;

    for (let i = 0; i < 3; i++) {
      const lastSyllable = newName.split('-').pop();
      if (chain[lastSyllable] && chain[lastSyllable].length > 0) {
        newName += chain[lastSyllable][Math.floor(Math.random() * chain[lastSyllable].length)];
      }
    }

    newName = newName.replace(/-/g, '');
    const pdiff = calculatePronunciationDiff(newName);

    if (newName.length < 2 || newName.length > 7 || pdiff > 0.6) {
      return getName();
    }

    return newName.charAt(0).toUpperCase() + newName.slice(1).toLowerCase();
  };

  const generateNames = () => {
    const newNames = new Set();
    while (newNames.size < numNames) {
      newNames.add(getName());
    }
    setGeneratedNames(Array.from(newNames));
  };

  if (isLoading) {
    return <div>Loading name generation data...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Names 4 AI</CardTitle>

          <BetaTag></BetaTag>
          </CardHeader>
          <p>
      Welcome to the AI Name Generator! As we continue to develop more AI systems, the need for unique and distinguishable names becomes increasingly important. Our AI Name Generator uses advanced algorithms to create original names that are easy to pronounce and remember, yet distinct from human names. Whether you're naming a new AI assistant, chatbot, or any other AI system, our generator provides instant suggestions tailored to your needs. Simply specify the number of names you want, and let our generator do the rest. Start generating names now and find the perfect name for your AI system!
          </p>
        <CardContent>
          <div className="mb-4">
            <label htmlFor="numNames" className="block text-sm font-medium text-gray-700">
              Number of names to generate:
            </label>
            <Input
              type="number"
              id="numNames"
              value={numNames}
              onChange={(e) => setNumNames(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              min="1"
              max="20"
              className="mt-1"
            />
          </div>
          <Button onClick={generateNames} className="w-full mb-4">
            Generate Names
          </Button>
          {generatedNames.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Generated Names:</h3>
              <ul className="list-disc pl-5">
                {generatedNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AINameGenerator;
