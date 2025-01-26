import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "../pages/homepage/Header";

const categories = [
  {
    name: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: "5 Lakh",
    loanPeriod: "3 years",
  },
  {
    name: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: "10 Lakh",
    loanPeriod: "5 years",
  },
  {
    name: "Business Startup Loans",
    subcategories: [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    maxLoan: "10 Lakh",
    loanPeriod: "5 years",
  },
  {
    name: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    loanPeriod: "4 years",
  },
];

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 pt-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Loan Categories</h1>
          <Link to="/calculator">
            <Button>Go to Loan Calculator</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Subcategories:</strong>{" "}
                  {category.subcategories.join(", ")}
                </p>
                <p>
                  <strong>Maximum loan:</strong> PKR {category.maxLoan}
                </p>
                <p>
                  <strong>Loan period:</strong> {category.loanPeriod}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* <div className="mt-8 text-center">
        <Link to="/calculator">
          <Button>Go to Loan Calculator</Button>
        </Link>
      </div> */}
      </div>
    </>
  );
}
