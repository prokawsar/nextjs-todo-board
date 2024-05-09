"use client";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";

type Props = {
  category?: {
    id: number;
    name: string;
  };
};

export default function CategoryBoard({ category }: Props) {
  const [showAddCategory, setShowAddCategory] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const supabase = createClient();
    const { error } = await supabase.from("categories").insert({
      name: "To do",
    });
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })

    // Handle response if necessary
    // const data = await response.json()
  };

  return (
    <div className="bg-slate-100 rounded-md px-3 py-2 flex flex-col">
      <p className="text-xl font-bold text-center">{category?.name}</p>
      <button
        className={`border mt-3 border-slate-500 rounded-md px-3 py-2 bg-slate-200 hover:bg-white
        
        `}
      >
        Add task
      </button>
    </div>
  );
}
