import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function RewardSelection({ options, onSelect }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selected, setSelected] = useState({});
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Choose Your Reward
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <Card
            key={option.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-600 font-bold">{option.offer}</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setIsDialogOpen(true);
                  setSelected(option);
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected.title}</DialogTitle>
          </DialogHeader>
          <p>{selected.description}</p>
          <DialogFooter>
            <Button className="w-full" onClick={() => onSelect(selected)}>
              Select
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
