import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const loanCategories = {
  "Wedding Loans": {
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    period: 3,
  },
  "Home Construction Loans": {
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    period: 5,
  },
  "Business Startup Loans": {
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: 1000000,
    period: 5,
  },
  "Education Loans": {
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    period: 4,
  },
}

export default function LoanCalculator() {
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [initialAmount, setInitialAmount] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");
    const [loanBreakdown, setLoanBreakdown] = useState(null);
    const [error, setError] = useState(null);
  
    const handleCategoryChange = (value) => {
      setCategory(value);
      setSubcategory("");
      setLoanPeriod(loanCategories[value]?.period || "");
    };
  
    const calculateLoan = () => {
      setError(null);
      if (!category || !subcategory || !initialAmount) {
        setError("Please fill all fields");
        return;
      }
  
      const maxLoan = loanCategories[category]?.maxLoan;
      const requestedAmount = Number.parseFloat(initialAmount);
  
      if (maxLoan !== "Based on requirement" && requestedAmount > maxLoan) {
        setError(`Maximum loan allowed is PKR ${maxLoan}`);
        return;
      }
  
      const interestRate = 0.1;
      const totalPayable =
        requestedAmount + requestedAmount * interestRate * Number.parseInt(loanPeriod);
      const monthlyInstallment = totalPayable / (Number.parseInt(loanPeriod) * 12);
  
      setLoanBreakdown({ totalPayable, monthlyInstallment });
    };
  
    return (
      <Card className="max-w-[500px] mx-auto my-12">
        <CardHeader>
          <CardTitle>Loan Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(loanCategories).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
  
          {category && (
            <Select onValueChange={setSubcategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                {loanCategories[category]?.subcategories.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
  
          <Input
            type="number"
            placeholder="Enter initial amount"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
          />
  
          {loanPeriod && <p className="text-sm">Loan Period: {loanPeriod} years</p>}
  
          <Button onClick={calculateLoan} className="w-full">
            Calculate
          </Button>
  
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
  
          {loanBreakdown && (
            <div className="space-y-2">
              <p className="text-sm">Total Payable: PKR {loanBreakdown.totalPayable.toFixed(2)}</p>
              <p className="text-sm">
                Monthly Installment: PKR {loanBreakdown.monthlyInstallment.toFixed(2)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  

