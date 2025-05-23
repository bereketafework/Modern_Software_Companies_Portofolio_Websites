
'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const { portfolioItemsPerPage, setPortfolioItemsPerPage } = useSettings();

  // Using 0 to represent "Show All"
  const options = [3, 6, 9, 0]; 

  return (
    <section className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10 min-h-[calc(100vh-10rem)] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-lg mx-auto shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
                 <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link href="/#portfolio" aria-label="Back to portfolio">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground text-center flex-grow">Display Settings</CardTitle>
                 <div className="w-8"></div> {/* Spacer to balance the back button */}
            </div>
            <CardDescription className="text-center text-foreground/70">
              Customize how content is displayed on the portfolio page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6 sm:p-8">
            <div>
              <Label htmlFor="itemsPerPage" className="text-lg font-semibold mb-3 block text-foreground">
                Portfolio Items Per Page
              </Label>
              <RadioGroup
                id="itemsPerPage"
                value={String(portfolioItemsPerPage)}
                onValueChange={(value) => setPortfolioItemsPerPage(Number(value))}
                className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4"
              >
                {options.map(option => (
                  <div key={option} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent/50 transition-colors has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground">
                    <RadioGroupItem value={String(option)} id={`items-${option}`} className="border-foreground data-[state=checked]:border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"/>
                    <Label htmlFor={`items-${option}`} className="cursor-pointer text-sm font-medium flex-grow">
                      {option === 0 ? 'Show All' : `${option} Items`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                This setting affects the number of projects shown on the main portfolio section.
                Currently displaying: <span className="font-semibold text-primary">{portfolioItemsPerPage === 0 ? 'All' : portfolioItemsPerPage} items</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
