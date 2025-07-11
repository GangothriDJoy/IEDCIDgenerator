import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IEDCLogo from '/iedc-logo-inverted.jpg'; // Inverted logo image

const usedIds = new Set();

function generateUniqueID(admNumber) {
  const year = admNumber.slice(0, 2);
  const branch = admNumber.slice(2, 4);
  const lastTwo = admNumber.slice(-2);

  let letter = 'A';
  let baseId = `IEDCRIT${year}${branch}${lastTwo}`;
  let uniqueId = baseId + letter;

  while (usedIds.has(uniqueId)) {
    letter = String.fromCharCode(letter.charCodeAt(0) + 1);
    uniqueId = baseId + letter;
  }

  usedIds.add(uniqueId);
  return uniqueId;
}

export default function IDGenerator() {
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [semester, setSemester] = useState('');
  const [admNumber, setAdmNumber] = useState('');
  const [generatedID, setGeneratedID] = useState('');

  const handleGenerate = () => {
    if (name && dept && semester && admNumber.length >= 8) {
      const id = generateUniqueID(admNumber);
      setGeneratedID(id);
    } else {
      alert("Please fill all fields correctly. Admission number must be at least 8 characters.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <img src={IEDCLogo} alt="IEDC RIT Logo" className="w-24 h-24 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-center text-black">IEDC Premium Membership ID Generator</h1>
          <p className="text-sm text-gray-600 text-center">
            *Use your Admission Number, not Register Number.<br />Example: 22BR15182
          </p>
          <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Department" value={dept} onChange={(e) => setDept(e.target.value)} />
          <Input placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
          <Input placeholder="Admission Number (e.g., 22BR15182)" value={admNumber} onChange={(e) => setAdmNumber(e.target.value.toUpperCase())} />
          <Button className="w-full" onClick={handleGenerate}>Generate ID</Button>
          {generatedID && (
            <div className="mt-4 text-center font-mono text-lg text-green-700">
              Your Unique ID: <strong>{generatedID}</strong>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
